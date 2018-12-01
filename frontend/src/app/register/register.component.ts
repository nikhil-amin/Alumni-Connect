import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
    dob: new FormControl(null, Validators.required),
    branch: new FormControl(null, Validators.required),
    usn: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    classof: new FormControl(null, Validators.required),
  })
  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit() {
  }

  moveToLogin() {
    this._router.navigate(['/login']);
  }

  wrong: String;
  
  register() {
    if (!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)) {
      this.wrong = "*Please enter valid details above";
      console.log('Invalid Form'); return;
    }

    this._userService.register(JSON.stringify(this.registerForm.value))
      .subscribe(
        data => { console.log(data); this._router.navigate(['/login']); },
        error => console.error(error)
      )
    // console.log(JSON.stringify(this.registerForm.value));
  }
}
