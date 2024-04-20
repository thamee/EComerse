import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthResponce } from 'src/app/models/auth-responce';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router,private toastr: ToastrService) { }
  form={
    email : "",
    password:""
  }
  errors!:[];
  error = {
    name: '',
    password: ''
  };  
  
  ngOnInit(): void {
  }

  Login(){
    if (this.validate()) {
   
    this.authService.login(this.form.email,this.form.password).subscribe((authResponse: AuthResponce) => {
      localStorage.setItem('token', JSON.stringify(authResponse.token));
      this.toastr.success('!', 'Login Successfully!');
      this.router.navigateByUrl(`/`);
      
    },error=>{
      this.toastr.error('', 'Login Failed!');
      if(error && error.error&& error.error.errors)      {
        this.errors=error.error.errors
      }
    })
  }

  }
  validate(): boolean {
    this.error.name = '';this.error.password = '';
    if (!this.form.email || this.form.email.length <=0) {
      this.error.name = "Usename is required";
      return false;
    }
     else if (!this.form.password || this.form.password.length <=0) {
        this.error.password = "Password is required";
      return false;
    } else { this.error.name = '';this.error.password = '' }
  
   
    return true;
  }

}
