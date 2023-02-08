import { Component } from '@angular/core'

@Component({
  selector: 'app-general',
  templateUrl: 'general.component.html',
})
export class GeneralComponent {
  constructor() {
    console.log('[GeneralComponent.constructor]')
  }
}
