import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PopoverCreateInbox } from './layouts/popover-create-inbox'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../core/services/api/api.service'
import { Message } from '../../../core/types/Message'
import { EventService } from '../../../core/services/events/event.service'
import { UtilsService } from '../../../core/services/utils/utils.service'
import { MyPreferences } from '../../../core/types/MyPreferences'
import { SHARED_PREFERENCES } from '../../../shared-preferences'
import { MyParams } from '../../../core/types/MyParams'
import { SentService } from '../../sent/sent.service'

@Component({
  selector: 'app-create-inbox',
  templateUrl: 'create-inbox.html',
})
export class CreateInbox implements OnInit {
  MY_SHARED_PREFERENCES: MyPreferences = SHARED_PREFERENCES
  formGroup: FormGroup
  submitted: boolean | undefined
  loading: boolean = false
  data: MyParams | any

  constructor(
    private sentService: SentService,
    private utilsService: UtilsService,
    private eventService: EventService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    console.log('[CreateInbox.constructor]')
    this.getState()
    this.formGroup = this.formGroupInitialize()
  }

  ngOnInit(): void {
    console.log('[CreateInbox.ngOnInit]')

    this.getState()
    this.formGroup = this.formGroupInitialize()
  }

  getState(): void {
    console.log('[CreateInbox.getState]')

    this.data = this.router.getCurrentNavigation()?.extras.state
  }

  formGroupInitialize(): FormGroup {
    console.log('[CreateInbox.formGroupInitialize]', this.data)

    return this.formBuilder.group({
      id: this.formBuilder.control(null, [Validators.required]),
      conversation_id: this.formBuilder.control(this.data?.item?.conversation_id, [Validators.required]),
      fullName: this.formBuilder.control(this.data?.item?.from?.participant?.fullName, [Validators.required]),
      message: this.formBuilder.control(null, [Validators.required]),
      from: this.formBuilder.group({
        email: this.formBuilder.control(this.data?.item?.from?.email || 'alexchristianqr@utp.edu.pe', [Validators.required, Validators.email]),
        participant_id: this.formBuilder.control(this.data?.item?.from?.participant_id, [Validators.required]),
      }),
      to: this.formBuilder.group({
        email: this.formBuilder.control(this.data?.item?.to?.email || 'jackie@utp.edu.pe', [Validators.required, Validators.email]),
        participant_id: this.formBuilder.control(this.data?.item?.to?.participant_id, [Validators.required]),
      }),
      subject: this.formBuilder.control(this.data?.item?.subject, [Validators.required]),
      // is_read: this.formBuilder.control(false, [Validators.required]),
      created_at: this.formBuilder.control(Date.now(), [Validators.required]),
    })
  }

  /**
   * Enviar formulario
   */
  async onSubmit() {
    console.log('[CreateInbox.onSubmit]')

    this.submitted = true

    // Obtener UID
    const uniqueMessageUID = await this.getUniqueUID()
    this.formGroup.patchValue({ id: uniqueMessageUID })

    // Obtener Conversation ID
    const { conversation_id } = this.formGroup.value
    if (!conversation_id) {
      const uniqueConversationUID = await this.getUniqueUID()
      this.formGroup.patchValue({ conversation_id: uniqueConversationUID })
    }

    // Detener envío del formulario
    if (this.formGroup.invalid) {
      return this.presentAlert()
    }

    // Set data
    this.loading = true

    const item: Message = this.formGroup.value

    // API
    const action = () => {
      return this.sentService
        .createItem(item)
        .then(() => {
          this.eventService.publish() // Emitir evento de actualización
          this.router.navigate(['mail/inbox'])
        })
        .catch((error) => {
          console.error(error)
        })
    }

    // Validar shared preferences del usuario
    if (this.MY_SHARED_PREFERENCES.SETTINGS.INBOX_CONFIRM_BEFORE_SENT) {
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
    console.log('[CreateInbox.getUniqueUID]')

    return this.apiService.getUniqueUID()
  }

  /**
   * Volver a la página anterior
   */
  async back() {
    console.log('[CreateInbox.back]')

    await this.router.navigate([this.data.path])
  }

  async presentAlert() {
    console.log('[CreateInbox.presentAlert]')

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
    console.log('[CreateInbox.presentPopover]')

    await this.utilsService.presentPopover({
      component: PopoverCreateInbox,
      event: event,
    })
  }
}
