export type MyPreferences = {
  inbox: {
    MAIL_SHOW_BUTTON_SYNC: boolean
    MAIL_SHOW_BUTTON_CLEAN: boolean
    MAIL_SHOW_BUTTON_SEARCH: boolean
  }
  create: {
    CONFIRM_BEFORE_SENDING: boolean
    CONFIRM_BEFORE_REMOVING: boolean
    CONFIRM_BEFORE_FILING: boolean
  }
  detail: {
    MAIL_SHOW_BUTTON_UN_READ: boolean
    MAIL_SHOW_BUTTON_REMOVE: boolean
    MAIL_SHOW_BUTTON_ARCHIVE: boolean
    CONFIRM_BEFORE_REMOVING: boolean
  }
  general: {
    DB: { DI: string; DS: string }
  }
}
