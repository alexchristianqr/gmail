import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { MyPreferences } from '../../core/types/MyPreferences'
import { FirebaseService } from '../../core/services/api/firebase.service'
import { ConversationService } from '../../core/services/api/conversation.service'
import { MessageService } from '../../core/services/api/message.service'

@Injectable({
  providedIn: 'root',
})
export class StarredService {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor(private messageService: MessageService, private firebaseService: FirebaseService, private conversationService: ConversationService) {
    console.log('[StarredService.constructor]')
  }

  async getItems() {
    console.log('[StarredService.getItems]')

    // Obtener conversaciones
    let conversations = await this.conversationService.conversations()
    conversations = conversations.filter((item) => item.is_starred)

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

  async updateItem(item: any, keyItem: string, valueItem: any) {
    console.log('[StarredService.updateItem]', { keyItem, valueItem })

    const id = item.id
    return this.conversationService.updateConversation(id, {
      keyItem: keyItem,
      valueItem: valueItem,
    })
  }
}
