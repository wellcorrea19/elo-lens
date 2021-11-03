import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { empty } from 'rxjs';
import { isArray } from 'util';
import { UtilService } from 'src/app/services/util/util.service';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-send-docs',
  templateUrl: './send-docs.page.html',
  styleUrls: ['./send-docs.page.scss'],
})
export class SendDocsPage implements OnInit {

  public registros: Array<any> = [];
  public docSearch: Array<any>;
  public searchInput: string;
  public searchTabs = false;
  public cnpjtransportadora: any;
  public user: any;
  public descricao: string;
  public doc: string;

  constructor(
    private router: Router,
    private api: ApiService,
    private util: UtilService,
    private loading: LoadingController,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cnpjtransportadora = this.activatedRoute.snapshot.paramMap.get('cnpjtransportadora');
    this.user = this.activatedRoute.snapshot.paramMap.get('user');
    this.presentLoading();
  }

  // Função de loading
  async presentLoading() {
    const loading = await this.loading.create({
      cssClass: 'loading-class',
      message: 'Aguarde por favor',
      animated: true,
      duration: 20000,
    });
    await loading.present();
    await loading.dismiss(this.GetInfo());
  }

  // Filtrar arrays
  FillArray(name, values) {
    if (isArray(values)) {
        if (name === 'registros') {
            this.registros = values;
        }
    }
  }

  // Função pegando dados   
  async GetInfo() {
    const params = {
      method: 'ocr/registro',
      function: 'listOcrRegistro',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {

    response.subscribe(data => {
    switch (data.error) {
      case (false):
        this.FillArray( 'registros', data.registros);
        console.log(data.registros);
        break;
        case (true):
          this.util.PresentToast('Atenção, nenhum registro encontrado!', 'middle');
          break;
        }
      });
    });
  }

  // Função adicionar novo abastecimento
  async newInsert(){
    const loading = await this.loading.create({
      cssClass: 'loading-class',
      message: 'Aguarde por favor',
      animated: true,
      duration: 20000,
    });
    await loading.present();

    const params = {
      data: {
        cnpjtransportadora: this.cnpjtransportadora,
        descricao: this.descricao,
        documento: this.doc
      },
      method: 'ocr/insertOcrRegistro',
      function: 'insertOcrRegistro',
      type: 'post',
    };
    this.api.AccessApi(params).then((response) => {
      response.subscribe(data => {
      switch (data.error) {
        case (false):
          loading.dismiss();
          window.location.reload();
          break;
          case (true):
            loading.dismiss();
            this.util.PresentToast('Ocorreu um erro ao tentar iniciar a ação!', 'middle');
            break;
        }
      });
    });
  }

  // Função search documentos
  ShowSearch() {
    this.searchTabs = false;
    if (this.searchInput.length > 0) {
        this.searchTabs = true;
        this.Search();
    }
  }

  private Search() {
    setTimeout(() => {
        const params = {
            data: {
              documento: this.searchInput
            },
            type: 'post',
            function: 'listOcrRegistroByDocumento',
            method: 'ocr/listOcrRegistroByDocumento',
        };

        this.api.AccessApi(params).then((response) => {
          response.subscribe(data => {
          if (data.registro !== empty) {
            this.docSearch = data.registro;
          }
        });
      });
    }, 1000);
  }

  // Função abrir modal de finalizar
  modalInsert() {
    document.getElementById('fundo-insertRegister').style.display = 'block';
  }

  fecharModalInsert(){
    document.getElementById('fundo-insertRegister').style.display = 'none';
  }

  // Função navegar entre tela
  goInfoDocs(id, user){
    user = this.user;
    this.router.navigate(['info-docs', {id, user}]);
  }

  // Função para voltar p/ tela anterior
  NavigateBack() {
    this.location.back();
  }

}
