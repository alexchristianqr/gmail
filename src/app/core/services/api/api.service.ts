import { Injectable } from '@angular/core'
import { MyMessage } from '../../types/MyMessage'
import uuid from 'uuidv4'
import { StoragedbService } from '../storagedb/storagedb.service'
import { MyPreferences } from '../../types/MyPreferences'
import { SHARED_PREFERENCES } from '../../../shared-preferences'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private storagedbService: StoragedbService) {
    console.log('[ApiService.constructor]')
  }

  async getItems(database: string) {
    console.log('[ApiService.getItems]', { database })

    return this.storagedbService.loadSharedPreferences().then((data: MyPreferences) => {
      this.MY_SHARED_PREFERENCES.SETTINGS = data.SETTINGS
      return this.storagedbService.loadDatabaseStorage(database).then((data: Array<MyMessage>) => {
        // return data // Lista de orden ASC
        return data.sort((a, b) => (a > b ? 1 /* ASC */ : -1 /* DESC */)) // Lista de orden DESC
      })
    })
  }

  async createItem(database: string, item: MyMessage | any) {
    console.log('[ApiService.createItem]', { database, item })

    return this.storagedbService.getStorage(database).then((data: Array<MyMessage>) => {
      // Agregar un item
      console.log({ data })
      if (!data) return []
      data.push(item)

      // Actualizar almacenamiento
      return this.storagedbService.setStorage(database, data)
    })
  }

  async updateItem(database: string, item: MyMessage | any, keyItem: string, valueItem: any) {
    console.log('[ApiService.updateItem]', {
      database,
      item,
      keyItem,
      valueItem,
    })

    return this.storagedbService.getStorage(database).then((data: Array<MyMessage>) => {
      // Encontrar un item
      const dataFounded: any = data.find((value) => value.uid === item.uid)
      if (!dataFounded) return
      dataFounded[keyItem] = valueItem // Actualizar campo

      // Actualizar almacenamiento
      this.storagedbService.setStorage(database, data)
    })
  }

  async deleteItem(database: string, item: MyMessage | any) {
    console.log('[ApiService.deleteItem]')

    return this.storagedbService.getStorage(database).then((data: Array<MyMessage>) => {
      // Filtrar items
      const dataFiltered = data.filter((value) => value.uid != item.uid)

      // Actualizar almacenamiento
      this.storagedbService.setStorage(database, dataFiltered)
    })
  }

  async purgeItems(database: string) {
    console.log('[ApiService.purgeItems]')

    return this.storagedbService.removeStorage(database)
  }

  async getUniqueUID() {
    return uuid()
  }

  async db() {
    const create = (key: string, value: any) => {
      console.log('[ApiService.db.create]', { key, value })
      return this.storagedbService.setStorage(key, value)
    }
    const get = (key: string) => {
      console.log('[ApiService.db.get]', { key })
      return this.storagedbService.getStorage(key)
    }
    return { create, get }
  }
}
