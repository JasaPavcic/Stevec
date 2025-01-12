import { Component } from '@angular/core';
import { Router, RouterOutlet,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  username: string | null = '';

  constructor(private router: Router,private route: ActivatedRoute) {
    this.username = localStorage.getItem('username');
  }


  showPage(page: string){
    this.router.navigate([page],{ relativeTo: this.route });
  }
  
  onLogout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
