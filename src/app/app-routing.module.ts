import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

// SHARED
import { SearchPage } from './shared/search/search-page'

// INBOX
import { CreateInbox } from './inbox/create/create-inbox'
import { ModalSettingsCreateInbox } from './inbox/create/layouts/modal-settings-create-inbox'
import { ListInbox } from './inbox/list/list-inbox'
import { ModalSettingsListInbox } from './inbox/list/layouts/modal-settings-list-inbox'
import { DetailInbox } from './inbox/detail/detail-inbox'
import { ModalSettingsDetailInbox } from './inbox/detail/layouts/modal-settings-detail-inbox'

// SENT
import { ListSent } from './sent/list/list-sent'

// STARRED
import { ListStarred } from './starred/list/list-starred'

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
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
