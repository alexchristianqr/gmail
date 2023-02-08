import { Component } from '@angular/core'

@Component({
  selector: 'app-mail',
  templateUrl: 'mail.component.html',
  styleUrls: ['mail.component.scss'],
})
export class MailComponent {
  pagesSection1: Array<{
    title: string
    icon: string
    status: boolean
    path: string
  }>
  pagesSection2: Array<{
    title: string
    icon: string
    status: boolean
    path: string
  }>
  pagesSection3: Array<{
    title: string
    icon: string
    status: boolean
    path: string
  }>

  constructor() {
    this.pagesSection1 = [
      {
        title: 'Inbox',
        icon: 'mail',
        // db: 'DATABASE_INBOX',
        status: false,
        path: '/mail/inbox',
      },
      {
        title: 'Enviados',
        icon: 'mail-open',
        // db: 'DATABASE_SENT',
        status: false,
        path: '/mail/sent',
      },
      {
        title: 'Destacados',
        icon: 'star',
        // db: 'DATABASE_SENT',
        status: false,
        path: '/mail/starred',
      },
    ]
    this.pagesSection2 = [
      {
        title: 'Settings',
        icon: 'cog',
        status: false,
        path: '/mail/settings',
      },
      // {
      //   title: 'Enviados',
      //   icon: 'mail-open',
      //   // db: 'DATABASE_SENT',
      //   status: false,
      //   path: 'sent',
      // },
      // {
      //   title: 'Promotions',
      //   icon: 'pricetag',
      //   // db: 'DATABASE_RECEIVED',
      //   status: false,
      //   path: 'promotion',
      // },
      // {
      //   title: 'Mail Saved',
      //   icon: 'cloud',
      //   component: MailComponent,
      //   // db: 'DATABASE_SAVED',
      //   status: false,
      //   path: 'saved',
      // },
      // {
      //   title: 'Mail Span',
      //   icon: 'bug',
      //   component: MailComponent,
      //   // db: 'DATABASE_SPAN',
      //   status: false,
      //   path: 'span',
      // },
    ]
    this.pagesSection3 = [
      // {
      //   title: 'Settings',
      //   icon: 'cog',
      //   component: GeneralComponent,
      //
      //   status: false,
      //   path: 'settings',
      // },
      {
        title: 'Logout',
        icon: 'log-out',
        status: false,
        path: '/mail/logout',
      },
    ]
  }
}
