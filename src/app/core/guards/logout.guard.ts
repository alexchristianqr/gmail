import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { FirebaseService } from '../services/api/firebase.service'

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(private router: Router, private firebaseService: FirebaseService) {}

  async canActivate(): Promise<UrlTree> {
    console.log('[LogoutGuard.canActivate]')

    return this.signOut().then(() => {
      return this.router.createUrlTree(['signin'])
    })
  }

  async signOut() {
    console.log('[LogoutGuard.signOut]')

    return this.firebaseService.signOut()
  }
}
