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
      subject: 'Matricula Marzo 2023',
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      participant_id: '2',
      messages: [],
      is_starred: true,
      is_read: false,
      created_at: '2023-01-25 11:50',
    },
  ]
  messages: Array<Message> = [
    {
      id: '1',
      conversation_id: '1',
      participant_id: '1',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'alexchristianqr@utp.edu.pe',
      fromEmail: { email: 'alexchristianqr@utp.edu.pe', participant_id: '1' },
      to: 'jacky@utp.edu.pe',
      toEmail: { email: 'jacky@utp.edu.pe', participant_id: '2' },
      is_read: false,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Alex Christian',
      subject: 'Matricula Marzo 2023',
    },
    {
      id: '2',
      conversation_id: '1',
      participant_id: '2',
      created_at: '2023-01-25 11:50',
      database: 'DATABASE_INBOX',
      from: 'jacky@utp.edu.pe',
      fromEmail: { email: 'jacky@utp.edu.pe', participant_id: '2' },
      to: 'alexchristianqr@utp.edu.pe',
      toEmail: { email: 'alexchristianqr@utp.edu.pe', participant_id: '1' },
      is_read: false,
      is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      name: 'Jacky',
      subject: 'Matricula Marzo 2023',
    },
  ]
  participants: Array<Participant> = [
    {
      id: '1',
      created_at: '2023-01-25 11:50',
      email: 'alexchristianqr@utp.edu.pe',
      fullName: 'Alex Quispe',
    },
    {
      id: '2',
      created_at: '2023-01-25 11:50',
      email: 'jacky@utp.edu.pe',
      fullName: 'Jackie Uchalin',
    },
    {
      id: '3',
      created_at: '2023-01-25 11:50',
      email: 'sae@utp.edu.pe',
      fullName: 'SAE',
    },
  ]
  private initSharedPreferences: MyPreferences = SHARED_PREFERENCES
  private initVersion: { updated_at: number; version: string } = { updated_at: Date.now(), version: '2.1.*' }
  public myDatabases: string[] = ['VERSION', 'DB_CONVERSATIONS', 'DB_MESSAGES', 'DB_PARTICIPANTS']
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
          console.log(`Cargar ${database} por defecto`)
          return data
        })
      }

      console.log(`Cargar ${database} por caché`)

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
          console.log(`Cargar ${this.mySharedPreferences} por defecto`)
          return data
        })
      }

      console.log(`Cargar ${this.mySharedPreferences} por caché`)

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
