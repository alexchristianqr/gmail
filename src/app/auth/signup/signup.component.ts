import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MyParams } from '../../core/types/MyParams'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss'],
})
export class SignupComponent {
  formGroup: FormGroup
  submitted: boolean | undefined
  loading: boolean = false
  data: MyParams | any

  constructor(private router: Router, private formBuilder: FormBuilder) {
    console.log('[SignupComponent.constructor]')
    this.formGroup = this.formGroupInitialize()
  }

  async back() {
    console.log('[SignupComponent.back]')
    await this.router.navigate(['/home'])
  }

  formGroupInitialize(): FormGroup {
    console.log('[SignupComponent.formGroupInitialize]')

    return this.formBuilder.group({
      fullName: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email, Validators.required]),
      password: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
      confirm_password: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    })
  }

  async onSubmit() {
    console.log('[SignupComponent.onSubmit]')

    this.submitted = true

    // Stop here if form is invalid
    if (this.formGroup.invalid) {
      this.submitted = false
      this.loading = false
      // return this.utilsService.presentAlert({ header: 'Inicio de sesión', subHeader: 'Mensaje de error #1', message: 'El usuario o la contraseña no es válido', buttons: [{ handler: () => {} }] })
    }

    this.loading = true
    const { username, password } = this.formGroup.value

    if (username == 'invitado@gmail.com' && password == 'invitado@2023') {
      setTimeout(async () => {
        await this.router.navigate(['mail/inbox'])
        this.submitted = false
        this.loading = false
      }, 1500)
    } else {
      setTimeout(async () => {
        this.submitted = false
        this.loading = false
        // return this.utilsService.presentAlert({ header: 'Inicio de sesión', subHeader: 'Mensaje de error #2', message: 'El usuario o la contraseña no es válido', buttons: [{ handler: () => {} }] })
      }, 999)
    }

    // API
    // return this.authService.signIn(email, password).catch(() => {
    //   this.submitted = false
    //   this.loading = false
    // })
  }
}
