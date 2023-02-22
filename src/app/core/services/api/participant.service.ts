import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Participant } from '../../types/Participant'
import { FirebaseService } from './firebase.service'

type ParticipantPayload = {
  uuid?: string | any
  id?: string | any
  email?: string
}

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  database: string = 'participants'

  constructor(private apiService: ApiService, private firebaseService: FirebaseService) {}

  async participant(payload: ParticipantPayload) {
    console.log('[ParticipantService.participant]', { payload })

    return this.firebaseService.oneCollection(this.database, payload.uuid).then((res: Participant | any) => {
      if (!res) return null
      return res
    })
  }
}
