import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  title = 'my-store-version2';
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  imgShow = true;
  token = '';
  imgUpload = '';
  userEmail = '';

  constructor(
    private usersService : UsersService,
    private authService: AuthService
  ) {}

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

  onLoginAndProfile(){
    this.authService.onLoginAndProfile('luis122448@gmail.com','1073')
    .subscribe(data =>{
      this.userEmail = data.email;
    })
  }

}
