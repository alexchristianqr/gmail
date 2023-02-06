import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { IonicStorageModule } from '@ionic/storage-angular'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// INBOX
import { ListInbox } from './inbox/list/list-inbox'
import { ModalSettingsListInbox } from './inbox/list/layouts/modal-settings-list-inbox'
import { DetailInbox } from './inbox/detail/detail-inbox'
import { PopoverListInbox } from './inbox/list/layouts/popover-list-inbox'
import { ModalSettingsDetailInbox } from './inbox/detail/layouts/modal-settings-detail-inbox'
import { PopoverDetailInbox } from './inbox/detail/layouts/popover-detail-inbox'
import { CreateInbox } from './inbox/create/create-inbox'
import { ModalSettingsCreateInbox } from './inbox/create/layouts/modal-settings-create-inbox'
import { PopoverCreateInbox } from './inbox/create/layouts/popover-create-inbox'

// SENT
import { ListSent } from './sent/list/list-sent'

// SHARED
import { SearchPage } from './shared/search/search-page'
import { HomePage } from './shared/home/home-page'
import { GeneralPage } from './shared/general/general-page'

@NgModule({
  declarations: [
    // SHARED
    AppComponent,
    HomePage,
    SearchPage,
    GeneralPage,
    // INBOX
    DetailInbox,
    CreateInbox,
    ListInbox,
    PopoverCreateInbox,
    PopoverListInbox,
    PopoverDetailInbox,
    ModalSettingsCreateInbox,
    ModalSettingsDetailInbox,
    ModalSettingsListInbox,
    // SENT
    ListSent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
