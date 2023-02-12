import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { IonicStorageModule } from '@ionic/storage-angular'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// INBOX
import { ListInbox } from './mail/inbox/list/list-inbox'
import { ModalSettingsListInbox } from './mail/inbox/list/layouts/modal-settings-list-inbox'
import { DetailInbox } from './mail/inbox/detail/detail-inbox'
import { PopoverListInbox } from './mail/inbox/list/layouts/popover-list-inbox'
import { ModalSettingsDetailInbox } from './mail/inbox/detail/layouts/modal-settings-detail-inbox'
import { PopoverDetailInbox } from './mail/inbox/detail/layouts/popover-detail-inbox'
import { CreateInbox } from './mail/inbox/create/create-inbox'
import { ModalSettingsCreateInbox } from './mail/inbox/create/layouts/modal-settings-create-inbox'
import { PopoverCreateInbox } from './mail/inbox/create/layouts/popover-create-inbox'

// SENT
import { ListSent } from './mail/sent/list/list-sent'

// STARRED
import { ListStarred } from './mail/starred/list/list-starred'

// AUTH
import { HomeComponent } from './auth/home/home.component'
import { SigninComponent } from './auth/signin/signin.component'
import { LogoutGuard } from './core/guards/logout.guard'

// GENERAL SETTINGS
import { SettingsComponent } from './mail/settings/settings.component'
import { ModalSettingsGeneralInbox } from './mail/settings/inbox/modal-settings-general-inbox'
import { PopoverSettingsGeneral } from './mail/settings/layouts/popover-settings-general'

// SHARED
import { SearchComponent } from './shared/search/search.component'
import { MailComponent } from './mail/mail.component'
import { ShowHidePasswordComponent } from './auth/signin/layouts/show-hide-password/show-hide-password.component'

@NgModule({
  declarations: [
    // SHARED
    AppComponent,
    MailComponent,
    SearchComponent,
    ShowHidePasswordComponent,

    // GENERAL SETTINGS
    SettingsComponent,
    ModalSettingsGeneralInbox,
    PopoverSettingsGeneral,

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

    // STARRED
    ListStarred,

    // AUTH
    SigninComponent,
    HomeComponent,
  ],
  imports: [FormsModule, ReactiveFormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LogoutGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
