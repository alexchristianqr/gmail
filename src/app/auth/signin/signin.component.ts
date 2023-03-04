import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
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
      email: this.formBuilder.control('alexchristianqr@utp.edu.pe', [Validators.required, Validators.email]),
      password: this.formBuilder.control('Alex.2023', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[.!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,16}$/)]),
    })
  }

  async onSubmit() {
    console.log('[SigninComponent.onSubmit]')

    // Set
    this.submitted = true
    this.loading = true
    const actionReset = () => {
      this.submitted = false
      this.loading = false
    }

    // Reglas de validación
    if (this.formGroup.invalid) {
      actionReset()
      return this.utilsService.presentAlert({ header: 'Error', subHeader: 'Inicio de sesión', message: 'No cumple con las reglas de validación', buttons: [{ handler: () => {} }] })
    }

    // Request params
    const { email, password } = this.formGroup.value

    // API
    return this.authService
      .signIn(email, password)
      .then(async () => {
        // Router
        await this.router.navigate(['mail/inbox'])
        actionReset()
      })
      .catch(async () => {
        actionReset()
        return this.utilsService.presentAlert({ header: 'Error', subHeader: 'Inicio de sesión', message: 'El email o la contraseña no es correcto', buttons: [{ handler: () => {} }] })
      })
  }
}
