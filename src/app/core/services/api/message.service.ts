import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Message } from '../../types/Message'

type MessagePayload = {
  id?: string | any
  conversation_id?: string | any
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  database: string = 'DB_MESSAGES'

  constructor(private apiService: ApiService) {}

  async message(payload: MessagePayload) {
    console.log('[MessageService.message]', { payload })

    return this.apiService.getItems(this.database).then((res: Array<Message>) => {
      return res.find((value: Message) => {
        if (payload.hasOwnProperty('id')) {
          return value.id === payload.id
        } else if (payload.hasOwnProperty('conversation_id')) {
          return value.conversation_id === payload.conversation_id
        } else {
          return null
        }
      })
    })
  }

  async messages(payload?: MessagePayload) {
    console.log('[MessageService.messages]', { payload })

    return this.apiService.getItems(this.database).then((res: Array<Message>) => {
      if (!payload) return res
      return res.filter((value: Message) => {
        if (payload.hasOwnProperty('id')) {
          return value.id === payload.id
        } else if (payload.hasOwnProperty('conversation_id')) {
          return value.conversation_id === payload.conversation_id
        } else {
          return []
        }
      })
    })
  }

  async createMessage(item: Message) {
    console.log('[MessageService.create]', { item })

    return this.apiService.createItem(this.database, item)
  }

  async updateMessage(item: Message, keyItem: string, valueItem: any) {
    console.log('[MessageService.update]', { item })

    return this.apiService.updateItem(this.database, item, keyItem, valueItem)
  }
}
