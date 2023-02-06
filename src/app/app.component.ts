import { Component } from '@angular/core'
import { ListInbox } from './inbox/list/list-inbox'
import { ListSent } from './sent/list/list-sent'
import { HomePage } from './shared/home/home-page'
import { GeneralPage } from './shared/general/general-page'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
        path: 'inbox',
      },
      {
        title: 'Enviados',
        icon: 'mail-open',
        // db: 'DATABASE_SENT',
        status: false,
        path: 'sent',
      },
      {
        title: 'Destacados',
        icon: 'star',
        // db: 'DATABASE_SENT',
        status: false,
        path: 'starred',
      },
    ]
    this.pagesSection2 = [
      {
        title: 'Settings',
        icon: 'cog',
        status: false,
        path: 'settings',
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
      //   component: HomePage,
      //   // db: 'DATABASE_SAVED',
      //   status: false,
      //   path: 'saved',
      // },
      // {
      //   title: 'Mail Span',
      //   icon: 'bug',
      //   component: HomePage,
      //   // db: 'DATABASE_SPAN',
      //   status: false,
      //   path: 'span',
      // },
    ]
    this.pagesSection3 = [
      // {
      //   title: 'Settings',
      //   icon: 'cog',
      //   component: GeneralPage,
      //
      //   status: false,
      //   path: 'settings',
      // },
      {
        title: 'Logout',
        icon: 'log-out',
        status: false,
        path: 'logout',
      },
    ]
  }
}
