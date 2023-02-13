import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SHARED_PREFERENCES } from '../../../../shared-preferences'
import { MyPreferences } from '../../../../core/types/MyPreferences'
import { PreferencesService } from '../../../../core/services/api/preferences.service'

@Component({
  selector: 'app-modal-settings-list-sent',
  templateUrl: 'modal-settings-list-sent.html',
})
export class ModalSettingsListSent {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private preferencesService: PreferencesService, private router: Router) {
    console.log('[ModalSettingsListSent.constructor]')
  }

  async back() {
    console.log('[ModalSettingsListSent.back]')
    await this.router.navigate(['mail/sent'])
  }

  async updateMyPreferences() {
    console.log('[ModalSettingsListSent.updateMyPreferences]')
    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }
}
