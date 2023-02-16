import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { MyPreferences } from '../../core/types/MyPreferences'
import { ApiService } from '../../core/services/api/api.service'
import { Message } from '../../core/types/Message'

@Injectable({
  providedIn: 'root',
})
export class StarredService {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  myDatabase: string = 'DB_CONVERSATIONS'

  constructor(private apiService: ApiService) {
    console.log('[StarredService.constructor]')
  }

  async getItems() {
    console.log('[StarredService.getItems]')

    return this.apiService.getItems(this.myDatabase).then((data) => {
      data = data.filter((item) => item.is_starred)
      return data.sort((a, b) => (a > b ? 1 /* ASC */ : -1 /* DESC */)) // Lista de orden DESC
    })
  }

  async createItem(item: any, value: boolean) {
    console.log('[StarredService.createItem]', { item })

    return this.apiService.updateItem(this.myDatabase, item, 'is_starred', value)
  }

  async deleteItem(item: any) {
    console.log('[StarredService.deleteItem]', { item })

    return this.apiService.deleteItem(this.myDatabase, item)
  }

  async updateItem(database: string, item: Message | any, keyItem: string, valueItem: any) {
    console.log('[StarredService.updateItem]', { keyItem, valueItem })

    return this.apiService.updateItem(database, item, keyItem, valueItem)
    // return this.apiService.getItem(database, item).then((data) => {
    //   item[keyItem] = valueItem
    //   this.apiService.updateItem(database,item, )
    // })
  }

  async removeOrCreate(item: any) {
    console.log('[StarredService.removeOrCreate]', { item })

    const create = (value: any) => {
      return this.createItem(item, value)
    }
    const remove = () => {
      return this.deleteItem(item)
    }
    return { create, remove }
  }
}
