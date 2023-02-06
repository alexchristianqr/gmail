import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../core/services/api/api.service'
import { PopoverDetailInbox } from './layouts/popover-detail-inbox'
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router'
import { MyMessage } from '../../core/types/MyMessage'
import { MyParams } from '../../core/types/MyParams'
import { MyPreferences } from '../../core/types/MyPreferences'
import { EventService } from '../../core/services/events/event.service'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { UtilsService } from '../../core/services/utils/utils.service'

@Component({
  selector: 'page-detail',
  templateUrl: 'detail-inbox.html',
})
export class DetailInbox implements OnInit {
  myDatabase: string = 'DATABASE_INBOX'
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  data: MyParams | any
  item?: MyMessage

  constructor(
    private utilsService: UtilsService,
    private eventService: EventService,
    private apiService: ApiService,
    private storage: Storage,
    private router: Router
  ) {
    console.log('[DetailInbox.constructor]')

    this.getState()
    this.updateMessageReadOrUnread('Mensaje leido', true)
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

    this.eventService.publish(this.item)
    await this.router.navigate([this.data.path])
  }

  /**
   * Eliminar mensaje
   */
  async deleteMessage() {
    console.log('[DetailInbox.deleteMessage]')

    // API
    const action = () => {
      return this.apiService.deleteItem(this.myDatabase, this.item).then(() => {
        this.back()
      })
    }

    // Validar shared preferences del usuario
    if (this.MY_SHARED_PREFERENCES.SETTINGS.CONFIRM_BEFORE_REMOVING) {
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
   * @param label
   * @param value
   */
  updateMessageReadOrUnread(label: string, value: boolean): void {
    console.log('[DetailInbox.updateMessageReadOrUnread]')

    this.apiService.updateItem(this.myDatabase, this.item, 'is_read', value).then(async () => {
      if (value) return

      // Solamente al marcar como no leido volver a INBOX y mostrar toast notificación
      await this.back()
      await this.presentToast(label)
    })
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
