import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApiService } from '../../core/services/api/api.service'
import { Router } from '@angular/router'
import { MyParams } from '../../core/types/MyParams'
import { Subscription } from 'rxjs'
import { EventService } from '../../core/services/events/event.service'
import { ConversationService } from '../../core/services/api/conversation.service'
import { MessageService } from '../../core/services/api/message.service'

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
  data: MyParams | any
  mySubscribe$: Subscription
  items: Array<any> = []

  constructor(private messageService: MessageService, private eventService: EventService, private apiService: ApiService, private router: Router, private conversationService: ConversationService) {
    console.log('[SearchComponent.constructor]')

    this.mySubscribe$ = this.eventService.dataSource.subscribe(async () => {
      const searchText = await this.apiService.db().then((res) => res.get('TEXT_SEARCH'))
      await this.getItems(searchText)
    })
    this.getState()
  }

  ngOnInit(): void {
    console.log('[SearchComponent.ngOnInit]')

    this.getState()
  }

  ngOnDestroy() {
    console.log('[SearchComponent.ngOnDestroy]')

    this.mySubscribe$.unsubscribe()
  }

  getState(): void {
    console.log('[SearchComponent.getState]')

    this.data = this.router.getCurrentNavigation()?.extras.state
  }

  async back() {
    console.log('[SearchComponent.back]')

    await this.router.navigate([this.data.path])
  }

  async fnViewDetail(item: any) {
    console.log('[SearchComponent.back]', { item })

    const data: MyParams = { item: item, path: 'mail/search' }
    await this.router.navigate(['mail/inbox-detail'], { state: data })
  }

  async searchByEvent(event: any) {
    console.log('[SearchComponent.searchByEvent]')

    const searchText = event.target.value.toString()
    if (!searchText) return
    return this.getItems(searchText)
  }

  async getItems(searchText: string) {
    console.log('[SearchComponent.getItems]')

    if (!searchText) return
    await this.apiService.db().then((res) => res.create('TEXT_SEARCH', searchText))

    // Set items
    this.items = []

    // API
    switch (this.data.database) {
      case 'conversations':
        const conversations = await this.conversationService.conversations()
        if (!conversations) return

        // Iterar conversación
        for (const conversation of conversations) {
          const messages = await this.messageService.messages({ conversation_id: conversation.id })
          messages.sort((a, b) => (new Date(a.created_at) < new Date(b.created_at) ? 1 /* ASC */ : -1 /* DESC */)) // Lista de orden DESC
          conversation.messages = messages
        }

        this.items = conversations.filter((value: any) => value.subject.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || value.message.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
        break
    }
  }
}
