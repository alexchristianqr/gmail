import { Component } from '@angular/core'

type Page = {
  title: string
  icon: string
  status: boolean
  path: string
}

@Component({
  selector: 'app-mail',
  templateUrl: 'mail.component.html',
  styleUrls: ['mail.component.scss'],
})
export class MailComponent {
  pagesPrimary: Array<Page>
  pagesSecondary: Array<Page>
  pagesTertiary: Array<Page>

  constructor() {
    console.log('[MailComponent.constructor]')
    this.pagesPrimary = [
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
    this.pagesSecondary = [
      {
        title: 'Settings',
        icon: 'cog',
        status: false,
        path: '/mail/general/settings',
      },
    ]
    this.pagesTertiary = [
      {
        title: 'Logout',
        icon: 'log-out',
        status: false,
        path: '/mail/logout',
      },
    ]
  }
}
