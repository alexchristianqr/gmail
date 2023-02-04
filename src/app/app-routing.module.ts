import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

// NUEVO MENSAJE
import { CreatePage } from './create/create'
import { ModalSettingsCreate } from './create/layouts/modal-settings-create'

// BANDEJA DE ENTRADA
import { MailsInboxPage } from './inbox/list/list-inbox'
import { ModalSettingsListInbox } from './inbox/list/layouts/modal-settings-list-inbox'

// DETALLE DEL MENSAJE
import { DetailPage } from './inbox/detail/detail'
import { ModalSettingsDetail } from './inbox/detail/layouts/modal-settings-detail'

// SHARED
import { SearchPage } from './shared/search/search'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inbox',
    pathMatch: 'full',
  },
  // BANDEJA DE ENTRADA
  {
    path: 'inbox',
    component: MailsInboxPage,
  },
  {
    title: 'Configuración',
    path: 'inbox-settings',
    component: ModalSettingsListInbox,
  },
  // DETALLE DEL MENSAJE
  {
    path: 'inbox-detail',
    component: DetailPage,
  },
  {
    title: 'Configuración',
    path: 'inbox-detail-settings',
    component: ModalSettingsDetail,
  },
  // NUEVO MENSAJE
  {
    path: 'create',
    component: CreatePage,
  },
  {
    title: 'Configuración',
    path: 'create-settings',
    component: ModalSettingsCreate,
  },
  // SHARED
  {
    path: 'search',
    component: SearchPage,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
