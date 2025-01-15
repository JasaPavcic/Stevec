import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router,private userService: UserService) {
    this.loginForm = new FormGroup({
    username: new FormControl('', [Validators.required])
   });
  }

  onLogin(){
      if(this.loginForm.valid) {
        const username = this.loginForm.get('username')?.value;
        console.log('username:', username);
        this.userService.setUsername(username);
        this.router.navigate(['/home']);

      }  
  }      
}    
