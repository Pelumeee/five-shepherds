import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
})
export class Auth {

  email = '';
  password = '';
  loading = false;
  error = '';


  handleSignIn(){
    
  }
}
