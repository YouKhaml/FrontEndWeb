/*
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public loginForm!: FormGroup
  constructor(private fb : FormBuilder,private authService:AuthService,private router:Router) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login : this.fb.control(""),
      password: this.fb.control("")
    });
  }

  loginFct():void {
    let login = this.loginForm.value.login;
    let password =this.loginForm.value.password;
    let auth:boolean = this.authService.loginFct(login,password);
    if(auth == true){
      this.router.navigateByUrl("/superAdmin")
    }
  }
}
*/
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginFct() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.loginFct(username, password).subscribe(
        response => {
          if (this.authService.handleLoginResponse(response)) {
            if(this.authService.getRole()==='Admin'){
              this.router.navigateByUrl("/superAdmin/listeUtilisateur");
            }else{
              this.router.navigateByUrl("/superAdmin/listeEntreprise");
            }

          } else {
            alert('Nom d\'utilisateur ou mot de passe incorrect');
          }
        },
        error => {
          alert('Nom d\'utilisateur ou mot de passe incorrect');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }
}

