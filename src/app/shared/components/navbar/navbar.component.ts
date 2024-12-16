import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { Role } from '../../../features/models/user.roles';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {

  protected isAuthenticated:string | null = this.authService.getToken()

  public currentUser = this.authService.currentUser();
  public currentRole = Role;
 
  constructor(private readonly authService:AuthService,private readonly router:Router){}


 

 

  onLogout(): void {
    this.authService.logout(); 
    this.router.navigate(['/auth/login']);
  }



}
