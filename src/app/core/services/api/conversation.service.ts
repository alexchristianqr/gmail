import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Conversation } from '../../types/Conversation'

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  database: string = 'DB_CONVERSATIONS'
  constructor(private apiService: ApiService) {}

  async conversation(item: any) {
    console.log('[ConversationService.conversation]', { item })

    return this.apiService.getItems(this.database).then((res: Array<Conversation>) => {
      return res.find((value: Conversation) => value.id === item.id)
    })
  }

  async existsConversation(item: any): Promise<boolean> {
    console.log('[ConversationService.existsConversation]', { item })

    return this.apiService.getItems(this.database).then((res: Array<Conversation>) => {
      return res.includes(item)
    })
  }

  async convesations() {
    console.log('[ConversationService.convesations]')

    return this.apiService.getItems(this.database)
  }

  async create(item: any) {
    console.log('[ConversationService.create]', { item })

    const messages: Array<any> = [{ ...item }]
    const conversation: Conversation = {
      ...item,
      messages,
    }
    return this.apiService.createItem(this.database, conversation)
  }

  async update(item: any, keyItem: string, valueItem: any) {
    console.log('[ConversationService.update]', { item })

    return this.apiService.updateItem(this.database, item, keyItem, valueItem)
  }
}
