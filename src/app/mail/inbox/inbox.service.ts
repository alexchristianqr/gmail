import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { MyPreferences } from '../../core/types/MyPreferences'
import { ApiService } from '../../core/services/api/api.service'
import { Message } from '../../core/types/Message'
import { ConversationService } from '../../core/services/api/conversation.service'
import { MessageService } from '../../core/services/api/message.service'
import { FirebaseService } from '../../core/services/api/firebase.service'

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private firebaseService: FirebaseService, private apiService: ApiService, private conversationService: ConversationService, private messageService: MessageService) {
    console.log('[InboxService.constructor]')
  }

  async getItems() {
    console.log('[InboxService.getItems]')

    // Obtener conversaciones
    const conversations = await this.conversationService.conversations()

    // Iterar conversación
    for (const conversation of conversations) {
      const messages = await this.messageService.messages({ conversation_id: conversation.id })
      messages.sort((a, b) => (new Date(a.created_at) < new Date(b.created_at) ? 1 /* ASC */ : -1 /* DESC */)) // Lista de orden DESC
      conversation.messages = messages
    }

    // Ordenar
    conversations.sort((a, b) => (a > b ? 1 /* ASC */ : -1 /* DESC */)) // Lista de orden DESC
    return conversations
  }

  async deleteItem(item: Message | any) {
    console.log('[InboxService.deleteItem]')

    return this.conversationService.deleteConversation({ item })
  }

  async updateItem(item: Message | any, keyItem: string, valueItem: any) {
    console.log('[InboxService.updateItem]', { keyItem, valueItem })

    return this.conversationService.updateConversation({
      item: item,
      keyItem: keyItem,
      valueItem: valueItem,
    })
  }
}
