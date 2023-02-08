import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

// INBOX
import { CreateInbox } from './mail/inbox/create/create-inbox'
import { ModalSettingsCreateInbox } from './mail/inbox/create/layouts/modal-settings-create-inbox'
import { ListInbox } from './mail/inbox/list/list-inbox'
import { ModalSettingsListInbox } from './mail/inbox/list/layouts/modal-settings-list-inbox'
import { DetailInbox } from './mail/inbox/detail/detail-inbox'
import { ModalSettingsDetailInbox } from './mail/inbox/detail/layouts/modal-settings-detail-inbox'

// SENT
import { ListSent } from './mail/sent/list/list-sent'

// STARRED
import { ListStarred } from './mail/starred/list/list-starred'

// AUTH
import { LoginComponent } from './auth/login/login.component'

// SHARED
import { SearchComponent } from './shared/search/search.component'
import { MailComponent } from './mail/mail.component'
import { LogoutGuard } from './core/guards/logout.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // SHARED
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  // MAIN
  {
    path: 'mail',
    component: MailComponent,
    children: [
      // AUTH
      {
        path: 'logout',
        component: LoginComponent,
        canActivate: [LogoutGuard],
      },

      // STARRED
      {
        path: 'starred',
        component: ListStarred,
      },

      // SENT
      {
        path: 'sent',
        component: ListSent,
      },

      // INBOX
      {
        path: 'inbox',
        component: ListInbox,
      },
      {
        title: 'Configuración',
        path: 'inbox-settings',
        component: ModalSettingsListInbox,
      },
      {
        path: 'inbox-detail',
        component: DetailInbox,
      },
      {
        title: 'Configuración',
        path: 'inbox-detail-settings',
        component: ModalSettingsDetailInbox,
      },
      {
        path: 'create',
        component: CreateInbox,
      },
      {
        title: 'Configuración',
        path: 'create-settings',
        component: ModalSettingsCreateInbox,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
