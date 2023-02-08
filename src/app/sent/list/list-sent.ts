import { Component, OnDestroy, ViewChild } from '@angular/core'
import { MyPreferences } from '../../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { Subscription } from 'rxjs'
import { MyMessage } from '../../core/types/MyMessage'
import { UtilsService } from '../../core/services/utils/utils.service'
import { EventService } from '../../core/services/events/event.service'
import { ApiService } from '../../core/services/api/api.service'
import { Router } from '@angular/router'
import { MyParams } from '../../core/types/MyParams'

@Component({
  selector: 'page-mails-sent',
  templateUrl: 'list-sent.html',
})
export class ListSent implements OnDestroy {
  @ViewChild('popover') popover: any
  myDatabase: string = 'DATABASE_SENT'
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  mySubscribe$: Subscription
  items: Array<MyMessage> | any = []

  constructor(private utilsService: UtilsService, private eventService: EventService, private apiService: ApiService, private router: Router) {
    console.log('[ListSent.constructor]')

    this.mySubscribe$ = this.eventService.dataSource.subscribe(() => this.listSentMessages())
    this.listSentMessages()
  }

  ngOnDestroy() {
    console.log('[ListSent.ngOnDestroy]')

    this.mySubscribe$.unsubscribe()
  }

  listSentMessages(): void {
    console.log('[ListSent.listSentMessages]')

    this.apiService.getItems(this.myDatabase).then((data) => {
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

    const data: MyParams = { item: item, path: 'app/sent' }
    await this.router.navigate(['app/inbox-detail'], { state: data })
  }

  async viewCreatePage() {
    console.log('[ListSent.viewCreateMessage]')

    const data: MyParams = { database: this.myDatabase, path: 'sent' }
    await this.router.navigate(['create'], { state: data })
  }
}
