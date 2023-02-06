import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { IonicStorageModule } from '@ionic/storage-angular'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { DetailPage } from './inbox/detail/detail'
import { SearchPage } from './shared/search/search'
import { CreatePage } from './create/create'
import { MailsSentPage } from './sent/list/list-sent'
import { ModalSettingsListInbox } from './inbox/list/layouts/modal-settings-list-inbox'
import { HomePage } from './shared/home/home'
import { ModalSettingsDetail } from './inbox/detail/layouts/modal-settings-detail'
import { PopoverMailPage } from './inbox/list/layouts/popover-list-inbox'
import { ModalSettingsCreate } from './create/layouts/modal-settings-create'
import { MailsInboxPage } from './inbox/list/list-inbox'
import { PopoverCreatePage } from './create/layouts/popover-create'
import { GeneralPage } from './shared/general/general'
import { PopoverDetailPage } from './inbox/detail/layouts/popover-detail'

@NgModule({
  declarations: [
    AppComponent,
    DetailPage,
    SearchPage,
    CreatePage,
    MailsSentPage,
    MailsInboxPage,
    GeneralPage,
    HomePage,
    PopoverCreatePage,
    PopoverMailPage,
    PopoverDetailPage,
    ModalSettingsCreate,
    ModalSettingsDetail,
    ModalSettingsListInbox,
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
