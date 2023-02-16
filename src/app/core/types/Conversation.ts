import { Message } from './Message'

export type Conversation = {
  id: string
  name: string
  message?: string
  messages: Message[]
  subject: string
  is_read: boolean | undefined
  is_starred: boolean | undefined
  created_at: Date | string
  updated_at?: Date | string
}
