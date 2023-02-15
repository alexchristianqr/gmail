import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MyPopover } from '../../../../core/types/MyPopover'
import { EventService } from '../../../../core/services/events/event.service'
import { UtilsService } from '../../../../core/services/utils/utils.service'
import { ApiService } from '../../../../core/services/api/api.service'

@Component({
  selector: 'app-popover-list-sent',
  templateUrl: 'popover-list-sent.html',
})
export class PopoverListSent {
  myDatabase: string = 'DATABASE_INBOX'
  items: Array<MyPopover> = [{ title: 'Configuración', path: 'mail/sent-settings' }]

  constructor(private utilsService: UtilsService, private eventService: EventService, private apiService: ApiService, private router: Router) {
    console.log('[PopoverListSent.constructor]')
  }

  async open(payload: MyPopover) {
    console.log('[PopoverListSent.open]')

    if (payload.path) {
      await this.router.navigate([payload.path])
    } else {
      switch (payload.dispatch) {
        case 'presentAlert':
          await this.presentAlert()
          break
      }
    }
  }

  async presentAlert() {
    console.log('[PopoverListSent.presentAlert]')

    await this.utilsService.presentAlert({
      subHeader: '¿Seguro que quieres limpiar la base de datos INBOX?',
      message: 'Esta acción eliminará todos los registros.',
      buttons: [
        {
          handler: () => {
            this.apiService.purgeItems(this.myDatabase).then(() => {
              this.eventService.publish() // Emitir evento de actualización
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

  async presentToast(message: string) {
    console.log('[PopoverListSent.presentToast]')

    await this.utilsService.presentToast({ message })
  }
}
