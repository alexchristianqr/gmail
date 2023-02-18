import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Participant } from '../../types/Participant'

type ParticipantPayload = {
  id?: string | any
  email?: string
}

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  database: string = 'DB_PARTICIPANTS'

  constructor(private apiService: ApiService) {}

  async participant(payload: ParticipantPayload) {
    console.log('[ParticipantService.participant]', { payload })

    return this.apiService.getItems(this.database).then((res: Array<Participant>) => {
      return res.find((value: Participant) => {
        if (payload.hasOwnProperty('id')) {
          return value.id === payload.id
        } else if (payload.hasOwnProperty('email')) {
          return value.email === payload.email
        } else {
          return null
        }
      })
    })
  }
}
