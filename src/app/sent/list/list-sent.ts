import { Component } from '@angular/core'

@Component({
  selector: 'page-mails-sent',
  templateUrl: 'list-sent.html',
})
export class ListSent {
  constructor() {
    console.log('[ListSent.constructor]')
  }
}
