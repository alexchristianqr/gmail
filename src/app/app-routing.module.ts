import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

// NUEVO MENSAJE
import { CreateInbox } from './inbox/create/create-inbox'
import { ModalSettingsCreateInbox } from './inbox/create/layouts/modal-settings-create-inbox'

// BANDEJA DE ENTRADA
import { ListInbox } from './inbox/list/list-inbox'
import { ModalSettingsListInbox } from './inbox/list/layouts/modal-settings-list-inbox'

// DETALLE DEL MENSAJE
import { DetailInbox } from './inbox/detail/detail-inbox'
import { ModalSettingsDetailInbox } from './inbox/detail/layouts/modal-settings-detail-inbox'

// SHARED
import { SearchPage } from './shared/search/search-page'
import { ListSent } from './sent/list/list-sent'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inbox',
    pathMatch: 'full',
  },

  // SHARED
  {
    path: 'search',
    component: SearchPage,
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
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
