import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Message } from '../../types/Message'

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  database: string = 'DB_MESSAGES'
  constructor(private apiService: ApiService) {}

  async message(item: Message) {
    console.log('[MessageService.message]')

    return this.apiService.getItems(this.database).then((res: Array<Message>) => {
      return res.find((value: Message) => value.id === item.id)
    })
  }

  async messages() {
    console.log('[MessageService.messages]')

    return this.apiService.getItems(this.database)
  }

  async create(item: Message) {
    console.log('[MessageService.create]', { item })

    const message: Message = {
      ...item,
    }
    return this.apiService.createItem(this.database, message)
  }

  async update(item: Message, keyItem: string, valueItem: any) {
    console.log('[MessageService.update]', { item })

    return this.apiService.updateItem(this.database, item, keyItem, valueItem)
  }
}
