import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Conversation } from '../../types/Conversation'
import { ParticipantService } from './participant.service'
import { EventService } from '../events/event.service'
import { FirebaseService } from './firebase.service'

type ConversationPayload = {
  id?: string
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

    const id: string = payload.item.id
    return this.firebaseService.oneCollection(this.database, id).then((res: any) => {
      if (!res) return null
      return res
    })
  }

  async conversations(payload?: ConversationPayload) {
    console.log('[ConversationService.convesations]', { payload })

    return this.firebaseService.getCollection(this.database).then((res: Array<Conversation>) => {
      if (!res) return []

      return res.filter(async (value: Conversation) => {
        // Obtener participante
        value.participant = await this.participantService.participant({ id: value.participant_id })

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

  async deleteConversation(payload: ConversationPayload) {
    const id = payload.item.id
    return this.firebaseService.deleteCollection(this.database, id)
  }
}
