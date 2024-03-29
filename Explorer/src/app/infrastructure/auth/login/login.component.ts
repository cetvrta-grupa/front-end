import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isVerified: Observable<boolean>
  user:User|undefined;
  sentEmail: boolean = false
  enterUsername: boolean = false
  forgottenPassword: boolean = false

  forgotPassword(): void {
    //event.preventDefault();
    
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    isVerified: new FormControl()
  });

  login(): void {
    const login: Login = {
      username: this.loginForm.value.username || "",
      password: this.loginForm.value.password || "",
    };

    if (this.loginForm.valid) {
          this.authService.login(login).subscribe({
            next: () => {

              this.authService.user$.subscribe(user => {
                this.user = user;
                console.log("Ulogovani turista je")
                console.log(this.user)
                if(this.user.role==="tourist")
                {
                  this.router.navigate(['current-location']);
                }else{
                  this.router.navigate(['/']);
                }
              })

             
            },
            error: (error)=>{
            console.error('Login failed:', error); // Log the error for debugging
            alert('Incorrect username or password or user is not verified!');
            this.forgottenPassword = true;
          }
          });
        } else {
          // Korisnik nije verifikovan, obradite ovaj slučaj
        }
  }

  sendEmail(event: Event): void {
    event.preventDefault();
    const eneteredUsername = this.loginForm.value.username || ""
    
    if(eneteredUsername === ""){
      this.enterUsername = true;
      this.sentEmail = false;
      alert("Please, enter your username and then click the forgot password link.")
    }
    else {
      this.authService.sendPasswordResetEmail(eneteredUsername).subscribe({
        next: (result: boolean) => {
            this.sentEmail = true;
            this.enterUsername = false;
            alert("We have sent you an email containing a link, through which you can reset your password. This link expires in next two hours.")
        },
        error: () => {
            // Handle errors
        }
    });
    }
  }

}
