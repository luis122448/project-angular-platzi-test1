import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { FileService } from './services/file.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-store-version2';
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  imgShow = true;
  token = '';
  imgUpload = '';
  userEmail = '';

  constructor(
    private usersService : UsersService,
    private authService: AuthService,
    private fileService: FileService,
    private tokenService: TokenService
  ) {}

  // Si hay un Token se vuelve hacer una peticion al momento de recargar la Pagina
  // Se hace el subcribe para que el Usuario se vuelva a Asignar de forma global
  ngOnInit(): void {
      const token = this.tokenService.getAll();
      if (token) {
        this.authService.getProfile()
        .subscribe()
      }
  }

  onImgLoadPadre(img: string){
    console.log('Load - Padre');
    console.log('Load Img : ' + img);
  }

  ngImgToogle(){
    this.imgShow = !this.imgShow;
  }

  onCreateUser() {
    this.usersService.postSave(
      {
        email: 'luis122448@gmail.com',
        password: '1073',
        name: 'Luis'
      }
    )
    .subscribe(data =>{
      console.log(data);
    })
  }

  // onLogin() {
  //   this.authService.postLogin('luis122448@gmail.com','1073')
  //   .subscribe(data =>{
  //     console.log(data.access_token);
  //     this.token = data.access_token;
  //     this.onProfile();
  //   })
  // }

  // onProfile(){
  //   this.authService.getProfile(this.token)
  //   .subscribe(data =>{
  //     console.log(data);
  //     this.userEmail = data.email;
  //   })
  // }

  onLoginAndProfile(){
    this.authService.onLoginAndProfile('luis122448@gmail.com','1073')
    .subscribe(data =>{
      this.userEmail = data.email;
    })
  }

  onDownloadPDF(){
    this.fileService.getFile('myPDF','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf')
    .subscribe(data =>{
      console.log('Wii')
    })
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0) as Blob;
    if (file) {
      this.fileService.postUpload(file)
      .subscribe(data => {
      this.imgUpload = data.location;
    })
    }}

}
