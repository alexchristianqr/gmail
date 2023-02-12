import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { MyPreferences } from '../../../core/types/MyPreferences'
import { PreferencesService } from '../../../core/services/api/preferences.service'
import { MyParams } from '../../../core/types/MyParams'
import { PopoverListInbox } from '../../inbox/list/layouts/popover-list-inbox'
import { UtilsService } from '../../../core/services/utils/utils.service'
import { EventService } from '../../../core/services/events/event.service'
import { ApiService } from '../../../core/services/api/api.service'

@Component({
  selector: 'app-modal-settings-general-inbox',
  templateUrl: './modal-settings-general-inbox.html',
})
export class ModalSettingsGeneralInbox {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  data: MyParams | any

  constructor(private apiService: ApiService, private utilsService: UtilsService, private eventService: EventService, private preferencesService: PreferencesService, private router: Router) {
    console.log('[ModalSettingsGeneralInbox.constructor]')

    this.getState()
  }

  getState(): void {
    console.log('[ModalSettingsGeneralInbox.getState]')

    this.data = this.router.getCurrentNavigation()?.extras.state
  }

  async back() {
    console.log('[ModalSettingsGeneralInbox.back]')

    await this.router.navigate([this.data.path])
  }

  async updateMyPreferences() {
    console.log('[ModalSettingsGeneralInbox.updateMyPreferences]')

    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }
}
