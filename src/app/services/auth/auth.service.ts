import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private util: UtilService
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn(){
    this.util.GetStorage('token').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  isAuthenticated(){
    return this.authState.value;
  }

}