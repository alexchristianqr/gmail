import { Component, OnDestroy } from '@angular/core'
import { MyPreferences } from '../../../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { Subscription } from 'rxjs'
import { Message } from '../../../core/types/Message'
import { UtilsService } from '../../../core/services/utils/utils.service'
import { EventService } from '../../../core/services/events/event.service'
import { ApiService } from '../../../core/services/api/api.service'
import { Router } from '@angular/router'
import { MyParams } from '../../../core/types/MyParams'
import { PopoverListStarred } from './layouts/popover-list-starred'
import { StarredService } from '../starred.service'

@Component({
  selector: 'app-list-starred',
  templateUrl: 'list-starred.html',
})
export class ListStarred implements OnDestroy {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  mySubscribe$: Subscription
  items: Array<Message> | any = []

  constructor(private starredService: StarredService, private utilsService: UtilsService, private eventService: EventService, private apiService: ApiService, private router: Router) {
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

    this.starredService.getItems().then((data) => {
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

  async viewDetailPage(item: Message) {
    console.log('[ListStarred.viewDetailPage]')

    const data: MyParams = { item: item, path: 'mail/starred' }
    await this.router.navigate(['mail/inbox-detail'], { state: data })
  }

  async viewCreatePage() {
    console.log('[ListStarred.viewCreateMessage]')

    const data: MyParams = { database: 'DB_CONVERSATIONS', path: 'mail/starred' }
    await this.router.navigate(['mail/create'], { state: data })
  }

  async viewSearch() {
    console.log('[ListStarred.viewSearch]')

    const data: MyParams = { database: 'DB_CONVERSATIONS', path: 'mail/starred' }
    await this.router.navigate(['mail/search'], { state: data })
  }

  async presentPopover(event: Event) {
    console.log('[ListStarred.presentPopover]')

    await this.utilsService.presentPopover({ component: PopoverListStarred, event: event })
  }
}
