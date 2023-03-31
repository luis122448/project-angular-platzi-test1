import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  counter = 0;
  categories : Category[] = [];
  @Input() email = '';
  token = '';
  profile : User | null = null;

  constructor(
    private storeService: StoreService,
    private categoryService: CategoriesService,
    private authService: AuthService,
    private router: Router
  ) { }
  showMenu = false;

  ngOnInit(): void{
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
    this.onLoadMoreCategory();
    this.authService.myUser$
    .subscribe(data => {
      this.profile = data;
    })
  }

  onToggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onLoadMoreCategory(){
    this.categoryService.getAll()
    .subscribe(data => {
      this.categories = data;
    })
  }

  onLoginAndProfile(){
    this.authService.onLoginAndProfile('luis122448@gmail.com','1073')
    .subscribe(() =>{
      // this.profile = data;
      this.router.navigate(['/profile']);
    })
  }

  onLogout(){
    this.authService.onLogout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
