import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../app/shared-preferences'
import { Storage } from '@ionic/storage'
import { MyPreferences } from '../../app/core/types/MyPreferences'
import { MyMessage } from '../../app/core/types/MyMessage'
import uuid from 'uuidv4'

@Injectable({
  providedIn: 'root',
})
export class HttpServiceProvider {
  private initDataDB: Array<MyMessage> = [
    {
      uid: '1',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'alexchristianqr@utp.edu.pe',
      is_read: false,
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
      from: 'maria@utp.edu.pe',
      is_read: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Maria',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
    {
      uid: '3',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'yolanda@utp.edu.pe',
      is_read: true,
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
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Melissa',
      subject: 'Matricula Marzo 2023',
      to: 'sae@utp.edu.pe',
    },
  ]
  private initSharedPreferences: MyPreferences = SHARED_PREFERENCES
  public myDatabase: string = 'DATABASE_INBOX'
  public mySharedPreferences: string = 'SHARED_PREFERENCES'

  constructor(private storage: Storage) {
    console.log('[HttpServiceProvider.constructor]')

    this.storage.create().then(async () => {
      await this.loadSharedPreferences()
      await this.loadDatabaseStorage(this.myDatabase)
    })
  }

  async loadDatabaseStorage(label: string) {
    console.log('[HttpServiceProvider.loadDatabaseStorage]')

    return this.getStorage(label).then((data) => {
      if (!data) {
        if (!SHARED_PREFERENCES.SETTINGS.INITIALIZE_DATABASE) return []
        return this.setStorage(label, this.initDataDB).then((data) => {
          console.log(`Cargar BD ${label} por defecto`)
          return data
        })
      }
      console.log(`Cargar BD ${label} por caché`)
      return data
    })
  }

  async loadSharedPreferences() {
    console.log('[HttpServiceProvider.loadSharedPreferences]')

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

  async getStorage(label: string) {
    console.log('[HttpServiceProvider.getStorage]', { label })
    return this.storage.get(label)
  }

  async setStorage(key: string, value: any) {
    console.log('[HttpServiceProvider.setStorage]', { key, value })
    return this.storage.set(key, value)
  }

  async setRemoveStorage(key: string, value: any) {
    console.log('[HttpServiceProvider.setRemoveStorage]', { key, value })
    await this.storage.remove(key)
    return this.storage.set(key, value)
  }

  async removeStorage(key: string) {
    console.log('[HttpServiceProvider.removeStorage]', { key })
    await this.storage.remove(key)
  }

  async addItem(database: string, item: MyMessage | any) {
    console.log('[HttpServiceProvider.addItem]', { database, item })

    return this.getStorage(database).then((data: Array<MyMessage>) => {
      // Agregar un item
      data.unshift(item)

      // Actualizar almacenamiento
      this.setStorage(database, data)
    })
  }

  async updateItem(database: string, item: MyMessage | any, keyItem: string, valueItem: any) {
    console.log('[HttpServiceProvider.updateItem]', { database, item, keyItem, valueItem })

    return this.getStorage(database).then((data: Array<MyMessage>) => {
      // Encontrar un item
      const dataFounded: any = data.find((value) => value.uid === item.uid)
      if (!dataFounded) return
      dataFounded[keyItem] = valueItem // Actualizar campo

      // Actualizar almacenamiento
      this.setStorage(database, data)
    })
  }

  async removeItem(database: any, item: any) {
    console.log('[HttpServiceProvider.removeItem]')

    return this.getStorage(database).then((data: Array<MyMessage>) => {
      // Filtrar items
      const dataFiltered = data.filter((value) => value.uid != item.uid)

      // Actualizar almacenamiento
      this.setStorage(database, dataFiltered)
    })
  }

  async getUniqueUID() {
    return uuid()
  }
}
