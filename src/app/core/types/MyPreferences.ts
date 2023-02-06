export type MyPreferences = {
  SETTINGS: {
    // Inbox page
    MAIL_SHOW_BUTTON_SYNC: boolean
    MAIL_SHOW_BUTTON_CLEAN: boolean
    MAIL_SHOW_BUTTON_SEARCH: boolean
    // Create page
    CONFIRM_BEFORE_SENDING: boolean
    CONFIRM_BEFORE_FILING: boolean
    // DetailInbox page
    MAIL_SHOW_BUTTON_UN_READ: boolean
    MAIL_SHOW_BUTTON_REMOVE: boolean
    MAIL_SHOW_BUTTON_ARCHIVE: boolean
    // General page
    CONFIRM_BEFORE_REMOVING: boolean
    INITIALIZE_DATABASE: boolean
    DB: { DI: string; DS: string }
  }
}
