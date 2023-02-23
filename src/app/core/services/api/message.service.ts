import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Message } from '../../types/Message'
import { ParticipantService } from './participant.service'
import { FirebaseService } from './firebase.service'

type MessagePayload = {
  id?: string
  conversation_id?: string
  item?: any
  dataItem?: any
  keyItem?: any
  valueItem?: any
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  database: string = 'messages'

  constructor(private firebaseService: FirebaseService, private apiService: ApiService, private participantService: ParticipantService) {}

  async message(payload: MessagePayload) {
    console.log('[MessageService.message]', { payload })

    return this.firebaseService.getCollection(this.database).then((res: Array<Message>) => {
      if (!res) return null

      return res.find((value: Message) => {
        if (payload.hasOwnProperty('id')) {
          return value.id === payload.id
        } else if (payload.hasOwnProperty('conversation_id')) {
          return value.conversation_id === payload.conversation_id
        } else {
          return null
        }
      })
    })
  }

  async messages(payload?: MessagePayload) {
    console.log('[MessageService.messages]', { payload })

    return this.firebaseService.getCollection(this.database).then((res: Array<Message>) => {
      if (!res) return []

      return res.filter(async (value: Message | any) => {
        // Set
        value.from.participant = await this.participantService.participant({ id: value.from.participant_id })
        value.to.participant = await this.participantService.participant({ id: value.to.participant_id })

        // Obtener todos los registros
        if (!payload) return true

        // Filtrar
        if (payload.hasOwnProperty('id')) {
          return value.id === payload.id
        } else if (payload.hasOwnProperty('conversation_id')) {
          return value.conversation_id === payload.conversation_id
        } else {
          return []
        }
      })
    })
  }

  async createMessage(item: Message) {
    console.log('[MessageService.createMessage]', { item })

    // item.participant = await this.participantService.participant({ id: item.participant_id })
    return this.firebaseService.setCollection(this.database, item)
  }

  async updateMessage(payload: MessagePayload) {
    console.log('[MessageService.updateMessage]', { payload })

    const id: string = payload.item.id
    let data: object | any = {}
    if (payload.keyItem && payload.valueItem.toString()) {
      data[payload.keyItem] = payload.valueItem
    }
    if (payload.dataItem) {
      data = payload.dataItem
    }

    return this.firebaseService.updateCollection(this.database, id, data)
  }
}
