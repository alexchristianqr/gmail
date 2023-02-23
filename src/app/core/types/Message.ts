import { Participant } from './Participant'

export type Message = {
  id: string
  conversation_id?: string
  participant_id?: string
  participant?: Participant | null
  fullName: string
  subject: string
  message: string
  from: {
    email: string
    participant_id: string
    participant?: Participant
  }
  to: {
    email: string
    participant_id: string
    participant?: Participant
  }
  is_read: boolean
  is_starred: boolean
  created_at: Date | string
  updated_at?: Date | string
}
