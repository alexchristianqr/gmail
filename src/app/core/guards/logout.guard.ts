import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): UrlTree {
    console.log('[LogoutGuard.canActivate]')
    return this.router.createUrlTree(['signin'])
  }
}
