import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required])
  });
  constructor(private router: Router) {}

  onLogin(){
    if(this.loginForm.valid){
      const username = this.loginForm.value.username;
      
      if (username) {
        let usernames: string[] = JSON.parse(localStorage.getItem('usernames') || '[]' );

        if (!usernames.includes(username)) {
          usernames.push(username);
        }
        localStorage.setItem('username', JSON.stringify(usernames));

        localStorage.setItem('currentUser', username);

        this.router.navigate(['/home']);
      }
    } else{
      alert('Enter your username');
    }
      
  }
}
