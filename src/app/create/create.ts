import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PopoverCreatePage } from './layouts/popover-create'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../core/services/api/api.service'
import { MyMessage } from '../core/types/MyMessage'
import { EventService } from '../core/services/events/event.service'
import { UtilsService } from '../core/services/utils/utils.service'
import { MyPreferences } from '../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../shared-preferences'

@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage implements OnInit {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  formGroup: FormGroup
  submitted: boolean | undefined
  loading: boolean = false

  constructor(
    private utilsService: UtilsService,
    private eventService: EventService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    console.log('[CreatePage.constructor]')
    this.formGroup = this.formGroupInitialize()
  }

  ngOnInit(): void {
    console.log('[CreatePage.ngOnInit]')
    this.formGroup = this.formGroupInitialize()
  }

  formGroupInitialize(): FormGroup {
    console.log('[CreatePage.formGroupInitialize]')

    return this.formBuilder.group({
      uid: this.formBuilder.control(null, [Validators.required]),
      database: this.formBuilder.control('DATABASE_INBOX', [Validators.required]),
      name: this.formBuilder.control(null, [Validators.required]),
      subject: this.formBuilder.control(null, [Validators.required]),
      message: this.formBuilder.control(null, [Validators.required]),
      from: this.formBuilder.control('alexchristianqr@utp.edu.pe', [
        Validators.required,
        Validators.email,
      ]),
      to: this.formBuilder.control('teacher2022@utp.edu.pe', [
        Validators.required,
        Validators.email,
      ]),
      is_read: this.formBuilder.control(false, [Validators.required]),
      created_at: this.formBuilder.control(Date.now(), [Validators.required]),
    })
  }

  /**
   * Enviar formulario
   */
  async onSubmit() {
    console.log('[CreatePage.onSubmit]')

    this.submitted = true

    // Obtener UID
    const uniqueUID = await this.getUniqueUID()
    this.formGroup.patchValue({ uid: uniqueUID })

    // Detener envío del formulario
    if (this.formGroup.invalid) {
      return this.presentAlert()
    }

    // Set data
    this.loading = true
    const item: MyMessage = this.formGroup.value

    // API
    const action = () => {
      return this.apiService
        .createItem(item.database, item)
        .then(async () => {
          await this.back()
        })
        .catch((error) => {
          console.error(error)
        })
    }

    // Validar shared preferences del usuario
    if (this.MY_SHARED_PREFERENCES.SETTINGS.CONFIRM_BEFORE_SENDING) {
      await this.utilsService.presentAlert({
        subHeader: '¿Estas seguro de enviar el mensaje?',
        message: 'Esta acción enviará tu mensaje a la lista de enviados.',
        buttons: [
          {
            text: 'OK',
            role: 'ok',
            handler: () => action(),
          },
          {
            handler: () => ({}),
          },
        ],
      })
    } else {
      return action()
    }
  }

  /**
   * Obtener UUID
   */
  getUniqueUID() {
    console.log('[CreatePage.getUniqueUID]')

    return this.apiService.getUniqueUID()
  }

  /**
   * Volver a la página anterior
   */
  async back() {
    console.log('[CreatePage.back]')

    this.eventService.publish()
    await this.router.navigate(['inbox'])
  }

  async presentAlert() {
    console.log('[CreatePage.presentAlert]')

    await this.utilsService.presentAlert({
      message: 'No se puede enviar tu mensaje, porque hay campos vacios.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => ({}),
        },
      ],
    })
  }

  async presentPopover(event: Event) {
    console.log('[CreatePage.presentPopover]')

    await this.utilsService.presentPopover({
      component: PopoverCreatePage,
      event: event,
    })
  }
}
