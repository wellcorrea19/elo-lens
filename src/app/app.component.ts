import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from './services/api/api.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UtilService } from './services/util/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public user: any = {};

  constructor(
    private api: ApiService,
    private storage: Storage,
    private router: Router,
    private auth: AuthService,
    private util: UtilService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.util.GetStorage('user').then(res => {
      if (res) {
        this.user = res;
      }
    });
  }

  // Função abrir e fechar modal
  abrirModal(){
    document.getElementById('fundo-sairConta').style.display = 'block';
    }
  fecharModal(){
    document.getElementById('fundo-sairConta').style.display = 'none';
  }

  // Logout
  logout() {
    const params = {
      method: 'users/logout',
      function: 'logout',
      type: 'get',
    };

    this.api.AccessApi(params).then((res) => {
      res.subscribe(data => {
        this.storage.remove('token').then(() => {
          this.storage.remove('user');
          this.router.navigateByUrl('/');
          document.getElementById('fundo-sairConta').style.display = 'none';
          this.auth.authState.next(false);
        });
      });
    });
  }
}
