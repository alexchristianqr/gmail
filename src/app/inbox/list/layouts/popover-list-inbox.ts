import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MyPopover } from '../../../core/types/MyPopover'
import { HttpServiceProvider } from '../../../../providers/http-service/http-service'
import { EventService } from '../../../core/services/events/event.service'
import { UtilsService } from '../../../core/services/utils/utils.service'

@Component({
  selector: 'page-popover-mail',
  templateUrl: 'popover-list-inbox.html',
})
export class PopoverMailPage {
  myDatabase: string = 'DATABASE_INBOX'
  items: Array<MyPopover>

  constructor(private utilsService: UtilsService, private eventService: EventService, private httpService: HttpServiceProvider, private router: Router) {
    console.log('[PopoverMailPage.constructor]')

    this.items = [
      { title: 'Configuración', path: 'inbox-settings' },
      { title: 'Limpiar base de datos', dispatch: 'presentAlert' },
    ]
  }

  async open(payload: MyPopover) {
    console.log('[PopoverMailPage.open]')

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
    console.log('[PopoverMailPage.presentAlert]')

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

  async presentToast(message: string) {
    console.log('[PopoverMailPage.presentToast]')

    await this.utilsService.presentToast({ message })
  }
}
