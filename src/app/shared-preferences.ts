export let SHARED_PREFERENCES = {
  SETTINGS: {
    // Inbox page
    MAIL_SHOW_BUTTON_SYNC: true,
    MAIL_SHOW_BUTTON_CLEAN: false,
    MAIL_SHOW_BUTTON_SEARCH: true,
    // Create page
    CONFIRM_BEFORE_SENDING: false,
    CONFIRM_BEFORE_FILING: true,
    // DetailInbox page
    MAIL_SHOW_BUTTON_UN_READ: true,
    MAIL_SHOW_BUTTON_REMOVE: false,
    MAIL_SHOW_BUTTON_ARCHIVE: false,
    // General page
    CONFIRM_BEFORE_REMOVING: true,
    INITIALIZE_DATABASE: true,
    DB: { DI: 'DATABASE_INBOX', DS: 'DATABASE_SENT' },
  },
}
