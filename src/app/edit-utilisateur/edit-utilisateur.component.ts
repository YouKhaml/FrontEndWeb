import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {UtilisateurService} from "../services/utilisateur.service";
import {Utilisateur} from "../Modele/utilisateur.model";

@Component({
  selector: 'app-edit-utilisateur',
  templateUrl: './edit-utilisateur.component.html',
  styleUrl: './edit-utilisateur.component.css'
})
export class EditUtilisateurComponent implements OnInit{
  UserEditFormGroup!:FormGroup;
  id!:string;
  user:any;
  constructor(
    private fb:FormBuilder,
    private activedRoute:ActivatedRoute,
    private utilisateurService:UtilisateurService,
    private route:Router


  ) {}
  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];
    this.user= this.utilisateurService.getUser(this.id);
    this.UserEditFormGroup = this.fb.group({
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
        this.UserEditFormGroup.patchValue(user);
      },
      error: err => {
        console.log('Erreur lors de la récupération de l\'utilisateur :', err);
      }
    });
  }

  saveUser() {
    if (this.UserEditFormGroup.valid) {
      const utilisateurData = this.UserEditFormGroup.getRawValue(); // Utilisez getRawValue() pour inclure les champs désactivés
      this.utilisateurService.editUser(this.id,utilisateurData).subscribe({
        next: value => {
          alert('User edited successfully!!!');
          this.route.navigate(['/superAdmin/listeUtilisateur']);
        },
        error: err => {
          console.log('Error:', err); // Log l'erreur du serveur
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

}
