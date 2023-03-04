import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { Storage } from '@ionic/storage'
import { MyPreferences } from '../../types/MyPreferences'
import { Message } from '../../types/Message'
import { Conversation } from '../../types/Conversation'
import { Participant } from '../../types/Participant'
import { FirebaseService } from '../api/firebase.service'
import { User } from '../../types/User'

@Injectable({
  providedIn: 'root',
})
export class StoragedbService {
  conversations: Array<Conversation> = [
    {
      id: '7718f578-02c9-40f7-a9de-951b3345f817',
      participant_id: '2ff8f271-e105-47d2-96ab-9f1b8f8b748b',
      name: 'Alex Christian',
      subject: 'Matricula Marzo 2023',
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      messages: [],
      is_starred: true,
      is_read: false,
      created_at: '2023-01-25 11:50',
    },
  ]
  messages: Array<Message> = [
    {
      id: '09557594-dd44-4b2c-bc94-d9b8a9e1f06f',
      conversation_id: '7718f578-02c9-40f7-a9de-951b3345f817',
      created_at: '2023-01-25 11:50',
      from: { email: 'alexchristianqr@utp.edu.pe', participant_id: '2ff8f271-e105-47d2-96ab-9f1b8f8b748b' },
      to: { email: 'sae@utp.edu.pe', participant_id: '09caff06-3940-4729-8889-105a9483b044' },
      // is_read: false,
      // is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      // fullName: 'Alex Christian',
      subject: 'Matricula Marzo 2023',
    },
    {
      id: '14671615-c0c6-4e2b-8907-7a633d68da28',
      conversation_id: '7718f578-02c9-40f7-a9de-951b3345f817',
      created_at: '2023-01-25 11:50',
      from: { email: 'sae@utp.edu.pe', participant_id: '09caff06-3940-4729-8889-105a9483b044' },
      to: { email: 'alexchristianqr@utp.edu.pe', participant_id: '2ff8f271-e105-47d2-96ab-9f1b8f8b748b' },
      // is_read: false,
      // is_starred: false,
      message:
        'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
      // fullName: 'Jacky',
      subject: 'Matricula Marzo 2023',
    },
  ]
  participants: Array<Participant> = [
    {
      id: '2ff8f271-e105-47d2-96ab-9f1b8f8b748b',
      user_id: '2ff8f271-e105-47d2-96ab-9f1b8f8b744t',
      created_at: '2023-01-25 11:50',
      email: 'alexchristianqr@utp.edu.pe',
      fullName: 'Alex Quispe',
    },
    {
      id: '09caff06-3940-4729-8889-105a9483b044',
      user_id: '2a065bbd-d4e7-4b9f-abf7-8a9a9a49123t',
      created_at: '2023-01-25 11:50',
      email: 'sae@utp.edu.pe',
      fullName: 'SAE',
    },
  ]
  users: Array<User> = [
    {
      id: '2ff8f271-e105-47d2-96ab-9f1b8f8b744t',
      created_at: '2023-01-25 11:50',
      email: 'alexchristianqr@utp.edu.pe',
      fullName: 'Alex Quispe',
    },
    {
      id: '2a065bbd-d4e7-4b9f-abf7-8a9a9a49123t',
      created_at: '2023-01-25 11:50',
      email: 'sae@utp.edu.pe',
      fullName: 'SAE',
    },
  ]
  private initSharedPreferences: MyPreferences = SHARED_PREFERENCES
  public myDatabases: string[] = ['conversations', 'messages', 'participants', 'users']
  public mySharedPreferences: string = 'SHARED_PREFERENCES'

  constructor(private storage: Storage, private firebaseService: FirebaseService) {
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

    return this.firebaseService.getCollection(database).then(async (res: any) => {
      if (!res) {
        if (!SHARED_PREFERENCES.SETTINGS.GENERAL_INITIALIZE_DATABASE) return []

        let valuesDatabase: any = []

        // Seleccionar base de datos
        switch (database) {
          case 'conversations':
            valuesDatabase = this.conversations
            for (const conversation of this.conversations) {
              await this.firebaseService.setCollection(database, conversation)
            }
            break
          case 'messages':
            valuesDatabase = this.messages
            for (const message of this.messages) {
              await this.firebaseService.setCollection(database, message)
            }
            break
          case 'participants':
            valuesDatabase = this.participants
            for (const participant of this.participants) {
              await this.firebaseService.setCollection(database, participant)
            }
            break
          case 'users':
            valuesDatabase = this.users
            for (const user of this.users) {
              await this.firebaseService.setCollection(database, user)
            }
            break
        }

        // Set database
        return this.firebaseService.getCollection(database).then((res) => {
          console.log(`Cargar ${database} por defecto`)
          return res
        })
      }

      console.log(`Cargar ${database} por caché`)

      if (database !== 'VERSION') {
        return res
      }

      // if (data?.version !== this.initVersion.version) {
      //   await this.storage.clear() // Depurar datos
      //   await this.eachDatabases() // Iterar bases de datos
      // }
    })
  }

  /**
   * Cargar preferencias del usuario
   */
  async loadSharedPreferences() {
    console.log('[StoragedbService.loadSharedPreferences]')

    return this.getStorage(this.mySharedPreferences).then((res) => {
      if (!res) {
        return this.setStorage(this.mySharedPreferences, this.initSharedPreferences).then((res) => {
          console.log(`Cargar ${this.mySharedPreferences} por defecto`)
          return res
        })
      }

      console.log(`Cargar ${this.mySharedPreferences} por caché`)

      // Iterar y actualizar
      const CREATE_SHARED_PREFERENCES = Object.create(SHARED_PREFERENCES)
      for (let item in res.SETTINGS) {
        CREATE_SHARED_PREFERENCES.SETTINGS[item] = res.SETTINGS[item]
      }

      // Actualizar prefencias del usuario
      SHARED_PREFERENCES.SETTINGS = CREATE_SHARED_PREFERENCES.SETTINGS
      return res
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
