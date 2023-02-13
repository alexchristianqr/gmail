import { Component } from '@angular/core'
import { MyPreferences } from '../../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { PreferencesService } from '../../core/services/api/preferences.service'
import { MyParams } from '../../core/types/MyParams'
import { Router } from '@angular/router'
import { ApiService } from '../../core/services/api/api.service'
import { UtilsService } from '../../core/services/utils/utils.service'
import { EventService } from '../../core/services/events/event.service'
import { PopoverSettingsGeneral } from './layouts/popover-settings-general'

type MySettings = {
  title: string
  id: number
  description: string
  path: string
  database: string
}

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
})
export class SettingsComponent {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  items: MySettings[] = [
    {
      id: 1,
      title: 'Inbox',
      description: 'Configuración general para el modulo de Inbox.',
      path: '/mail/general/settings/inbox',
      database: 'DATABASE_INBOX',
    },
    {
      id: 2,
      title: 'Enviados',
      description: 'Configuración general para el modulo de Enviados.',
      path: '/mail/general/settings/sent',
      database: 'DATABASE_SENT',
    },
    {
      id: 3,
      title: 'Destacados',
      description: 'Configuración general para el modulo de Destacados.',
      path: '/mail/general/settings/starred',
      database: 'DATABASE_STARRED',
    },
  ]

  constructor(private apiService: ApiService, private utilsService: UtilsService, private eventService: EventService, private preferencesService: PreferencesService, private router: Router) {
    console.log('[SettingsComponent.constructor]')
  }

  async updateMyPreferences() {
    console.log('[SettingsComponent.updateMyPreferences]')

    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }

  async viewCustomPage(item: any) {
    console.log('[SettingsComponent.viewCustomPage]')

    const data: MyParams = { path: 'mail/general/settings' }
    await this.router.navigate([item.path], { state: data })
  }

  async presentPopover(event: Event) {
    console.log('[ModalSettingsGeneralInbox.presentPopover]')

    await this.utilsService.presentPopover({ component: PopoverSettingsGeneral, event: event })
  }
}
