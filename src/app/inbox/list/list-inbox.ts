import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { HttpServiceProvider } from '../../../providers/http-service/http-service'
import { PopoverMailPage } from './layouts/popover-list-inbox'
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
  styleUrls: ['list-inbox.scss'],
})
export class MailsInboxPage implements OnDestroy {
  @ViewChild('popover') popover: any
  myDatabase: string = 'DATABASE_INBOX'
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  mySubscribe$: Subscription
  items: Array<MyMessage> = []

  constructor(private utilsService: UtilsService, private eventService: EventService, private httpService: HttpServiceProvider, private router: Router) {
    console.log('[MailsInboxPage.constructor]')

    this.mySubscribe$ = this.eventService.dataSource.subscribe(() => this.listInbox())
    this.listInbox()
  }

  ngOnDestroy() {
    console.log('[MailsInboxPage.ngOnDestroy]')

    this.mySubscribe$.unsubscribe()
  }

  listInbox(): void {
    console.log('[MailsInboxPage.listInbox]')

    this.httpService.loadSharedPreferences().then((data: MyPreferences) => {
      this.MY_SHARED_PREFERENCES.SETTINGS = data.SETTINGS
      this.httpService.loadDatabaseStorage(this.myDatabase).then((data) => {
        this.items = data
      })
    })
  }

  async doRefresh(event: any) {
    console.log('[MailsInboxPage.doRefresh]')

    setTimeout(() => {
      this.listInbox()
      event.target.complete()
    }, 2000)
  }

  async fnViewDetail(item: MyMessage) {
    console.log('[MailsInboxPage.fnViewDetail]')

    const data: MyParams = { item: item, path: 'inbox' }
    await this.router.navigate(['inbox-detail'], { state: data })
  }

  async fnViewSearch() {
    console.log('[MailsInboxPage.fnViewSearch]')

    const data: MyParams = { database: 'DATABASE_INBOX', path: 'inbox' }
    await this.router.navigate(['search'], { state: data })
  }

  async fnViewCreate() {
    console.log('[MailsInboxPage.fnViewCreate]')

    await this.router.navigate(['create'])
  }

  async presentAlert() {
    console.log('[MailsInboxPage.presentAlert]')

    await this.utilsService.presentAlert({
      subHeader: '¿Seguro que quieres limpiar la base de datos INBOX?',
      message: 'Esta acción eliminará todos los registros.',
      buttons: [
        {
          handler: () => {
            this.httpService.removeStorage(this.myDatabase).then(() => {
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
    console.log('[MailsInboxPage.presentPopover]')

    await this.utilsService.presentPopover({ component: PopoverMailPage, event: event })
  }

  async presentToast(message: string) {
    console.log('[MailsInboxPage.presentToast]')

    await this.utilsService.presentToast({ message })
  }
}
