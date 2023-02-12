import { Component, OnDestroy, ViewChild } from '@angular/core'
import { MyPreferences } from '../../../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { Subscription } from 'rxjs'
import { MyMessage } from '../../../core/types/MyMessage'
import { UtilsService } from '../../../core/services/utils/utils.service'
import { EventService } from '../../../core/services/events/event.service'
import { ApiService } from '../../../core/services/api/api.service'
import { Router } from '@angular/router'
import { MyParams } from '../../../core/types/MyParams'

@Component({
  selector: 'app-list-starred',
  templateUrl: 'list-starred.html',
})
export class ListStarred implements OnDestroy {
  @ViewChild('popover') popover: any
  myDatabase: string = 'DATABASE_STARRED'
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  mySubscribe$: Subscription
  items: Array<MyMessage> | any = []

  constructor(private utilsService: UtilsService, private eventService: EventService, private apiService: ApiService, private router: Router) {
    console.log('[ListStarred.constructor]')

    this.mySubscribe$ = this.eventService.dataSource.subscribe(() => this.listStarredMessages())
    this.listStarredMessages()
  }

  ngOnDestroy() {
    console.log('[ListStarred.ngOnDestroy]')

    this.mySubscribe$.unsubscribe()
  }

  listStarredMessages(): void {
    console.log('[ListStarred.listSentMessages]')

    this.apiService.getItems(this.myDatabase).then((data) => {
      this.items = data
    })
  }

  async refreshList(event: any) {
    console.log('[ListStarred.refreshList]')

    setTimeout(() => {
      this.listStarredMessages()
      event.target.complete()
    }, 2000)
  }

  async viewDetailPage(item: MyMessage) {
    console.log('[ListStarred.viewDetailPage]')

    const data: MyParams = { item: item, path: 'mail/starred' }
    await this.router.navigate(['mail/inbox-detail'], { state: data })
  }

  async viewCreatePage() {
    console.log('[ListStarred.viewCreateMessage]')

    const data: MyParams = { database: this.myDatabase, path: 'mail/starred' }
    await this.router.navigate(['mail/create'], { state: data })
  }
}
