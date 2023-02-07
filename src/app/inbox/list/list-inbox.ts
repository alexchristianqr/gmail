import { Component, OnDestroy, ViewChild } from '@angular/core'
import { ApiService } from '../../core/services/api/api.service'
import { PopoverListInbox } from './layouts/popover-list-inbox'
import { Router } from '@angular/router'
import { MyMessage } from '../../core/types/MyMessage'
import { MyParams } from '../../core/types/MyParams'
import { MyPreferences } from '../../core/types/MyPreferences'
import { EventService } from '../../core/services/events/event.service'
import { Subscription } from 'rxjs'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { UtilsService } from '../../core/services/utils/utils.service'

@Component({
  selector: 'page-mails-inbox',
  templateUrl: 'list-inbox.html',
})
export class ListInbox implements OnDestroy {
  @ViewChild('popover') popover: any
  myDatabase: string = 'DATABASE_INBOX'
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  mySubscribe$: Subscription
  items: Array<MyMessage> | any = []

  constructor(private utilsService: UtilsService, private eventService: EventService, private apiService: ApiService, private router: Router) {
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

    this.apiService.getItems(this.myDatabase).then((data) => {
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

  async fnViewDetail(item: MyMessage) {
    console.log('[ListInbox.fnViewDetail]')

    const data: MyParams = { item: item, path: 'inbox' }
    await this.router.navigate(['inbox-detail'], { state: data })
  }

  async fnViewSearch() {
    console.log('[ListInbox.fnViewSearch]')

    const data: MyParams = { database: 'DATABASE_INBOX', path: 'inbox' }
    await this.router.navigate(['search'], { state: data })
  }

  async viewCreatePage() {
    console.log('[ListInbox.viewCreatePage]')

    const data: MyParams = { database: this.myDatabase, path: 'inbox' }
    await this.router.navigate(['create'], { state: data })
  }

  async presentAlert() {
    console.log('[ListInbox.presentAlert]')

    await this.utilsService.presentAlert({
      subHeader: '¿Seguro que quieres limpiar la base de datos INBOX?',
      message: 'Esta acción eliminará todos los registros.',
      buttons: [
        {
          handler: () => {
            this.apiService.purgeItems(this.myDatabase).then(() => {
              this.eventService.publish()
              this.presentToast('Base de datos limpiada')
            })
          },
        },
        {
          handler: () => ({}),
        },
      ],
    })
  }

  async presentPopover(event: Event) {
    console.log('[ListInbox.presentPopover]')

    await this.utilsService.presentPopover({ component: PopoverListInbox, event: event })
  }

  async presentToast(message: string) {
    console.log('[ListInbox.presentToast]')

    await this.utilsService.presentToast({ message })
  }
}
