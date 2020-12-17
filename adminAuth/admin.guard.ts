import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {

	constructor(
		private router: Router
	) { }
	canActivate() {
		console.log(localStorage)
		if (localStorage.getItem('isLoggedin')) {
			return true;
		}
		// return true;
		this.router.navigate(['/login']);
		return false;
	}

}
