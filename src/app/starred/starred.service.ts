import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../shared-preferences'
import { MyPreferences } from '../core/types/MyPreferences'
import { ApiService } from '../core/services/api/api.service'

@Injectable({
  providedIn: 'root',
})
export class StarredService {
  myDatabase: string = 'DATABASE_STARRED'
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private apiService: ApiService) {
    console.log('[StarredService.constructor]')
  }

  async createItem(item: any) {
    console.log('[StarredService.createItem]', { item })

    return this.apiService.createItem(this.myDatabase, item)
  }

  async deleteItem(item: any) {
    console.log('[StarredService.deleteItem]', { item })

    return this.apiService.deleteItem(this.myDatabase, item)
  }

  async removeOrCreate(item: any) {
    console.log('[StarredService.removeOrCreate]', { item })

    const create = () => {
      return this.createItem(item)
    }
    const remove = () => {
      return this.deleteItem(item)
    }
    return { create, remove }
  }
}
