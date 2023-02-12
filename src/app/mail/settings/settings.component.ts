import { Component } from '@angular/core'
import { MyPreferences } from '../../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { PreferencesService } from '../../core/services/api/preferences.service'
import { MyParams } from '../../core/types/MyParams'
import { Router } from '@angular/router'

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
})
export class SettingsComponent {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private preferencesService: PreferencesService, private router: Router) {
    console.log('[SettingsComponent.constructor]')
  }

  async updateMyPreferences() {
    console.log('[SettingsComponent.updateMyPreferences]')

    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }

  async viewCustomPage(path: string) {
    console.log('[SettingsComponent.viewCustomPage]')

    const data: MyParams = { path: 'mail/general/settings' }
    await this.router.navigate([path], { state: data })
  }
}
