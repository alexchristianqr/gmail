import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { MyPreferences } from '../../core/types/MyPreferences'
import { ApiService } from '../../core/services/api/api.service'
import { MessageService } from '../../core/services/api/message.service'
import { ConversationService } from '../../core/services/api/conversation.service'

@Injectable({
  providedIn: 'root',
})
export class SentService {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private apiService: ApiService, private messageService: MessageService, private conversationService: ConversationService) {
    console.log('[SentService.constructor]')
  }

  async getItems() {
    console.log('[SentService.getItems]')

    // Obtener conversaciones
    let conversations = await this.conversationService.conversations()
    conversations = conversations.filter((item) => !item.is_read)

    // Iterar conversación
    for (const conversation of conversations) {
      const messages = await this.messageService.messages({ conversation_id: conversation.id })
      messages.sort((a, b) => (a > b ? 1 /* ASC */ : -1 /* DESC */)) // Lista de orden DESC
      conversation.messages = messages
    }

    // Ordenar
    conversations.sort((a, b) => (a > b ? 1 /* ASC */ : -1 /* DESC */)) // Lista de orden DESC
    return conversations
  }

  async createItem(item: any) {
    console.log('[SentService.createItem]', { item })

    await this.messageService.createMessage(item)
    // return this.conversationService.existsConversation(item).then((res) => {
    //   if (res) {
    //     this.conversationService.updateConversationMessages(item)
    //   } else {
    //     this.conversationService.createConversation(item)
    //   }
    // })
  }
}
