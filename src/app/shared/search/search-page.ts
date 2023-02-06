import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApiService } from '../../core/services/api/api.service'
import { Router } from '@angular/router'
import { MyMessage } from '../../core/types/MyMessage'
import { MyParams } from '../../core/types/MyParams'
import { Subscription } from 'rxjs'
import { EventService } from '../../core/services/events/event.service'

@Component({
  selector: 'page-search',
  templateUrl: 'search-page.html',
})
export class SearchPage implements OnInit, OnDestroy {
  data: MyParams | any
  mySubscribe$: Subscription
  items: Array<MyMessage> = []

  constructor(
    private eventService: EventService,
    private apiService: ApiService,
    private router: Router
  ) {
    console.log('[SearchPage.constructor]')

    this.mySubscribe$ = this.eventService.dataSource.subscribe(async () => {
      const searchText = await this.apiService.db().then((res) => res.get('TEXT_SEARCH'))
      await this.getItems(searchText)
    })
    this.getState()
  }

  ngOnInit(): void {
    console.log('[SearchPage.ngOnInit]')

    this.getState()
  }

  ngOnDestroy() {
    console.log('[SearchPage.ngOnDestroy]')

    this.mySubscribe$.unsubscribe()
  }

  getState(): void {
    console.log('[SearchPage.getState]')

    this.data = this.router.getCurrentNavigation()?.extras.state
  }

  async back() {
    console.log('[SearchPage.back]')

    await this.router.navigate([this.data.path])
  }

  async fnViewDetail(item: MyMessage) {
    console.log('[SearchPage.back]')

    const data: MyParams = { item: item, path: 'search' }
    await this.router.navigate(['inbox-detail'], { state: data })
  }

  async searchByEvent(event: any) {
    console.log('[SearchPage.searchByEvent]')

    const searchText = event.target.value.toString()
    if (!searchText) return
    return this.getItems(searchText)
  }

  async getItems(searchText: string) {
    console.log('[SearchPage.getItems]')

    if (!searchText) return
    await this.apiService.db().then((res) => res.create('TEXT_SEARCH', searchText))

    // Set items
    this.items = []

    // API
    return this.apiService
      .getItems(this.data.database)
      .then((data: Array<MyMessage>) => {
        if (!data) return
        this.items = data.filter((value: MyMessage) => {
          return (
            value.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            value.subject.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            value.message.toLowerCase().indexOf(searchText.toLowerCase()) > -1
          )
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
