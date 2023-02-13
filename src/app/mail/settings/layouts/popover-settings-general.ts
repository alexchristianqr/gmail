import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from '../../../core/services/api/api.service'
import { MyPopover } from '../../../core/types/MyPopover'
import { UtilsService } from '../../../core/services/utils/utils.service'
import { EventService } from '../../../core/services/events/event.service'

@Component({
  selector: 'app-popover-settings-general',
  templateUrl: 'popover-settings-general.html',
})
export class PopoverSettingsGeneral {
  items: Array<MyPopover>

  constructor(private utilsService: UtilsService, private eventService: EventService, private apiService: ApiService, private router: Router) {
    console.log('[PopoverSettingsGeneral.constructor]')

    this.items = [{ title: 'Depurar bases de datos', dispatch: 'presentAlert' }]
  }

  async open(payload: MyPopover) {
    console.log('[PopoverSettingsGeneral.open]')

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
    console.log('[PopoverSettingsGeneral.presentAlert]')

    await this.utilsService.presentAlert({
      subHeader: '¿Seguro que quieres depurar todas las bases de datos que se utilizan en la aplicación?',
      message: 'Esta acción eliminará todos los registros.',
      buttons: [
        {
          handler: () => {
            const databases = this.apiService.getDatabases
            for (const database of databases) {
              if (database === 'VERSION') continue
              this.apiService.purgeItems(database)
            }

            this.eventService.publish()
            this.presentToast('Base de datos depurada').then(() => {
              for (const database of databases) {
                if (database === 'VERSION') continue
                this.apiService.loadDatabase(database)
              }
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
    console.log('[PopoverSettingsGeneral.presentToast]')

    await this.utilsService.presentToast({ message })
  }
}
