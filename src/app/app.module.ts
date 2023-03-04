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
import { ModalSettingsListSent } from './mail/sent/list/layouts/modal-settings-list-sent'
import { PopoverListSent } from './mail/sent/list/layouts/popover-list-sent'

// STARRED
import { ListStarred } from './mail/starred/list/list-starred'
import { ModalSettingsListStarred } from './mail/starred/list/layouts/modal-settings-list-starred'
import { PopoverListStarred } from './mail/starred/list/layouts/popover-list-starred'

// AUTH
import { HomeComponent } from './auth/home/home.component'
import { SigninComponent } from './auth/signin/signin.component'
import { SignupComponent } from './auth/signup/signup.component'
import { LogoutGuard } from './core/guards/logout.guard'

// GENERAL SETTINGS
import { SettingsComponent } from './mail/settings/settings.component'
import { ModalSettingsGeneralInbox } from './mail/settings/inbox/modal-settings-general-inbox'
import { PopoverSettingsGeneral } from './mail/settings/layouts/popover-settings-general'
import { ModalSettingsGeneralSent } from './mail/settings/sent/modal-settings-general-sent'
import { ModalSettingsGeneralStarred } from './mail/settings/starred/modal-settings-general-starred'

// SHARED
import { SearchComponent } from './shared/search/search.component'
import { MailComponent } from './mail/mail.component'
import { ShowHidePasswordComponent } from './auth/signin/layouts/show-hide-password/show-hide-password.component'
import { ModalSelectUserComponent } from './mail/inbox/create/layouts/modal-select-user.component'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { environment } from '../environments/environment'
const firebaseConfig: object = environment.firebase

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
    ModalSettingsGeneralSent,
    ModalSettingsGeneralStarred,

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
    ModalSelectUserComponent,

    // SENT
    ListSent,
    ModalSettingsListSent,
    PopoverListSent,

    // STARRED
    ListStarred,
    ModalSettingsListStarred,
    PopoverListStarred,

    // AUTH
    SigninComponent,
    SignupComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LogoutGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
