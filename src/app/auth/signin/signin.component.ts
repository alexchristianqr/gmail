import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms'
import { MyParams } from '../../core/types/MyParams'
import { UtilsService } from '../../core/services/utils/utils.service'
import { FirebaseService } from '../../core/services/api/firebase.service'

@Component({
  selector: 'app-login',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.scss'],
})
export class SigninComponent {
  formGroup: FormGroup
  submitted: boolean | undefined
  loading: boolean = false
  data: MyParams | any

  constructor(private authService: FirebaseService, private router: Router, private formBuilder: FormBuilder, private utilsService: UtilsService) {
    console.log('[SigninComponent.constructor]')
    this.formGroup = this.formGroupInitialize()
  }

  async back() {
    console.log('[SigninComponent.back]')
    await this.router.navigate(['/home'])
  }

  formGroupInitialize(): FormGroup {
    console.log('[SigninComponent.formGroupInitialize]')

    return this.formBuilder.group({
      email: this.formBuilder.control('invitado@gmail.com', [Validators.required, Validators.email]),
      password: this.formBuilder.control('invitado@2023', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    })
  }

  async onSubmit() {
    console.log('[SigninComponent.onSubmit]')
    this.submitted = true

    // Stop here if form is invalid
    // if (this.formGroup.invalid) {
    //   this.submitted = false
    //   this.loading = false
    //   return this.utilsService.presentAlert({ header: 'Inicio de sesión', message: 'El usuario o la contraseña no es válido', buttons: [{ handler: () => {} }] })
    // }

    this.loading = true
    const { email, password } = this.formGroup.value

    // API
    return this.authService
      .signIn(email, password)
      .then(async (res) => {
        console.log({ res })
        // Router
        await this.router.navigate(['mail/inbox'])

        this.submitted = false
        this.loading = false
      })
      .catch(() => {
        this.submitted = false
        this.loading = false
        return this.utilsService.presentAlert({ header: 'Inicio de sesión', message: 'Error al iniciar sesión', buttons: [{ handler: () => {} }] })
      })
  }
}
