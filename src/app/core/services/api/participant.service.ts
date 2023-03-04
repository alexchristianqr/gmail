import { Injectable } from '@angular/core'
import { Participant } from '../../types/Participant'
import { FirebaseService } from './firebase.service'
import { Message } from '../../types/Message'

type ParticipantPayload = {
  id?: string
  email?: string
  fullName?: string
}

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  database: string = 'participants'

  constructor(private firebaseService: FirebaseService) {}

  async participant(id: string) {
    console.log('[ParticipantService.participant]', { id })

    return this.firebaseService.singleCollection(this.database, id).then((res: Participant | any) => {
      if (!res) return null
      return res
    })
  }

  async participants(payload?: ParticipantPayload) {
    console.log('[ParticipantService.participants]', { payload })

    return this.firebaseService.getCollection(this.database).then((res: Array<Participant>) => {
      if (!res) return []

      return res
    })
  }

  async createParticipant(item: Participant) {
    console.log('[ParticipantService.createMessage]', { item })

    return this.firebaseService.setCollection(this.database, item)
  }
}
