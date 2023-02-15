import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../../core/services/api/api.service'
import { UtilsService } from '../../../core/services/utils/utils.service'
import { EventService } from '../../../core/services/events/event.service'
import { PreferencesService } from '../../../core/services/api/preferences.service'
import { Router } from '@angular/router'
import { MyPreferences } from '../../../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { MyParams } from '../../../core/types/MyParams'

@Component({
  selector: 'app-modal-settings-general-starred',
  templateUrl: 'modal-settings-general-starred.html',
})
export class ModalSettingsGeneralStarred implements OnInit {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  data: MyParams | any

  constructor(private apiService: ApiService, private utilsService: UtilsService, private eventService: EventService, private preferencesService: PreferencesService, private router: Router) {
    console.log('[ModalSettingsGeneralStarred.constructor]')

    this.getState()
  }

  ngOnInit() {
    console.log('[ModalSettingsGeneralStarred.constructor]')

    this.getState()
  }

  getState(): void {
    console.log('[ModalSettingsGeneralStarred.getState]')

    this.data = this.router.getCurrentNavigation()?.extras.state
  }

  async back() {
    console.log('[ModalSettingsGeneralStarred.back]')

    await this.router.navigate([this.data.path])
  }

  async updateMyPreferences() {
    console.log('[ModalSettingsGeneralStarred.updateMyPreferences]')

    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }
}
