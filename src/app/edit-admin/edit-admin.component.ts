import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../services/admin.service";
import {Utilisateur} from "../Modele/utilisateur.model";
import {Admin} from "../Modele/admins.model";

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.css'
})
export class EditAdminComponent implements OnInit{
  AdminEditFormGroup!:FormGroup;
  idEntreprise!: string;
  id!:string;
  admin:any;
  constructor(
    private fb:FormBuilder,
    private activedRoute:ActivatedRoute,
    private route:Router,
    private adminService:AdminService
  ) {}

  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];
    this.admin=this.adminService.getAdmin(this.id);
    this.AdminEditFormGroup=this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departement: ['', Validators.required],
      quotaAdmin: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      id: [this.id],
      idEntreprise:['']
    });
    this.adminService.getAdmin(this.id).subscribe({
      next: (admin:  Admin) => {
        this.AdminEditFormGroup.patchValue(admin);
        this.idEntreprise = admin.idEntreprise;
      },
      error: err => {
        console.log('Erreur lors de la récupération de l\'admin :', err);
      }
    });
  }
  saveAdmin() {
    if (this.AdminEditFormGroup.valid) {
      const AdminData = this.AdminEditFormGroup.getRawValue(); // Utilisez getRawValue() pour inclure les champs désactivés
      this.adminService.editAdmin(this.id,AdminData).subscribe({
        next: value => {
          alert('Admin edited successfully!!!');
          if (this.idEntreprise) {
            this.route.navigate(['/superAdmin/listeAdmin', this.idEntreprise]);
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
