import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util/util.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword: boolean;
  loginForm: FormGroup;
  public email: string;
  public cpf: string;
  public senha: string;
  public versao = '1.1';
  public value: any;
  public type: string;

  constructor(
    private router: Router,
    private util: UtilService,
    private auth: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private loading: LoadingController
  ) { }

  ngOnInit() {
    this.InitializeForms();
    this.auth.authState.subscribe(state => {
      if (state === true) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  // Botão mostrar senha
  mostrarSenha(){
    this.showPassword = !this.showPassword;
  }

  // Função login
  InitializeForms() {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([
            Validators.minLength(6),
            Validators.maxLength(40),
        ])],
        cpf: ['', Validators.compose([
          Validators.minLength(11),
          Validators.maxLength(11),
        ])],
        senha: ['', Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(45)
        ])]
    });
  }

  async login() {
    const loading = await this.loading.create({
      cssClass: 'loading-class',
      message: 'Aguarde por favor',
      animated: true,
    });
    await loading.present();

    const params = {
      email: this.loginForm.value.email,
      cpf: this.loginForm.value.cpf,
      senha: this.loginForm.value.senha,
      versao: this.versao,
    };

    if (this.loginForm.valid) {
        this.http.post('https://eloapi.brazilsouth.cloudapp.azure.com/api/auth/login', params)
          .subscribe((data: any) => {
            switch (data.error) {
              case(false):
                this.util.SetStorage('token', data.token);
                this.util.SetStorage('user', data.user);
                this.router.navigate(['home']);
                this.auth.authState.next(true);
                loading.dismiss();
                break;
              case(true):
                loading.dismiss();
                this.util.PresentToast(data.msg, 'top');
                break;
            }
        });
    } else {
        loading.dismiss();
        this.util.PresentToast('Por favor, certifique-se de preencher todos os campos corretamente!', 'top');
    }
  }

  // Evento para navegar entre telas
  Navigate(path) {
    this.router.navigate([path]);
  }

}
