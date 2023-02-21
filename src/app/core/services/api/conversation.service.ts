import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Conversation } from '../../types/Conversation'
import { ParticipantService } from './participant.service'
import { EventService } from '../events/event.service'

type ConversationPayload = {
  id?: string | any
  subject?: string
}

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  database: string = 'DB_CONVERSATIONS'
  constructor(private apiService: ApiService, private participantService: ParticipantService, private eventService: EventService) {}

  async conversation(payload: ConversationPayload) {
    console.log('[ConversationService.conversation]', { payload })

    return this.apiService.getItems(this.database).then((res: Array<Conversation>) => {
      return res.find((value: Conversation) => {
        if (payload.hasOwnProperty('id')) {
          return value.id === payload.id
        } else if (payload.hasOwnProperty('subject')) {
          return value.subject === payload.subject
        } else {
          return null
        }
      })
    })
  }

  async convesations(payload?: ConversationPayload) {
    console.log('[ConversationService.convesations]', { payload })

    return this.apiService.getItems(this.database).then((res: Array<Conversation>) => {
      return res.filter(async (value: Conversation) => {
        // Set
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

  async existsConversation(item: any): Promise<boolean> {
    console.log('[ConversationService.existsConversation]', { item })

    return this.apiService.getItems(this.database).then((res: Array<Conversation>) => {
      return res.some((value) => value.id === item.conversation_id)
    })
  }

  async createConversation(item: any) {
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
    return this.apiService.createItem(this.database, conversation)
  }

  async updateConversation(item: any, keyItem: string, valueItem: any) {
    console.log('[ConversationService.updateConversation]', { item })

    return this.apiService.updateItem(this.database, item, keyItem, valueItem)
  }

  async updateConversationMessages(item: any) {
    console.log('[ConversationService.updateConversationMessages]', { item })

    // Set
    const conversation = await this.conversation({ id: item.conversation_id })
    if (!conversation) return
    const messages: Array<any> = [...conversation.messages, { ...item }]
    const participant_id = item.from.participant_id
    const is_read = item.is_read

    // API
    await this.updateConversation(conversation, 'is_read', is_read)
    await this.updateConversation(conversation, 'messages', messages)
    await this.updateConversation(conversation, 'participant_id', participant_id)
    this.eventService.publish() // Emitir evento de actualización
  }
}
