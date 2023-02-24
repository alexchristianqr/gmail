import { Component, OnDestroy } from '@angular/core'
import { ApiService } from '../../../core/services/api/api.service'
import { PopoverListInbox } from './layouts/popover-list-inbox'
import { Router } from '@angular/router'
import { Message } from '../../../core/types/Message'
import { MyParams } from '../../../core/types/MyParams'
import { MyPreferences } from '../../../core/types/MyPreferences'
import { EventService } from '../../../core/services/events/event.service'
import { Subscription } from 'rxjs'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { UtilsService } from '../../../core/services/utils/utils.service'
import { InboxService } from '../inbox.service'

@Component({
  selector: 'app-list-inbox',
  templateUrl: 'list-inbox.html',
})
export class ListInbox implements OnDestroy {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  mySubscribe$: Subscription
  items: Array<Message> | any = []

  constructor(private inboxService: InboxService, private utilsService: UtilsService, private eventService: EventService, private apiService: ApiService, private router: Router) {
    console.log('[ListInbox.constructor]')

    this.mySubscribe$ = this.eventService.dataSource.subscribe(() => this.listInbox())
    this.listInbox().then()
  }

  async ngOnDestroy() {
    console.log('[ListInbox.ngOnDestroy]')

    this.mySubscribe$.unsubscribe()
  }

  async listInbox(isLoading: boolean = true) {
    console.log('[ListInbox.listInbox]')

    let loading: any
    if (isLoading) loading = await this.utilsService.showLoading()
    this.items = await this.inboxService.getItems()
    if (isLoading) await loading.dismiss()
  }

  async refreshList(event: any) {
    console.log('[ListInbox.refreshList]')

    setTimeout(async () => {
      await this.listInbox(false)
      event.target.complete()
    }, 2000)
  }

  async viewDetail(item: Message) {
    console.log('[ListInbox.fnViewDetail]')

    const data: MyParams = { item: item, path: 'mail/inbox' }
    await this.router.navigate(['mail/inbox-detail'], { state: data })
  }

  async viewSearch() {
    console.log('[ListInbox.fnViewSearch]')

    const data: MyParams = { database: 'conversations', path: 'mail/inbox' }
    await this.router.navigate(['mail/search'], { state: data })
  }

  async viewCreatePage() {
    console.log('[ListInbox.viewCreatePage]')

    const data: MyParams = { path: 'mail/inbox' }
    await this.router.navigate(['mail/create'], { state: data })
  }

  async presentPopover(event: Event) {
    console.log('[ListInbox.presentPopover]')

    await this.utilsService.presentPopover({ component: PopoverListInbox, event: event })
  }
}
