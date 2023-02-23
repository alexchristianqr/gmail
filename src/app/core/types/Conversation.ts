import { Message } from './Message'
import { Participant } from './Participant'

export type Conversation = {
  id: string
  name: string
  message?: string
  participant_id?: string
  participant?: Participant | undefined | null | void
  messages: Array<Message>
  subject: string
  is_read: boolean | undefined
  is_starred: boolean | undefined
  created_at: Date | string
  updated_at?: Date | string
}
