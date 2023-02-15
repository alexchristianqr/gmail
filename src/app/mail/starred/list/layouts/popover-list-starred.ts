import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MyPopover } from '../../../../core/types/MyPopover'
import { EventService } from '../../../../core/services/events/event.service'
import { UtilsService } from '../../../../core/services/utils/utils.service'
import { ApiService } from '../../../../core/services/api/api.service'

@Component({
  selector: 'app-popover-list-sent',
  templateUrl: 'popover-list-starred.html',
})
export class PopoverListStarred {
  items: Array<MyPopover> = [{ title: 'Configuración', path: 'mail/starred-settings' }]

  constructor(private utilsService: UtilsService, private eventService: EventService, private apiService: ApiService, private router: Router) {
    console.log('[PopoverListStarred.constructor]')
  }

  async open(payload: MyPopover) {
    console.log('[PopoverListStarred.open]')

    await this.router.navigate([payload.path])
  }
}
