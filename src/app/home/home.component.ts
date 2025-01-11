import { Component } from '@angular/core';
import { Router, RouterOutlet,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router,private route: ActivatedRoute) {}

  onLogout(){
    this.router.navigate(['/login']);
  }

  showPage1(){
    this.router.navigate(['page1'],{ relativeTo: this.route });
  }

  showPage2(){
    this.router.navigate(['page2'],{ relativeTo: this.route });
  }

  showPage3(){
    this.router.navigate(['page3'],{ relativeTo: this.route });
  }
}
