import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { MyPreferences } from '../../core/types/MyPreferences'
import { ApiService } from '../../core/services/api/api.service'
import { MyMessage } from '../../core/types/MyMessage'

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  myDatabase: string = 'DATABASE_INBOX'

  constructor(private apiService: ApiService) {
    console.log('[InboxService.constructor]')
  }

  async getItems(database: string) {
    console.log('[InboxService.getItems]', { database })

    return this.apiService.getItems(this.myDatabase).then((data) => {
      return data.sort((a, b) => (a > b ? 1 /* ASC */ : -1 /* DESC */)) // Lista de orden DESC
    })
  }
}
