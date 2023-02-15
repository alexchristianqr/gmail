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
import { ModalSettingsListSent } from './mail/sent/list/layouts/modal-settings-list-sent'

// STARRED
import { ListStarred } from './mail/starred/list/list-starred'
import { ModalSettingsListStarred } from './mail/starred/list/layouts/modal-settings-list-starred'

// AUTH
import { HomeComponent } from './auth/home/home.component'
import { SigninComponent } from './auth/signin/signin.component'
import { LogoutGuard } from './core/guards/logout.guard'

// GENERAL SETTINGS
import { SettingsComponent } from './mail/settings/settings.component'
import { ModalSettingsGeneralInbox } from './mail/settings/inbox/modal-settings-general-inbox'
import { ModalSettingsGeneralSent } from './mail/settings/sent/modal-settings-general-sent'
import { ModalSettingsGeneralStarred } from './mail/settings/starred/modal-settings-general-starred'

// SHARED
import { MailComponent } from './mail/mail.component'
import { SearchComponent } from './shared/search/search.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
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
      // SHARED
      {
        title: 'Buscar mensajes',
        path: 'search',
        component: SearchComponent,
      },

      // GENERAL SETTINGS
      {
        title: 'Configuración general',
        path: 'general/settings',
        component: SettingsComponent,
      },
      {
        title: 'Configuración general',
        path: 'general/settings/inbox',
        component: ModalSettingsGeneralInbox,
      },
      {
        title: 'Configuración general',
        path: 'general/settings/sent',
        component: ModalSettingsGeneralSent,
      },
      {
        title: 'Configuración general',
        path: 'general/settings/starred',
        component: ModalSettingsGeneralStarred,
      },

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
      {
        title: 'Configuración General',
        path: 'starred-settings',
        component: ModalSettingsListStarred,
      },

      // SENT
      {
        title: 'Enviados',
        path: 'sent',
        component: ListSent,
      },
      {
        title: 'Configuración General',
        path: 'sent-settings',
        component: ModalSettingsListSent,
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
