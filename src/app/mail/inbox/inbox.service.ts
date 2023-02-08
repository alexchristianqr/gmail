import { Injectable } from '@angular/core'
import { SHARED_PREFERENCES } from '../../shared-preferences'
import { MyPreferences } from '../../core/types/MyPreferences'

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  myDatabase: string = 'DATABASE_INBOX'
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES

  constructor() {
    console.log('[InboxService.constructor]')
  }
}