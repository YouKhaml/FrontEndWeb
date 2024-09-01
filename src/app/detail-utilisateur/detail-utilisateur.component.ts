import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UtilisateurService} from "../services/utilisateur.service";
import {Utilisateur} from "../Modele/utilisateur.model";

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrl: './detail-utilisateur.component.css'
})
export class DetailUtilisateurComponent implements OnInit{
  UserDetailFormGroup!:FormGroup;

  id!:string;
  user:any;
  constructor(
    private fb:FormBuilder,
    private activedRoute:ActivatedRoute,
    private utilisateurService:UtilisateurService


  ) {}
  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];
    this.user= this.utilisateurService.getUser(this.id);
    this.UserDetailFormGroup = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departement: ['', Validators.required],
      quotaUser: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      id: [this.id],
      idAdmin:['']
    });
    this.utilisateurService.getUser(this.id).subscribe({
      next: (user:  Utilisateur) => {
        this.UserDetailFormGroup.patchValue(user);
      },
      error: err => {
        console.log('Erreur lors de la récupération de l\'utilisateur :', err);
      }
    });
  }



}
