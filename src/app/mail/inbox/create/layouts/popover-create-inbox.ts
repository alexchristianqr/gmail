import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { MyPopover } from '../../../../core/types/MyPopover'

@Component({
  selector: 'app-popover-create-inbox',
  templateUrl: 'popover-create-inbox.html',
})
export class PopoverCreateInbox {
  items: Array<MyPopover> = [{ title: 'Configuración', path: 'mail/create-settings' }]

  constructor(private router: Router) {
    console.log('[PopoverCreateInbox.constructor]')
  }

  async open(payload: MyPopover) {
    console.log('[PopoverCreateInbox.open]')

    await this.router.navigate([payload.path])
  }
}
