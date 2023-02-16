import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { MyPreferences } from '../../core/types/MyPreferences'
import { ApiService } from '../../core/services/api/api.service'
import { Message } from '../../core/types/Message'
import { MessageService } from '../../core/services/api/message.service'
import { ConversationService } from '../../core/services/api/conversation.service'

@Injectable({
  providedIn: 'root',
})
export class SentService {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  myDatabase: string = 'DB_CONVERSATIONS'

  constructor(private apiService: ApiService, private messageService: MessageService, private conversationService: ConversationService) {
    console.log('[SentService.constructor]')
  }

  async getItems() {
    console.log('[SentService.getItems]')

    return this.apiService.getItems(this.myDatabase).then((data) => {
      // data = data.filter((item) => !item.is_read)
      return data.sort((a, b) => (a > b ? 1 /* ASC */ : -1 /* DESC */)) // Lista de orden DESC
    })
  }

  async createItem(item: any) {
    console.log('[SentService.createItem]', { item })

    await this.messageService.create(item)
    return this.conversationService.existsConversation(item).then((res) => {
      if (res) return
      this.conversationService.create(item)
    })
  }
}
