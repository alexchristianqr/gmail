import { Participant } from './Participant'

export type Message = {
  id?: string
  conversation_id?: string
  participant_id?: string
  participant?: Participant
  database: string
  name: string
  subject: string
  message: string
  from: string
  fromEmail: {
    email: string
    participant_id: string
    participant?: Participant
  }
  to: string
  toEmail: {
    email: string
    participant_id: string
    participant?: Participant
  }
  is_read: boolean | undefined
  is_starred: boolean | undefined
  created_at: Date | string
  updated_at?: Date | string
}
