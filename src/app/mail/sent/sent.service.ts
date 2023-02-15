import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { MyPreferences } from '../../core/types/MyPreferences'
import { ApiService } from '../../core/services/api/api.service'

@Injectable({
  providedIn: 'root',
})
export class SentService {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  myDatabase: string = 'DATABASE_INBOX'

  constructor(private apiService: ApiService) {
    console.log('[SentService.constructor]')
  }

  async getItems(database: string) {
    console.log('[SentService.getItems]', { database })

    return this.apiService.getItems(this.myDatabase).then((data) => {
      return data.filter((item) => item.is_starred)
    })
  }
}
