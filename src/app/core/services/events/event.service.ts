import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public dataSource = new Subject()
  public refreshSource$ = this.dataSource.asObservable()

  constructor() {
    console.log('[EventService.constructor]')
  }

  /**
   * Emitir evento
   * @param value
   */
  publish(value?: any): void {
    console.log('[EventService.publish]', { value })
    console.log('refreshSource$ ->', this.refreshSource$)
    this.dataSource.next(value)
  }
}
