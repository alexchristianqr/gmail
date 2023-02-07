import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { Storage } from '@ionic/storage'
import { MyPreferences } from '../../types/MyPreferences'
import { MyMessage } from '../../types/MyMessage'

@Injectable({
  providedIn: 'root',
})
export class StoragedbService {
  private initDataDB: Array<MyMessage> = [
    {
      uid: '1',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'alexchristianqr@utp.edu.pe',
      is_read: false,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Alex Christian Quispe Roque',
      subject: 'Funciones lineales',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '2',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'jacky@utp.edu.pe',
      is_read: false,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Jacky',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '3',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'yolanda@utp.edu.pe',
      is_read: true,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Yolanda',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '4',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'nando@utp.edu.pe',
      is_read: false,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Nando',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '5',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'jorge@utp.edu.pe',
      is_read: false,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Jorge',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '6',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'teresa@utp.edu.pe',
      is_read: false,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Teresa',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '7',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'beatriz@utp.edu.pe',
      is_read: true,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Beatriz',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '8',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'carlos@utp.edu.pe',
      is_read: false,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Carlos',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '9',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'estefany@utp.edu.pe',
      is_read: false,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Estefany',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '10',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'gerardo@utp.edu.pe',
      is_read: false,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Gerardo',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '11',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'kathy@utp.edu.pe',
      is_read: true,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Kathy',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '12',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'melissa@utp.edu.pe',
      is_read: true,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Melissa',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
  ]
  private initSharedPreferences: MyPreferences = SHARED_PREFERENCES
  public myDatabases: string[] = ['DATABASE_INBOX', 'DATABASE_SENT', 'DATABASE_STARRED']
  public mySharedPreferences: string = 'SHARED_PREFERENCES'

  constructor(private storage: Storage) {
    console.log('[StoragedbService.constructor]')

    this.storage.create().then(async () => {
      await this.loadSharedPreferences()
      for (let database of this.myDatabases) {
        await this.loadDatabaseStorage(database)
      }
    })
  }

  async loadDatabaseStorage(database: string) {
    console.log('[StoragedbService.loadDatabaseStorage]')

    return this.getStorage(database).then((data) => {
      if (!data) {
        if (!SHARED_PREFERENCES.SETTINGS.INITIALIZE_DATABASE) return []

        let arrayDatabase: Array<any> = []

        switch (database) {
          case 'DATABASE_INBOX':
            arrayDatabase = this.initDataDB
            break
          case 'DATABASE_SENT':
            arrayDatabase = []
            break
          case 'DATABASE_STARRED':
            arrayDatabase = []
            break
        }

        return this.setStorage(database, arrayDatabase).then((data) => {
          console.log(`Cargar BD ${database} por defecto`)
          return data
        })
      }
      console.log(`Cargar BD ${database} por caché`)
      return data
    })
  }

  async loadSharedPreferences() {
    console.log('[StoragedbService.loadSharedPreferences]')

    return this.getStorage(this.mySharedPreferences).then((data) => {
      if (!data) {
        return this.setStorage(this.mySharedPreferences, this.initSharedPreferences).then((data) => {
          console.log(`Cargar BD ${this.mySharedPreferences} por defecto`)
          return data
        })
      }
      console.log(`Cargar BD ${this.mySharedPreferences} por caché`)

      // Iterar y actualizar
      const CREATE_SHARED_PREFERENCES = Object.create(SHARED_PREFERENCES)
      for (let item in data) {
        CREATE_SHARED_PREFERENCES.SETTINGS[item] = data[item]
      }

      // Actualizar prefencias del usuario
      SHARED_PREFERENCES.SETTINGS = CREATE_SHARED_PREFERENCES.SETTINGS
      return data
    })
  }

  async getStorage(key: string) {
    console.log('[StoragedbService.getStorage]', { key })
    return this.storage.get(key)
  }

  async setStorage(key: string, value: any) {
    console.log('[StoragedbService.setStorage]', { key, value })
    return this.storage.set(key, value)
  }

  async removeStorage(key: string) {
    console.log('[StoragedbService.removeStorage]', { key })
    await this.storage.remove(key)
  }
}
