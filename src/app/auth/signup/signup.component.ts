import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MyParams } from '../../core/types/MyParams'
import { Router } from '@angular/router'
import { FirebaseService } from '../../core/services/api/firebase.service'
import { UtilsService } from '../../core/services/utils/utils.service'
import { ParticipantService } from '../../core/services/api/participant.service'
import { UserService } from '../../core/services/api/user.service'

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

  constructor(
    private userService: UserService,
    private participantService: ParticipantService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: FirebaseService,
    private utilsService: UtilsService
  ) {
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
      fullName: this.formBuilder.control(null),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[.!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,16}$/)]),
      confirm_password: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[.!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,16}$/)]),
    })
  }

  async onSubmit() {
    console.log('[SignupComponent.onSubmit]')

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
      return this.utilsService.presentAlert({ header: 'Error', subHeader: 'Crear cuenta', message: 'No cumple con las reglas de validación', buttons: [{ handler: () => {} }] })
    }

    // Request params
    const { fullName, email, password, confirm_password } = this.formGroup.value

    // Validar
    if (password !== confirm_password) {
      actionReset()
      return this.utilsService.presentAlert({ header: 'Error', subHeader: 'Crear cuenta', message: 'Ls contraseñas no coinciden', buttons: [{ handler: () => {} }] })
    }

    // API
    return this.authService
      .signUp(email, password)
      .then(async (res: any) => {
        // Crear usuario y participante
        await this.userService.createUser({
          id: res.user.uid,
          fullName: res.user.displayName,
          email: res.user.email,
        })
        await this.participantService.createParticipant({
          user_id: res.user.uid,
          fullName,
          email,
          is_active: true,
        })

        // Router
        await this.router.navigate(['signin'])

        actionReset()
      })
      .catch(() => {
        actionReset()
        return this.utilsService.presentAlert({ header: 'Error', subHeader: 'Crear cuenta', message: 'No se ha podido crear una cuenta, vuelve a intentarlo', buttons: [{ handler: () => {} }] })
      })
  }
}
