import { Injectable } from '@angular/core'
import { Conversation } from '../../types/Conversation'
import { ParticipantService } from './participant.service'
import { FirebaseService } from './firebase.service'
import { Message } from '../../types/Message'
import { Subscriber, Subscription } from 'rxjs'

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

  constructor(private firebaseService: FirebaseService, private participantService: ParticipantService) {}

  async conversation(id: string) {
    console.log('[ConversationService.conversation]', { id })

    return this.firebaseService.singleCollection(this.database, id).then((res: any) => {
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
        const id: string | any = value.participant_id
        value.participant = await this.participantService.participant(id)

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

  async createConversation(item: any) {
    console.log('[ConversationService.createConversation]', { item })

    // Set
    // const messages: Array<any> = [{ ...item }]
    const conversation: Conversation = {
      ...item,
      participant_id: item.from.participant_id,
      is_read: false,
    }

    // API
    return this.firebaseService.setCollection(this.database, conversation)
  }

  async updateConversation(id: string, payload: ConversationPayload) {
    console.log('[ConversationService.updateConversation]', { payload })

    let data: object | any = {}
    if (payload.keyItem && payload.valueItem.toString()) {
      data[payload.keyItem] = payload.valueItem
    }
    if (payload.dataItem) {
      data = payload.dataItem
    }

    return this.firebaseService.updateCollection(this.database, id, data)
  }

  async deleteConversation(id: string, payload?: ConversationPayload) {
    return this.firebaseService.deleteCollection(this.database, id)
  }

  async existsConversation(item: any): Promise<boolean> {
    console.log('[ConversationService.existsConversation]', { item })

    const id = item.conversation_id
    return this.conversation(id).then((res: Conversation) => {
      return !!res
    })
  }
}
