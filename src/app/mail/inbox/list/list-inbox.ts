import { Component, OnDestroy, ViewChild } from '@angular/core'
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
  @ViewChild('popover') popover: any
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  mySubscribe$: Subscription
  items: Array<Message> | any = []

  constructor(private inboxService: InboxService, private utilsService: UtilsService, private eventService: EventService, private apiService: ApiService, private router: Router) {
    console.log('[ListInbox.constructor]')

    this.mySubscribe$ = this.eventService.dataSource.subscribe(() => this.listInbox())
    this.listInbox()
  }

  ngOnDestroy() {
    console.log('[ListInbox.ngOnDestroy]')

    this.mySubscribe$.unsubscribe()
  }

  listInbox(): void {
    console.log('[ListInbox.listInbox]')

    this.inboxService.getItems().then((data) => {
      this.items = data
    })
  }

  async doRefresh(event: any) {
    console.log('[ListInbox.doRefresh]')

    setTimeout(() => {
      this.listInbox()
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

    const data: MyParams = { database: 'DATABASE_INBOX', path: 'mail/inbox' }
    await this.router.navigate(['mail/search'], { state: data })
  }

  async viewCreatePage() {
    console.log('[ListInbox.viewCreatePage]')

    const data: MyParams = { database: 'DATABASE_SENT', path: 'mail/inbox' }
    await this.router.navigate(['mail/create'], { state: data })
  }

  async presentPopover(event: Event) {
    console.log('[ListInbox.presentPopover]')

    await this.utilsService.presentPopover({ component: PopoverListInbox, event: event })
  }
}
