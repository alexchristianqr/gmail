export type Message = {
  id?: string
  uid?: string
  conversation_id?: string
  database: string
  name: string
  subject: string
  message: string
  from: string
  to: string
  is_read: boolean | undefined
  is_starred: boolean | undefined
  created_at: Date | string
  updated_at?: Date | string
}
