import { Injectable } from '@angular/core'
import { StoragedbService } from '../storagedb/storagedb.service'
import { SHARED_PREFERENCES } from '../../../shared-preferences'

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  mySharedPreferences: string = 'SHARED_PREFERENCES'

  constructor(private storagedbService: StoragedbService) {
    console.log('[PreferencesService.constructor]')
  }

  /**
   * Actualizar preferencia del usuario
   * @param item
   */
  async update(item: any) {
    console.log('[PreferencesService.update]', { item })

    const database = this.mySharedPreferences
    await this.storagedbService.removeStorage(database)
    return this.storagedbService.setStorage(database, item)
  }
}
