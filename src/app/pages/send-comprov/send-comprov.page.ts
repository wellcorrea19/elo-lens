import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilService } from 'src/app/services/util/util.service';
import { isArray } from 'util';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { empty } from 'rxjs';

@Component({
  selector: 'app-send-comprov',
  templateUrl: './send-comprov.page.html',
  styleUrls: ['./send-comprov.page.scss'],
})
export class SendComprovPage implements OnInit {

  public ocrComprovanteList: Array<any> = [];
  public cnpjtransportadora: any;
  public user: any;
  public tipocomp: string;
  public compSearch: Array<any>;
  public searchInput: string;
  public searchTabs = false;
  public id_ocr: any;
  public docComp: string;
  scanSub: any;
  qrText: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private util: UtilService,
    private loading: LoadingController,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private barcodeScanner: BarcodeScanner ,
  ) {}

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
        if (name === 'ocrComprovanteList') {
            this.ocrComprovanteList = values;
        }
    }
  }

  // Função pegando dados   
  async GetInfo() {
    const params = {
      method: 'ocr/comprovante',
      function: 'listOcrComprovante',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {

    response.subscribe(data => {
    switch (data.error) {
      case (false):
        this.FillArray( 'ocrComprovanteList', data.ocrComprovanteList);
        console.log(data);
        break;
        case (true):
          this.util.PresentToast('Atenção, nenhum registro encontrado!', 'middle');
          break;
        }
      });
    });
  }

  // Função adicionar novo documento
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
        id_user: this.user,
        tipodocumento: this.tipocomp
      },
      method: 'ocr/insertComprovante',
      function: 'insertComprovante',
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

  // Função inserir documentos
  async docManual(){
    const loading = await this.loading.create({
      cssClass: 'loading-class',
      message: 'Aguarde por favor',
      animated: true,
      duration: 20000,
    });
    await loading.present();

    const params = {
      data: {
        documento: this.docComp,
        id_ocr_comprovante: this.id_ocr,
      },
      method: 'ocr/updateComprovante',
      function: 'updateComprovante',
      type: 'post'
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

  async scanningBarcode(id) {
    const loading = await this.loading.create({
      cssClass: 'loading-class',
      message: 'Aguarde por favor',
      animated: true,
      duration: 20000,
    });
    this.barcodeScanner.scan()
      .then(textFound => {
        this.qrText = textFound;
        console.log(this.qrText.text);
        loading.present();

        const params = {
          data: {
            documento: this.qrText.text,
            id_ocr_comprovante: id,
          },
          method: 'ocr/updateComprovante',
          function: 'updateComprovante',
          type: 'post'
        };

        this.api.AccessApi(params).then((res) => {
          res.subscribe(dados => {
            switch (dados.error) {
              case (false):
                loading.dismiss();
                window.location.reload();
                console.log(dados);
                break;
            }
          });
        });
      })
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
            function: 'listOcrComprovanteByDocumento',
            method: 'ocr/listOcrComprovanteByDocumento',
        };

        this.api.AccessApi(params).then((response) => {
          response.subscribe(data => {
          if (data.comprovante !== empty) {
            this.compSearch = data.comprovante;
          }
        });
      });
    }, 1000);
  }

  // Função abrir modal de finalizar
  modalInsert() {
    document.getElementById('fundo-insertComp').style.display = 'block';
  }

  fecharModalInsert(){
    document.getElementById('fundo-insertComp').style.display = 'none';
  }

  modalInsertDoc(id) {
    this.id_ocr = id
    document.getElementById('fundo-insertDoc').style.display = 'block';
  }

  fecharModalInsertDoc(){
    document.getElementById('fundo-insertDoc').style.display = 'none';
  }

  // Função navegar entre tela
  goInfoComp(id, user){
    user = this.user;
    this.router.navigate(['info-comprov', {id, user}]);
  }

  // Função para voltar p/ tela anterior
  NavigateBack() {
    this.location.back();
  }

}
