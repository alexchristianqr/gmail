import { Component } from '@angular/core'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { Router } from '@angular/router'
import { MyPreferences } from '../../core/types/MyPreferences'
import { PreferencesService } from '../../core/services/api/preferences.service'

@Component({
  selector: 'page-modal-create',
  templateUrl: 'modal-settings-create.html',
})
export class ModalSettingsCreate {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private preferencesService: PreferencesService, private router: Router) {
    console.log('[ModalSettingsCreate.constructor]')
  }

  async back() {
    console.log('[ModalSettingsCreate.back]')

    await this.router.navigate(['create'])
  }

  async updateMyPreferences() {
    console.log('[ModalSettingsCreate.updateMyPreferences]')

    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }
}
