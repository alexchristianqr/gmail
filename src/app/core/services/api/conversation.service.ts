import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Conversation } from '../../types/Conversation'

type ConversationPayload = {
  id?: string | any
  subject?: string | any
}

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  database: string = 'DB_CONVERSATIONS'
  constructor(private apiService: ApiService) {}

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

  async existsConversation(item: any): Promise<boolean> {
    console.log('[ConversationService.existsConversation]', { item })

    return this.apiService.getItems(this.database).then((res: Array<Conversation>) => {
      return res.some((value) => value.id === item.conversation_id)
    })
  }

  async convesations(payload?: ConversationPayload) {
    console.log('[ConversationService.convesations]', { payload })

    return this.apiService.getItems(this.database).then((res: Array<Conversation>) => {
      if (!payload) return res
      return res.filter((value: Conversation) => {
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

  async convesationsById(id: any) {
    console.log('[ConversationService.convesationsById]')

    return this.apiService.getItems(this.database).then((res) => res.find((value) => value.id === id))
  }

  async createConversation(item: any) {
    console.log('[ConversationService.createConversation]', { item })

    const messages: Array<any> = [{ ...item }]
    const conversation: Conversation = {
      ...item,
      messages,
      id: item.conversation_id,
    }
    return this.apiService.createItem(this.database, conversation)
  }

  async updateConversation(item: any, keyItem: string, valueItem: any) {
    console.log('[ConversationService.updateConversation]', { item })

    return this.apiService.updateItem(this.database, item, keyItem, valueItem)
  }

  async updateConversationMessages(item: any) {
    console.log('[ConversationService.updateConversationMessages]', { item })

    const conversation = await this.conversation({ id: item.conversation_id })
    if (!conversation) return

    const messages: Array<any> = [...conversation.messages, { ...item }]
    return this.apiService.updateItem(this.database, conversation, 'messages', messages)
  }
}
