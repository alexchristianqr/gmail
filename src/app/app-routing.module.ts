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
import { HomeComponent } from './auth/home/home.component'
import { SigninComponent } from './auth/signin/signin.component'
import { LogoutGuard } from './core/guards/logout.guard'

// SHARED
import { MailComponent } from './mail/mail.component'
import { SearchComponent } from './shared/search/search.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // SHARED
  {
    title: 'Buscar mensajes',
    path: 'search',
    component: SearchComponent,
  },

  // AUTH
  {
    title: 'App',
    path: 'home',
    component: HomeComponent,
  },
  {
    title: 'Iniciar sesión',
    path: 'signin',
    component: SigninComponent,
  },

  // MAIL
  {
    title: 'Mail',
    path: 'mail',
    component: MailComponent,
    children: [
      // AUTH
      {
        title: 'Cerrar sesión',
        path: 'logout',
        component: SigninComponent,
        canActivate: [LogoutGuard],
      },

      // STARRED
      {
        title: 'Destacados',
        path: 'starred',
        component: ListStarred,
      },

      // SENT
      {
        title: 'Enviados',
        path: 'sent',
        component: ListSent,
      },

      // INBOX
      {
        title: 'Bandeja de entrada',
        path: 'inbox',
        component: ListInbox,
      },
      {
        title: 'Configuración General',
        path: 'inbox-settings',
        component: ModalSettingsListInbox,
      },
      {
        title: 'Detalle',
        path: 'inbox-detail',
        component: DetailInbox,
      },
      {
        title: 'Configuración',
        path: 'inbox-detail-settings',
        component: ModalSettingsDetailInbox,
      },
      {
        title: 'Nuevo mensaje',
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
