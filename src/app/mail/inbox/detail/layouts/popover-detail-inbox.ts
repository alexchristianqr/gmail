import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MyPopover } from '../../../../core/types/MyPopover'

@Component({
  selector: 'app-popover-detail-inbox',
  templateUrl: 'popover-detail-inbox.html',
})
export class PopoverDetailInbox {
  items: Array<MyPopover>

  constructor(private router: Router) {
    console.log('[PopoverDetailInbox.constructor]')

    this.items = [{ title: 'Configuración', path: 'mail/inbox-detail-settings' }]
  }

  async open(payload: MyPopover) {
    console.log('[PopoverDetailInbox.open]')

    await this.router.navigate([payload.path])
  }
}
