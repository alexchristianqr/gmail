import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SHARED_PREFERENCES } from '../../../../shared-preferences'
import { MyPreferences } from '../../../../core/types/MyPreferences'
import { PreferencesService } from '../../../../core/services/api/preferences.service'

@Component({
  selector: 'app-modal-settings-list-inbox',
  templateUrl: 'modal-settings-list-inbox.html',
})
export class ModalSettingsListInbox {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private preferencesService: PreferencesService, private router: Router) {
    console.log('[ModalSettingsListInbox.constructor]')
  }

  async back() {
    console.log('[ModalSettingsListInbox.back]')
    await this.router.navigate(['mail/inbox'])
  }

  async updateMyPreferences() {
    console.log('[ModalSettingsListInbox.updateMyPreferences]')
    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }
}
