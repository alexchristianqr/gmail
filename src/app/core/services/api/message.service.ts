import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Message } from '../../types/Message'
import { ParticipantService } from './participant.service'

type MessagePayload = {
  id?: string | any
  conversation_id?: string
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  database: string = 'DB_MESSAGES'

  constructor(private apiService: ApiService, private participantService: ParticipantService) {}

  async message(payload: MessagePayload) {
    console.log('[MessageService.message]', { payload })

    return this.apiService.getItems(this.database).then((res: Array<Message>) => {
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

    return this.apiService.getItems(this.database).then((res: Array<Message>) => {
      return res.filter(async (value: Message) => {
        // Set
        value.participant = await this.participantService.participant({ id: value.participant_id })
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
    console.log('[MessageService.create]', { item })

    item.participant = await this.participantService.participant({ id: item.participant_id })
    return this.apiService.createItem(this.database, item)
  }

  async updateMessage(item: Message, keyItem: string, valueItem: any) {
    console.log('[MessageService.update]', { item })

    return this.apiService.updateItem(this.database, item, keyItem, valueItem)
  }
}
