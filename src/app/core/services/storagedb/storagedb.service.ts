import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { Storage } from '@ionic/storage'
import { MyPreferences } from '../../types/MyPreferences'
import { Message } from '../../types/Message'
import { Conversation } from '../../types/Conversation'
import { Participant } from '../../types/Participant'

@Injectable({
  providedIn: 'root',
})
export class StoragedbService {
  conversations: Array<Conversation> = [
    {
      id: '1',
      name: 'Alex Christian',
      subject: 'Funciones lineales',
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      messages: [
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
          uid: '4',
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
      ],
      is_starred: true,
      is_read: false,
      created_at: '2023-01-25 11:50',
    },
    {
      id: '2',
      name: 'Manuel Plata',
      subject: 'Funciones lineales',
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      messages: [
        {
          uid: '1',
          conversation_id: '2',
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
          conversation_id: '2',
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
          conversation_id: '2',
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
          uid: '4',
          conversation_id: '2',
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
      ],
      is_starred: true,
      is_read: false,
      created_at: '2023-01-25 11:50',
    },
  ]
  messages: Array<Message> = [
    {
      uid: '1',
      id: '1',
      conversation_id: '1',
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
      id: '2',
      conversation_id: '1',
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
  ]
  participants: Array<Participant> = [
    {
      id: '1',
      conversation_id: '1',
      created_at: '2023-01-25 11:50',
      email: 'alexchristianqr@utp.edu.pe',
    },
    {
      id: '2',
      conversation_id: '1',
      created_at: '2023-01-25 11:50',
      email: 'jacky@utp.edu.pe',
    },
  ]
  private initDataDB: Array<Message> = [
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
  private initVersion: { updated_at: number; version: string } = { updated_at: Date.now(), version: '2.1.*' }
  public myDatabases: string[] = ['VERSION', 'DATABASE_INBOX', 'DATABASE_SENT', 'DATABASE_STARRED', 'DB_CONVERSATIONS', 'DB_MESSAGES', 'DB_PARTICIPANTS']
  public mySharedPreferences: string = 'SHARED_PREFERENCES'

  constructor(private storage: Storage) {
    console.log('[StoragedbService.constructor]')

    // Inicializar storage
    this.storage.create().then(async (res) => {
      console.log('My Driver DB is: ', res.driver)
      await this.eachDatabases()
    })
  }

  /**
   * Iterar bases de datos
   */
  async eachDatabases() {
    // Cargar preferencias del usuario
    await this.loadSharedPreferences()

    // Iterar bases de datos
    for (let database of this.myDatabases) {
      await this.loadDatabaseStorage(database)
    }
  }

  /**
   * Cargar bases de datos
   * @param database
   */
  public async loadDatabaseStorage(database: string) {
    console.log('[StoragedbService.loadDatabaseStorage]')

    return this.getStorage(database).then(async (data) => {
      if (!data) {
        if (!SHARED_PREFERENCES.SETTINGS.GENERAL_INITIALIZE_DATABASE) return []

        let valuesDatabase: any = []

        // Seleccionar base de datos
        switch (database) {
          case 'VERSION':
            valuesDatabase = this.initVersion
            break
          case 'DATABASE_INBOX':
            valuesDatabase = this.initDataDB
            break
          case 'DATABASE_SENT':
            valuesDatabase = []
            break
          case 'DATABASE_STARRED':
            valuesDatabase = []
            break
          case 'DB_CONVERSATIONS':
            valuesDatabase = this.conversations
            break
          case 'DB_MESSAGES':
            valuesDatabase = this.messages
            break
          case 'DB_PARTICIPANTS':
            valuesDatabase = this.participants
            break
        }

        // Set database
        return this.setStorage(database, valuesDatabase).then((data) => {
          console.log(`Cargar BD ${database} por defecto`)
          return data
        })
      }

      console.log(`Cargar BD ${database} por caché`)

      if (database !== 'VERSION') {
        return data
      }

      if (data.version !== this.initVersion.version) {
        await this.storage.clear() // Depurar datos
        await this.eachDatabases() // Iterar bases de datos
      }
    })
  }

  /**
   * Cargar preferencias del usuario
   */
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
      for (let item in data.SETTINGS) {
        CREATE_SHARED_PREFERENCES.SETTINGS[item] = data.SETTINGS[item]
      }

      // Actualizar prefencias del usuario
      SHARED_PREFERENCES.SETTINGS = CREATE_SHARED_PREFERENCES.SETTINGS
      return data
    })
  }

  /**
   * Obtener storage
   * @param key
   */
  async getStorage(key: string) {
    console.log('[StoragedbService.getStorage]', { key })
    return this.storage.get(key)
  }

  /**
   * Set storage
   * @param key
   * @param value
   */
  async setStorage(key: string, value: any) {
    console.log('[StoragedbService.setStorage]', { key, value })
    return this.storage.set(key, value)
  }

  /**
   * Eliminar storage
   * @param key
   */
  async removeStorage(key: string) {
    console.log('[StoragedbService.removeStorage]', { key })
    await this.storage.remove(key)
  }
}
