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

  emitEvent(value?: any): void {
    console.log('[EventService.emitEvent]', { value })
    console.log('refreshSource$ ->', this.refreshSource$)
    this.dataSource.next(value)
  }

  createEvent(value?: any) {
    console.log('[EventService.createEvent]', { value })
    console.log('refreshSource$ ->', this.refreshSource$)
    return this.dataSource.asObservable()
  }
}
