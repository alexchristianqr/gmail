import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MyPopover } from '../../../../core/types/MyPopover'

@Component({
  selector: 'app-popover-create-inbox',
  templateUrl: 'popover-create-inbox.html',
})
export class PopoverCreateInbox {
  items: Array<MyPopover>

  constructor(private router: Router) {
    console.log('[PopoverCreateInbox.constructor]')

    this.items = [{ title: 'Settings', path: 'mail/create-settings' }]
  }

  async open(payload: MyPopover) {
    console.log('[PopoverCreateInbox.open]')

    await this.router.navigate([payload.path])
  }
}
