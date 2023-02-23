import { Injectable } from '@angular/core'
import { Participant } from '../../types/Participant'
import { FirebaseService } from './firebase.service'

type ParticipantPayload = {
  id?: string
  email?: string
}

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  database: string = 'participants'

  constructor(private firebaseService: FirebaseService) {}

  async participant(id: string) {
    console.log('[ParticipantService.participant]', { id })

    return this.firebaseService.oneCollection(this.database, id).then((res: Participant | any) => {
      if (!res) return null
      return res
    })
  }
}
