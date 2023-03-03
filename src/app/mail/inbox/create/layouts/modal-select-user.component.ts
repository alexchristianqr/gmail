import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Participant } from '../../../../core/types/Participant'

@Component({
  selector: 'app-modal-select-user',
  templateUrl: 'modal-select-user.component.html',
})
export class ModalSelectUserComponent implements OnInit {
  @Input() items: Participant[] = [] // Prop entrada
  @Input() selectedItem?: Participant // Prop entrada
  @Input() modalParams?: any // Prop entrada
  selectedParticipant?: Participant
  @Output() selectionCancel = new EventEmitter<void>() // Prop salida
  @Output() selectionChange = new EventEmitter<any>() // Prop salida
  filteredItems: Participant[] = []
  buttonCheck: boolean = false

  ngOnInit() {
    this.filteredItems = [...this.items]
    this.selectedParticipant = this.selectedItem
  }

  trackItems(item: any) {
    console.log('[ModalSelectUserComponent.trackItems]', { item })
    this.buttonCheck = true
    this.selectedParticipant = item
  }

  back() {
    console.log('[ModalSelectUserComponent.back]')
    this.selectionCancel.emit()
  }

  async ok() {
    console.log('[ModalSelectUserComponent.ok]', this.selectedParticipant)
    const participant = {
      [this.modalParams.field]: {
        email: this.selectedParticipant?.email,
        participant_id: this.selectedParticipant?.id,
      },
    }
    await this.selectionChange.emit(participant)
  }

  searchbarInput(ev: any) {
    return this.filterList(ev.target.value)
  }

  async filterList(searchQuery: string | undefined) {
    if (searchQuery === undefined) {
      this.filteredItems = [...this.items]
    } else {
      const normalizedQuery = searchQuery.toLowerCase()
      this.filteredItems = this.items.filter((item) => {
        return item.fullName.includes(normalizedQuery)
      })
    }
  }
}
