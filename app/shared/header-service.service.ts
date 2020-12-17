import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeaderServiceService {

  constructor() { }
  private subject = new Subject<any>();
    getProductFromCart(message) {
        console.log('---mess',message)
        this.subject.next(message);
    }
    getCartData(): Observable<any> {
        return this.subject.asObservable();
    }
}
