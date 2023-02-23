import { Message } from './Message'
import { Participant } from './Participant'

export type Conversation = {
  id: string
  name: string
  message: string
  participant_id?: string
  participant?: Participant | null
  messages: Array<Message>
  subject: string
  is_read: boolean
  is_starred: boolean
  created_at: Date | string
  updated_at?: Date | string
}
