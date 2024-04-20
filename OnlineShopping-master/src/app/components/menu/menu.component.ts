import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) {
    
   }
   role!:string;
  ngOnInit(): void {
    this.role=this.authService.getUserRole();
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl(`/login`);


  }
}
