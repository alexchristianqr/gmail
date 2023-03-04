import { Injectable } from '@angular/core'
import { Message } from '../../types/Message'
import { ParticipantService } from './participant.service'
import { FirebaseService } from './firebase.service'

type MessagePayload = {
  id?: string
  conversation_id?: string
  item?: any
  dataItem?: any
  keyItem?: any
  valueItem?: any
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  database: string = 'messages'

  constructor(private firebaseService: FirebaseService, private participantService: ParticipantService) {}

  async message(payload: MessagePayload) {
    console.log('[MessageService.message]', { payload })

    const id: string | any = payload.id
    return this.firebaseService.singleCollection(this.database, id).then((res: Message | any) => {
      if (!res) return null
      return res
    })
  }

  async messages(payload?: MessagePayload) {
    console.log('[MessageService.messages]', { payload })

    return this.firebaseService.getCollection(this.database).then(async (res: Array<Message> | any) => {
      if (!res) return []

      const messages = res.filter((value: Message) => {
        // Obtener todos los registros
        if (!payload) return true

        // Filtrar
        if (payload.hasOwnProperty('id')) {
          return value.id === payload.id
        } else if (payload.hasOwnProperty('conversation_id')) {
          return value?.conversation_id?.toString() === payload?.conversation_id?.toString()
        } else {
          return []
        }
      })

      if (!messages) return []
      for (const message of messages) {
        // Set
        const idFromParticipant: string | any = message.from.participant_id
        const idToParticipant: string | any = message.to.participant_id
        message.from.participant = await this.participantService.participant(idFromParticipant)
        message.to.participant = await this.participantService.participant(idToParticipant)
      }

      return messages
    })
  }

  async createMessage(item: Message) {
    console.log('[MessageService.createMessage]', { item })

    return this.firebaseService.setCollection(this.database, item)
  }

  async updateMessage(payload: MessagePayload) {
    console.log('[MessageService.updateMessage]', { payload })

    const id: string = payload.item.id
    let data: object | any = {}
    if (payload.keyItem && payload.valueItem.toString()) {
      data[payload.keyItem] = payload.valueItem
    }
    if (payload.dataItem) {
      data = payload.dataItem
    }

    return this.firebaseService.updateCollection(this.database, id, data)
  }
}
