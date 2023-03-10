import { Injectable } from '@angular/core'
import uuid from 'uuidv4'
import { StoragedbService } from '../storagedb/storagedb.service'
import { MyPreferences } from '../../types/MyPreferences'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { FirebaseService } from './firebase.service'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private storagedbService: StoragedbService, private firebaseService: FirebaseService) {
    console.log('[ApiService.constructor]')
  }

  /**
   * Obtener listado de items
   * @param database
   */
  async getItems(database: string) {
    console.log('[ApiService.getItems]', { database })

    return this.firebaseService.getCollection(database)
    // return this.firebaseService.getCollection('conversations')
    // await this.firebaseService.setCollection('participants', {
    //   // id: '1',
    //   created_at: '2023-01-25 11:50',
    //   email: 'alexchristianqr@utp.edu.pe',
    //   fullName: 'Alex Quispe',
    // })
    //
    // return this.storagedbService.loadSharedPreferences().then((data: MyPreferences) => {
    //   this.MY_SHARED_PREFERENCES.SETTINGS = data.SETTINGS
    //   return this.storagedbService.loadDatabaseStorage(database).then((data: Array<any>) => {
    //     return data // Lista de orden ASC
    //   })
    // })
  }

  /**
   * Crear item
   * @param database
   * @param item
   */
  async createItem(database: string, item: any) {
    console.log('[ApiService.createItem]', { database, item })

    return this.storagedbService.getStorage(database).then((data: Array<any>) => {
      // Agregar un item
      if (!data) return []
      data.push(item)

      // Actualizar almacenamiento
      return this.storagedbService.setStorage(database, data)
    })
  }

  /**
   * Actualizar item
   * @param database
   * @param item
   * @param keyItem
   * @param valueItem
   */
  async updateItem(database: string, item: any, keyItem: string, valueItem: any) {
    console.log('[ApiService.updateItem]', { keyItem, valueItem })

    return this.storagedbService.getStorage(database).then(async (data: Array<any>) => {
      // Encontrar un item
      const dataFounded = data.find((value) => value.id === item.id)
      if (!dataFounded) return
      dataFounded[keyItem] = valueItem // Actualizar campo

      // Actualizar almacenamiento
      await this.storagedbService.setStorage(database, data)
    })
  }

  /**
   * Eliminar item
   * @param database
   * @param item
   */
  async deleteItem(database: string, item: any) {
    console.log('[ApiService.deleteItem]')

    return this.storagedbService.getStorage(database).then((data: Array<any>) => {
      // Filtrar items
      const dataFiltered = data.filter((value) => value.id != item.id)

      // Actualizar almacenamiento
      this.storagedbService.setStorage(database, dataFiltered)
    })
  }

  /**
   * Borrar items
   * @param database
   */
  async purgeItems(database: string) {
    console.log('[ApiService.purgeItems]')

    // return this.storagedbService.removeStorage(database)
    return this.firebaseService.purgeCollection(database)
  }

  /**
   * Identificador ??nico universal UUID
   */
  async getUniqueUID() {
    return uuid()
  }

  /**
   * Control de base de dato
   */
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

  /**
   * Listar bases de datos
   */
  public get getDatabases() {
    return this.storagedbService.myDatabases
  }

  /**
   * Cargar base de datos
   * @param database
   */
  public loadDatabase(database: string) {
    return this.storagedbService.loadDatabaseStorage(database)
  }
}
