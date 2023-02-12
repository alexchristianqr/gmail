import { Component } from '@angular/core'
import { ApiService } from '../../../../core/services/api/api.service'
import { Router } from '@angular/router'
import { MyPreferences } from '../../../../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../../../../shared-preferences'
import { PreferencesService } from '../../../../core/services/api/preferences.service'

@Component({
  selector: 'app-modal-settings-detail-inbox',
  templateUrl: 'modal-settings-detail-inbox.html',
})
export class ModalSettingsDetailInbox {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private preferencesService: PreferencesService, private router: Router) {
    console.log('[ModalSettingsDetailInbox.constructor]')
  }

  async back() {
    console.log('[ModalSettingsDetailInbox.back]')

    await this.router.navigate(['mail/inbox-detail'])
  }

  async updateMyPreferences() {
    console.log('[ModalSettingsDetailInbox.updateMyPreferences]')

    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }
}
