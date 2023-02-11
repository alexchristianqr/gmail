import { Component } from '@angular/core'
import { MyPreferences } from '../../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { PreferencesService } from '../../core/services/api/preferences.service'

@Component({
  selector: 'app-general',
  templateUrl: 'general.component.html',
})
export class GeneralComponent {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  constructor(private preferencesService: PreferencesService) {
    console.log('[GeneralComponent.constructor]')
  }

  async updateMyPreferences() {
    console.log('[GeneralComponent.updateMyPreferences]')
    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }
}
