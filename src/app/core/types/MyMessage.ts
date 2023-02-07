export type MyMessage = {
  uid: string
  database: string
  name: string
  subject: string
  message: string
  from: string
  to: string
  is_read: boolean
  is_starred: boolean
  created_at: Date | string
}
