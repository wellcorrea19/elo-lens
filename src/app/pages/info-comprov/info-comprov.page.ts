import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilService } from 'src/app/services/util/util.service';
import { isArray } from 'util';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-info-comprov',
  templateUrl: './info-comprov.page.html',
  styleUrls: ['./info-comprov.page.scss'],
})
export class InfoComprovPage implements OnInit {

  public ocrComprovanteImagemList: Array<any> = [];
  public id: any;
  public tipo: string;
  public user: any;
  public selectedImage: any;

  constructor(
    private loading: LoadingController,
    private util: UtilService,
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
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
        if (name === 'ocrComprovanteImagemList') {
            this.ocrComprovanteImagemList = values;
        }
    }
  }

  // Função pegando dados   
  async GetInfo() {
    const params = {
      data: {
        id_ocr_comprovante: this.id,
      },
      method: 'ocr/listComprovanteImagem',
      function: 'listComprovanteImagem',
      type: 'post'
    };

    this.api.AccessApi(params).then((response) => {

    response.subscribe(data => {
    switch (data.error) {
      case (false):
        this.FillArray( 'ocrComprovanteImagemList', data.ocrComprovanteImagemList);
        this.selectedImage = "data:image/jpeg;base64," + data.ocrComprovanteImagemList[0].imagem;
        break;
      case (true):
        this.util.PresentToast('Atenção, nenhuma imagem encontrada!', 'middle');
        break;
        }
      });
    });
  }

  // Função download da imagem
  downloadImage(){
    var a = document.createElement("a"); //Create <a>
    a.href = this.selectedImage //Image Base64 Goes here
    a.download = "Doc.png"; //File name Here
    a.click(); //Downloaded file
  }

  // FUNÇÃO FOTO
  public async takePicture() {
    // Tirar Foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 80,
    });

    const loading = await this.loading.create({
      cssClass: 'loading-class',
      message: 'Aguarde por favor',
      animated: true,
      duration: 30000,
    });

    const params = {
      data: {
        imagem: capturedPhoto.base64String,
        id_ocr_comprovante: this.id,
      },
      method: 'ocr/insertComprovanteImagem',
      function: 'insertComprovanteImagem',
      type: 'post',
    };

    if (capturedPhoto) {
      loading.present();
      this.api.AccessApi(params).then((response) => {
        response.subscribe(async data => {
          switch (data.error) {
            case (false):
              loading.dismiss();
              window.location.reload();
              break;
            case (true):
              loading.dismiss();
              this.util.PresentToast('Ocorreu algum erro!', 'middle');
              break;
          }
        });
      });
    }
  }

  // Função para voltar p/ tela anterior
  NavigateBack() {
    this.location.back();
  }

}
