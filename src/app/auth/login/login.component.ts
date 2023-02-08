import { Component, ContentChild, OnInit } from '@angular/core'
import { IonInput } from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false
  @ContentChild(IonInput) input?: IonInput

  constructor() {}

  ngOnInit() {}

  toggleShow() {
    this.showPassword = !this.showPassword
    if (!this.input) return
    this.input.type = this.showPassword ? 'text' : 'password'
  }
}
