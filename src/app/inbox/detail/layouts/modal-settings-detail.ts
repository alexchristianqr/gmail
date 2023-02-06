import { Component } from '@angular/core'
import { ApiService } from '../../../core/services/api/api.service'
import { Router } from '@angular/router'
import { MyPreferences } from '../../../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { PreferencesService } from '../../../core/services/api/preferences.service'

@Component({
  selector: 'page-modal-detail',
  templateUrl: 'modal-settings-detail.html',
})
export class ModalSettingsDetail {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private preferencesService: PreferencesService, private router: Router) {
    console.log('[ModalSettingsDetail.constructor]')
  }

  async back() {
    console.log('[ModalSettingsDetail.back]')

    await this.router.navigate(['inbox-detail'])
  }

  async updateMyPreferences() {
    console.log('[ModalSettingsDetail.updateMyPreferences]')

    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }
}
