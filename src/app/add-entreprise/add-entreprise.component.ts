import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntrepriseService} from "../services/entreprise.service";

@Component({
  selector: 'app-add-entreprise',
  templateUrl: './add-entreprise.component.html',
  styleUrl: './add-entreprise.component.css'
})
export class AddEntrepriseComponent implements OnInit{
  EntrepriseFormGroup! : FormGroup;
  constructor(private fb:FormBuilder,private entrepriseService:EntrepriseService,private route:Router) {
  }
  ngOnInit(): void {
    this.EntrepriseFormGroup=this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone:['',Validators.required],
      adresse:[''],
      rs:[''],
      rc:[''],
      icf:[''],
     // quota:[''],

    });
  }
  saveEntreprise() {
    if (this.EntrepriseFormGroup.valid) {
      const entrepriseData = this.EntrepriseFormGroup.getRawValue(); // Utilisez getRawValue() pour inclure les champs désactivés
      this.entrepriseService.AddEntreprise(entrepriseData).subscribe({
        next: value => {
          alert('Entreprise saved successfully!!!');
          this.route.navigate(['/superAdmin/listeEntreprise']);
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
