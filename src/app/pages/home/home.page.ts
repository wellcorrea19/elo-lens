import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public user: any = {};

  constructor(
    private router: Router,
    private util: UtilService
  ) {}

  ngOnInit(){
    this.util.GetStorage('user').then(res => {
      if (res) {
        this.user = res;
      }
    });
  }

  goSendDocs(cnpjtransportadora, user){
    this.router.navigate(['send-docs', {cnpjtransportadora, user}]);
  }

  goSendComp(cnpjtransportadora, user){
    this.router.navigate(['send-comprov', {cnpjtransportadora, user}]);
  }

}
