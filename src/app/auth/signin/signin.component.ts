import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.scss'],
})
export class SigninComponent {
  constructor(private router: Router) {}

  async back() {
    console.log('[SigninComponent.back]')
    await this.router.navigate(['/home'])
  }
}
