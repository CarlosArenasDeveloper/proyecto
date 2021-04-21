import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  login() {
    const { email, password } = this.miFormulario.value;

    this.authService.login(email, password).subscribe((resp) => {
      console.log(resp);
      if (resp!="error") {
        this.router.navigateByUrl('/dashboard');
      }else{
        //this.router.navigateByUrl('/auth/main/registro')
        this.miFormulario.reset();
      }
    });
    // this.authService.login( email, password )
    //   .subscribe( ok => {

    //     if ( ok === true ) {
    //       this.router.navigateByUrl('/dashboard');
    //     } else {
    //       Swal.fire('Error', ok, 'error');
    //     }
    //   });
  }
}
