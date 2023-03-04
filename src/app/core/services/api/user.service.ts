import { Injectable } from '@angular/core'
import { Participant } from '../../types/Participant'
import { FirebaseService } from './firebase.service'
import { User } from '../../types/User'

type UserPayload = {
  id?: string
  email?: string
  fullName?: string
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  database: string = 'users'

  constructor(private firebaseService: FirebaseService) {}

  async user(id: string) {
    console.log('[UserService.user]', { id })

    return this.firebaseService.singleCollection(this.database, id).then((res: User | any) => {
      if (!res) return null
      return res
    })
  }

  async users(payload?: UserPayload) {
    console.log('[UserService.users]', { payload })

    return this.firebaseService.getCollection(this.database).then((res: Array<User>) => {
      if (!res) return []

      return res
    })
  }

  async createUser(item: User) {
    console.log('[UserService.createUser]', { item })

    return this.firebaseService.setCollection(this.database, item)
  }
}
