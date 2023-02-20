import { Injectable } from '@angular/core'
import { AlertController, PopoverController, ToastController } from '@ionic/angular'
import * as dayjs from 'dayjs'

type MyToast = {
  message?: string
  duration?: number
  position?: string
  buttons?: Array<{
    text?: string
    role?: string
    handler: Function
  }>
}

type MyAlert = {
  header?: string
  subHeader?: string
  message?: string
  buttons: Array<{
    text?: string
    role?: string
    handler?: Function
  }>
}

type MyPopover = {
  component: Object
  event: Event
  dismissOnSelect?: boolean
}

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private toastController: ToastController, private alertController: AlertController, private popoverCtrl: PopoverController) {}

  formatDate(date?: Date | string | number, format: string = 'Y-MM-DD HH:mm:ss') {
    return dayjs(date).format(format)
  }
  async presentToast(payload: MyToast) {
    console.log('[UtilsService.presentToast]')

    const usePayload: any = {}

    usePayload.message = payload.message
    usePayload.duration = payload.duration || 2500
    usePayload.position = payload.position || 'bottom'
    if (payload.buttons) {
      usePayload.buttons = [
        {
          text: payload.buttons[0].text || 'OK',
          role: payload.buttons[0].role || 'cancel',
          handler: payload.buttons[0].handler,
        },
      ]
    }

    const toast = await this.toastController.create(usePayload)
    await toast.present()
  }

  async presentAlert(payload: MyAlert) {
    console.log('[UtilsService.presentAlert]')

    const usePayload: any = {}

    usePayload.header = payload.header || 'Alerta'
    if (payload.subHeader) usePayload.subHeader = payload.subHeader
    usePayload.message = payload.message || 'Descripción'
    usePayload.buttons = []
    if (payload.buttons[0]) {
      usePayload.buttons.push({
        text: payload.buttons[0]?.text || 'OK',
        role: payload.buttons[0]?.role || 'ok',
        handler: payload.buttons[0].handler,
      })
    }
    if (payload.buttons[1]) {
      usePayload.buttons.push({
        text: payload.buttons[1]?.text || 'CANCEL',
        role: payload.buttons[1]?.role || 'cancel',
        handler: payload.buttons[1].handler,
      })
    }

    const alert = await this.alertController.create(usePayload)
    await alert.present()
  }

  async presentPopover(payload: MyPopover) {
    console.log('[UtilsService.presentPopover]')

    const usePayload: any = {}

    usePayload.component = payload.component
    usePayload.event = payload.event
    usePayload.dismissOnSelect = payload.dismissOnSelect || true

    const popover = await this.popoverCtrl.create(usePayload)
    await popover.present()
  }
}
