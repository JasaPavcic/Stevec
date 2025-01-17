import { Component,OnInit } from '@angular/core';
import { Router, RouterOutlet,ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

  username: string | null  = ''; 
  user: User | null = null;

  constructor(private router: Router,private route: ActivatedRoute, private userService: UserService) {}


  ngOnInit(): void {
    this.username = this.userService.getUsername();
    

    if (this.username) {
      const existingUser = this.userService.getUser(this.username);
      if (existingUser) {
        this.user = existingUser;
        console.log('Našel sem starega uporabnika:', this.user);
      } else {
        this.user = this.userService.createUser(this.username);
        this.userService.saveUser(this.user);
        console.log('Ustvaril sem novega uporabnika in ga shranil', this.user);
      }
    } else {
      console.error('No username found!');
      this.router.navigate(['/login']);
    }
  }

  showPage(page: string){
    this.router.navigate([page],{ relativeTo: this.route });
  }
  
  onLogout(){
    this.router.navigate(['/login']);
  }
}
