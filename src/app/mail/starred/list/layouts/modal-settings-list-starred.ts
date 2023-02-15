import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SHARED_PREFERENCES } from '../../../../shared-preferences'
import { MyPreferences } from '../../../../core/types/MyPreferences'
import { PreferencesService } from '../../../../core/services/api/preferences.service'

@Component({
  selector: 'app-modal-settings-list-starred',
  templateUrl: 'modal-settings-list-starred.html',
})
export class ModalSettingsListStarred {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private preferencesService: PreferencesService, private router: Router) {
    console.log('[ModalSettingsListStarred.constructor]')
  }

  async back() {
    console.log('[ModalSettingsListStarred.back]')

    await this.router.navigate(['mail/starred'])
  }

  async updateMyPreferences() {
    console.log('[ModalSettingsListStarred.updateMyPreferences]')

    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }
}
