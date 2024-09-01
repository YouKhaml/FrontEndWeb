import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../services/admin.service";
import {EntrepriseService} from "../services/entreprise.service";
import {Admin} from "../Modele/admins.model";
import {Entreprise} from "../Modele/Entreprises.model";

@Component({
  selector: 'app-edit-entreprise',
  templateUrl: './edit-entreprise.component.html',
  styleUrl: './edit-entreprise.component.css'
})
export class EditEntrepriseComponent implements OnInit{
  EntrepriseEditFormGroup!: FormGroup;
  idEntreprise!:string;
  entreprise:any;
constructor(  private fb:FormBuilder,
              private activedRoute:ActivatedRoute,
              private route:Router,
              private entrepriseService:EntrepriseService) {}


  ngOnInit(): void {
    this.idEntreprise = this.activedRoute.snapshot.params['id'];
    this.entreprise=this.entrepriseService.getEntreprise(this.idEntreprise);
    this.EntrepriseEditFormGroup=this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      rc: ['', Validators.required],
      rs: ['', Validators.required],
      icf: ['', Validators.required],
      quota: ['', Validators.required],
      idEntreprise: [''],

    });
    this.entrepriseService.getEntreprise(this.idEntreprise).subscribe({
      next: (entreprise:  Entreprise) => {
        this.EntrepriseEditFormGroup.patchValue(entreprise);
      },
      error: err => {
        console.log('Erreur lors de la récupération de l\'admin :', err);
      }
    });
  }
  saveEntreprise() {
    if (this.EntrepriseEditFormGroup.valid) {
      const EntrepriseData = this.EntrepriseEditFormGroup.getRawValue(); // Utilisez getRawValue() pour inclure les champs désactivés
      this.entrepriseService.editEntreprise(this.idEntreprise,EntrepriseData).subscribe({
        next: value => {
          alert('Entreprise edited successfully!!!');
          if (this.idEntreprise) {
            this.route.navigate(['/superAdmin/listeEntreprise']);
          } else {
            console.error('idEntreprise is undefined');
          }

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
