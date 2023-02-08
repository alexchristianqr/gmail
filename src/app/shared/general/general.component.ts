import { Component } from '@angular/core'

@Component({
  selector: 'page-general',
  templateUrl: 'general.component.html',
})
export class GeneralComponent {
  constructor() {
    console.log('[GeneralComponent.constructor]')
  }
}
