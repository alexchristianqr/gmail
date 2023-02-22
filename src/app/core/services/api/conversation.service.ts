import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Conversation } from '../../types/Conversation'
import { ParticipantService } from './participant.service'
import { EventService } from '../events/event.service'
import { FirebaseService } from './firebase.service'

type ConversationPayload = {
  id?: string | any
  subject?: string
  item?: any
  dataItem?: any
  keyItem?: any
  valueItem?: any
}

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  database: string = 'conversations'

  constructor(private firebaseService: FirebaseService, private apiService: ApiService, private participantService: ParticipantService, private eventService: EventService) {}

  async conversation(payload: ConversationPayload) {
    console.log('[ConversationService.conversation]', { payload })

    const uuid: string = payload.item.uuid
    return this.firebaseService.oneCollection(this.database, uuid).then((res: any) => {
      if (!res) return null

      return res

      // return res.find((value: Conversation) => {
      //   if (payload.hasOwnProperty('id')) {
      //     return value.id === payload.id
      //   } else if (payload.hasOwnProperty('subject')) {
      //     return value.subject === payload.subject
      //   } else {
      //     return null
      //   }
      // })
    })
  }

  async conversations(payload?: ConversationPayload) {
    console.log('[ConversationService.convesations]', { payload })

    return this.firebaseService.getCollection(this.database).then((res: Array<Conversation>) => {
      if (!res) return []

      return res.filter(async (value: Conversation) => {
        // Obtener participante
        value.participant = await this.participantService.participant({ uuid: value.participant_id })

        // Obtener todos los registros
        if (!payload) return true

        // Filtrar
        if (payload.hasOwnProperty('id')) {
          return value.id === payload.id
        } else if (payload.hasOwnProperty('subject')) {
          return value.subject === payload.subject
        } else {
          return []
        }
      })
    })
  }

  async existsConversation(item: any): Promise<boolean> {
    console.log('[ConversationService.existsConversation]', { item })

    return this.firebaseService.getCollection(this.database).then((res: Array<Conversation>) => {
      return res.some((value) => value.id === item.conversation_id)
    })
  }

  async createConversation(item: Conversation | any) {
    console.log('[ConversationService.createConversation]', { item })

    // Set
    const messages: Array<any> = [{ ...item }]
    const conversation: Conversation = {
      ...item,
      id: item.conversation_id,
      participant: item.participant,
      messages: messages,
    }

    // API
    return this.firebaseService.setCollection(this.database, conversation)
  }

  async updateConversation(payload: ConversationPayload) {
    console.log('[ConversationService.updateConversation]', { payload })

    const uuid: string = payload.item.uuid
    let data: object | any = {}
    if (payload.keyItem && payload.valueItem.toString()) {
      data[payload.keyItem] = payload.valueItem
    }
    if (payload.dataItem) {
      data = payload.dataItem
    }

    return this.firebaseService.updateCollection(this.database, uuid, data)
  }

  async updateConversationMessages(item: any) {
    console.log('[ConversationService.updateConversationMessages]', { item })

    // Set
    const conversation = await this.conversation({ item })
    if (!conversation) return

    const messages: Array<any> = [...conversation.messages, { ...item }]
    const participant_id = item.from.participant_id
    const is_read = item.is_read

    let data = {
      is_read: is_read,
      messages: messages,
      participant_id: participant_id,
    }

    // API
    await this.updateConversation({ item: conversation, dataItem: data })
    this.eventService.publish() // Emitir evento de actualización
  }

  async deleteConversation(payload: ConversationPayload) {
    const uuid = payload.item.uuid
    return this.firebaseService.deleteCollection(this.database, uuid)
  }
}
