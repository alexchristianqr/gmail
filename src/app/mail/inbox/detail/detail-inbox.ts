import { Component, OnInit } from '@angular/core'
import { PopoverDetailInbox } from './layouts/popover-detail-inbox'
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router'
import { MyParams } from '../../../core/types/MyParams'
import { MyPreferences } from '../../../core/types/MyPreferences'
import { EventService } from '../../../core/services/events/event.service'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { UtilsService } from '../../../core/services/utils/utils.service'
import { StarredService } from '../../starred/starred.service'
import { Conversation } from '../../../core/types/Conversation'
import { InboxService } from '../inbox.service'

@Component({
  selector: 'app-detail-inbox',
  templateUrl: 'detail-inbox.html',
  styleUrls: ['detail-inbox.scss'],
})
export class DetailInbox implements OnInit {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  data: MyParams | any
  item: Conversation | undefined
  value: any

  constructor(
    private inboxService: InboxService,
    private starredService: StarredService,
    public utilsService: UtilsService,
    private eventService: EventService,
    private storage: Storage,
    private router: Router
  ) {
    console.log('[DetailInbox.constructor]')

    this.getState()
    this.readUnreadMessage(true, 'Mensaje leido')
  }

  ngOnInit() {
    console.log('[DetailInbox.ngOnInit]')

    this.getState()
  }

  getState(): void {
    console.log('[DetailInbox.getState]')

    this.data = this.router.getCurrentNavigation()?.extras.state
    this.item = this.data.item
  }

  async back() {
    console.log('[DetailInbox.back]')

    await this.router.navigate([this.data.path])
  }

  /**
   * Eliminar mensaje
   */
  async deleteMessage() {
    console.log('[DetailInbox.deleteMessage]')

    // API
    const action = () => {
      return this.inboxService.deleteItem(this.item).then(() => {
        this.back()
      })
    }

    // Validar shared preferences del usuario
    if (this.MY_SHARED_PREFERENCES.SETTINGS.INBOX_CONFIRM_BEFORE_REMOVING) {
      await this.utilsService.presentAlert({
        subHeader: '¿Estas seguro de eliminar este mensaje?',
        message: 'Esta acción eliminará tu mensaje de la lista de inbox.',
        buttons: [
          {
            text: 'OK',
            role: 'ok',
            handler: () => action(),
          },
          {
            handler: () => ({}),
          },
        ],
      })
    } else {
      return action()
    }
  }

  /**
   * Actualizar mensaje como leído o no leído
   * @param value
   * @param message
   */
  readUnreadMessage(value: boolean, message: string) {
    console.log('[DetailInbox.readUnreadMessage]')

    // Error exception
    if (!this.item) return

    // Control UI
    const key = 'is_read'
    this.item.is_read = value
    const disabledRoute: boolean = value
    const disabledToast: boolean = value

    // Action API
    return this.inboxService.updateItem(this.item, key, value).then(async () => {
      if (!disabledRoute) {
        await this.back() // Volver a la página anterior
      }
      if (!disabledToast) {
        await this.presentToast(message) // Mostrar toast notificación
      }
    })
  }

  /**
   * Actualizar mensaje como destacado
   * @param message
   */
  starredMessage(message: string): void {
    console.log('[DetailInbox.starredMessage]')

    // Error exception
    if (!this.item) return

    // Control UI
    const key = 'is_starred'
    this.item.is_starred = !this.item.is_starred
    const value: boolean = this.item.is_starred
    const disabledRoute: boolean = false
    const disabledToast: boolean = !value

    // Action API
    this.starredService.updateItem(this.item, key, value).then(async () => {
      if (!disabledRoute) {
        await this.back() // Volver a la página anterior
      }
      if (!disabledToast) {
        await this.presentToast(message) // Mostrar toast notificación
      }
    })
  }

  async viewCreatePage(item: any, fromTo: boolean = false) {
    console.log('[DetailInbox.viewCreatePage]')

    // Set
    const itemData = { ...item }

    // Actualizar From/To email
    if (fromTo) {
      const itemFrom = itemData.from
      itemData.from = itemData.to
      itemData.to = itemFrom
    }

    const data: MyParams = { path: 'mail/inbox-detail', item: itemData, payload: { fromTo: fromTo } }
    await this.router.navigate(['mail/create'], { state: data })
  }

  async presentPopover(event: Event) {
    console.log('[DetailInbox.presentPopover]')

    await this.utilsService.presentPopover({ component: PopoverDetailInbox, event: event })
  }

  async presentToast(message: string) {
    console.log('[DetailInbox.presentToast]')

    await this.utilsService.presentToast({ message })
  }
}
