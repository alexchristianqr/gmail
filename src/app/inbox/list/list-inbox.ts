import { Component, ViewChild } from '@angular/core'
import { PopoverController } from '@ionic/angular'
import { HttpServiceProvider } from '../../../providers/http-service/http-service'
import { Storage } from '@ionic/storage'
import { PopoverMailPage } from './layouts/popover-list-inbox'
import { Router } from '@angular/router'

@Component({
  selector: 'page-mails-inbox',
  templateUrl: 'list-inbox.html',
  styleUrls: ['list-inbox.scss'],
})
export class MailsInboxPage {
  @ViewChild('popover') popover: any
  database: any = []
  public MYSHAREDPREFERENCES: any = {}

  constructor(private popoverCtrl: PopoverController, private httpService: HttpServiceProvider, private storage: Storage, private router: Router) {
    this.fnFetch()
  }

  async doInfinite() {
    console.log('infinite')
  }

  async doRefresh(event: any) {
    console.log('Begin async operation', { event })
    return this.storage
      .get('DATABASE_INBOX')
      .then((data) => {
        setTimeout(() => {
          this.database = data
          this.httpService.loadPreferences(this)
          console.log('Async operation has ended')
          event.target.complete()
        }, 2000)
      })
      .catch((error) => {
        console.error(error)
        // this.dialogService.closeLoading()
      })
  }

  async fnViewDetail(data: any) {
    await this.router.navigate(['inbox-detail'], { state: data })
  }

  async fnViewSearch() {
    // return this.navCtrl.push(SearchPage, { database: SHARED_PREFERENCE.DB.DI })
  }

  async fnViewCreate() {
    // return this.navCtrl.push(CreatePage, { database: SHARED_PREFERENCE.DB.DI })
    // return this.navCtrl.navigateRoot('inbox/create', {queryParams: {database: SHARED_PREFERENCE.DB.DI}})
    await this.router.navigate(['create'])
  }

  public fnFetch() {
    // this.dialogService.showLoading()
    // const res =  this.storage.get('DATABASE_INBOX')
    // console.log({res})
    // return res
    this.storage
      .get('DATABASE_INBOX')
      .then((data) => {
        if (data) {
          this.database = data
        } else {
          const initDB = [
            {
              created_at: '2023-01-25 11:50',
              database: 'DATABASE_INBOX',
              from: 'alexchristianqr@utp.edu.pe',
              is_read: false,
              message:
                'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
              name: 'Alex Christian Quispe Roque',
              subject: 'Funciones lineales',
              to: 'sae@utp.edu.pe',
            },
            {
              created_at: '2023-01-25 11:50',
              database: 'DATABASE_INBOX',
              from: 'maria@utp.edu.pe',
              is_read: false,
              message:
                'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
              name: 'Maria',
              subject: 'Matricula Marzo 2023',
              to: 'sae@utp.edu.pe',
            },
            {
              created_at: '2023-01-25 11:50',
              database: 'DATABASE_INBOX',
              from: 'yolanda@utp.edu.pe',
              is_read: true,
              message:
                'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
              name: 'Yolanda',
              subject: 'Matricula Marzo 2023',
              to: 'sae@utp.edu.pe',
            },
            {
              created_at: '2023-01-25 11:50',
              database: 'DATABASE_INBOX',
              from: 'nando@utp.edu.pe',
              is_read: false,
              message:
                'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
              name: 'Nando',
              subject: 'Matricula Marzo 2023',
              to: 'sae@utp.edu.pe',
            },
            {
              created_at: '2023-01-25 11:50',
              database: 'DATABASE_INBOX',
              from: 'jorge@utp.edu.pe',
              is_read: false,
              message:
                'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
              name: 'Jorge',
              subject: 'Matricula Marzo 2023',
              to: 'sae@utp.edu.pe',
            },
            {
              created_at: '2023-01-25 11:50',
              database: 'DATABASE_INBOX',
              from: 'teresa@utp.edu.pe',
              is_read: false,
              message:
                'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
              name: 'Teresa',
              subject: 'Matricula Marzo 2023',
              to: 'sae@utp.edu.pe',
            },
            {
              created_at: '2023-01-25 11:50',
              database: 'DATABASE_INBOX',
              from: 'beatriz@utp.edu.pe',
              is_read: true,
              message:
                'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
              name: 'Beatriz',
              subject: 'Matricula Marzo 2023',
              to: 'sae@utp.edu.pe',
            },
            {
              created_at: '2023-01-25 11:50',
              database: 'DATABASE_INBOX',
              from: 'carlos@utp.edu.pe',
              is_read: false,
              message:
                'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
              name: 'Carlos',
              subject: 'Matricula Marzo 2023',
              to: 'sae@utp.edu.pe',
            },
            {
              created_at: '2023-01-25 11:50',
              database: 'DATABASE_INBOX',
              from: 'estefany@utp.edu.pe',
              is_read: false,
              message:
                'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
              name: 'Estefany',
              subject: 'Matricula Marzo 2023',
              to: 'sae@utp.edu.pe',
            },
            {
              created_at: '2023-01-25 11:50',
              database: 'DATABASE_INBOX',
              from: 'gerardo@utp.edu.pe',
              is_read: false,
              message:
                'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
              name: 'Gerardo',
              subject: 'Matricula Marzo 2023',
              to: 'sae@utp.edu.pe',
            },
            {
              created_at: '2023-01-25 11:50',
              database: 'DATABASE_INBOX',
              from: 'kathy@utp.edu.pe',
              is_read: true,
              message:
                'Tu matrícula en Verano 2023 se registró correctamente. El detalle de cursos y secciones matriculados lo podrás encontrar líneas abajo. Por favor, toma nota de tu código de operación, el cual deberás proporcionar ante cualquier requerimiento o consulta que tengas respecto al proceso de matrícula.',
              name: 'Kathy',
              subject: 'Matricula Marzo 2023',
              to: 'sae@utp.edu.pe',
            },
          ]
          // this.httpService.savedInitialize({ data: initDB, database: 'DATABASE_INBOX', self: this })
          this.database = []
        }

        this.httpService.loadPreferences(this)
        // this.dialogService.closeLoading()

        console.log('Fetch storage from Mails Inbox!')
      })
      .catch((error) => {
        console.error(error)
        // this.dialogService.closeLoading()
      })
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({ component: PopoverMailPage, event: event, dismissOnSelect: true })
    await popover.present()
  }
}