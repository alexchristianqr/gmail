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
  selector: 'app-modal-settings-general-sent',
  templateUrl: 'modal-settings-general-sent.html',
})
export class ModalSettingsGeneralSent implements OnInit {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  data: MyParams | any

  constructor(private apiService: ApiService, private utilsService: UtilsService, private eventService: EventService, private preferencesService: PreferencesService, private router: Router) {
    console.log('[ModalSettingsGeneralSent.constructor]')

    this.getState()
  }

  ngOnInit() {
    console.log('[ModalSettingsGeneralSent.constructor]')

    this.getState()
  }

  getState(): void {
    console.log('[ModalSettingsGeneralSent.getState]')

    this.data = this.router.getCurrentNavigation()?.extras.state
  }

  async back() {
    console.log('[ModalSettingsGeneralSent.back]')

    await this.router.navigate([this.data.path])
  }

  async updateMyPreferences() {
    console.log('[ModalSettingsGeneralSent.updateMyPreferences]')

    await this.preferencesService.update(this.MY_SHARED_PREFERENCES)
  }
}
