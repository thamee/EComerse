import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthResponce } from 'src/app/models/auth-responce';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router,private toastr: ToastrService) { }

  form={
    name:"",
    address:"",
    email : "",
    password:""
  }
  error = {
    email: '',
    password: '',
    name:"",
    address:"",
  };  
  errors!:[];


  ngOnInit(): void {
  }

  Register(){
    if (this.validate()) {
    this.authService.register(this.form.email,this.form.password,this.form.name,this.form.address).subscribe((authResponse: AuthResponce) => {
      this.toastr.success('!', 'User Registered Successfully!');
      localStorage.setItem('token', JSON.stringify(authResponse.token));
      this.router.navigateByUrl(`/`);
      
    },error=>{
      this.toastr.error('!', 'User Registation Failed !');
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
