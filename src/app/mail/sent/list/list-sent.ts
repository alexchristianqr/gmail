import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MyPreferences } from '../../../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { Subscription } from 'rxjs'
import { MyMessage } from '../../../core/types/MyMessage'
import { UtilsService } from '../../../core/services/utils/utils.service'
import { EventService } from '../../../core/services/events/event.service'
import { ApiService } from '../../../core/services/api/api.service'
import { Router } from '@angular/router'
import { MyParams } from '../../../core/types/MyParams'
import { PopoverListSent } from './layouts/popover-list-sent'
import { SentService } from '../sent.service'

@Component({
  selector: 'app-list-sent',
  templateUrl: 'list-sent.html',
})
export class ListSent implements OnDestroy, OnInit {
  @ViewChild('popover') popover: any
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  myDatabase: string = 'DATABASE_INBOX'
  mySubscribe$: Subscription
  items: Array<MyMessage> | any = []

  constructor(private sentService: SentService, private utilsService: UtilsService, private eventService: EventService, private apiService: ApiService, private router: Router) {
    console.log('[ListSent.constructor]')

    this.mySubscribe$ = this.eventService.dataSource.subscribe(() => this.listSentMessages())
    this.listSentMessages()
  }

  ngOnInit(): void {
    console.log('[ListSent.ngOnInit]')

    this.listSentMessages()
  }

  ngOnDestroy() {
    console.log('[ListSent.ngOnDestroy]')

    this.mySubscribe$.unsubscribe()
  }

  listSentMessages(): void {
    console.log('[ListSent.listSentMessages]')

    this.sentService.getItems(this.myDatabase).then((data) => {
      this.items = data
    })
  }

  async refreshList(event: any) {
    console.log('[ListSent.refreshList]')

    setTimeout(() => {
      this.listSentMessages()
      event.target.complete()
    }, 2000)
  }

  async viewDetailPage(item: MyMessage) {
    console.log('[ListSent.viewDetailPage]')

    const data: MyParams = { item: item, path: 'mail/sent' }
    await this.router.navigate(['mail/inbox-detail'], { state: data })
  }

  async viewCreatePage() {
    console.log('[ListSent.viewCreatePage]')

    const data: MyParams = { database: 'DATABASE_SENT', path: 'mail/sent' }
    await this.router.navigate(['mail/create'], { state: data })
  }

  async viewSearch() {
    console.log('[ListSent.viewSearch]')

    const data: MyParams = { database: this.myDatabase, path: 'mail/sent' }
    await this.router.navigate(['mail/search'], { state: data })
  }

  async presentPopover(event: Event) {
    console.log('[ListSent.presentPopover]')

    await this.utilsService.presentPopover({ component: PopoverListSent, event: event })
  }
}
