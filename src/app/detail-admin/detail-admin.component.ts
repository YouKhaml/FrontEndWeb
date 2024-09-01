import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../services/admin.service";
import { Admin } from "../Modele/admins.model";
import {UtilisateurService} from "../services/utilisateur.service";

@Component({
  selector: 'app-detail-admin',
  templateUrl: './detail-admin.component.html',
  styleUrls: ['./detail-admin.component.css']
})
export class DetailAdminComponent implements OnInit {
  AdminDetailFormGroup!: FormGroup;
  id!: string;
  admin!: Admin;
  idEntreprise!: string;

  constructor(
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private adminService: AdminService,
    private utilisateurService:UtilisateurService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];

    this.AdminDetailFormGroup = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departement: ['', Validators.required],
      quotaAdmin: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      etat: [''],
      idEntreprise: ['']
    });

    this.adminService.getAdmin(this.id).subscribe({
      next: (admin: Admin) => {
        this.admin = admin;
        this.idEntreprise = admin.idEntreprise; // Assurez-vous que cette valeur est définie
        this.AdminDetailFormGroup.patchValue(admin);
        console.log('Admin details:', admin); // Log pour vérifier les détails de l'admin
      },
      error: err => {
        console.log('Erreur lors de la récupération de l\'admin :', err);
      }
    });

  }

  navigateToListEntreprise() {
    if (this.idEntreprise) {
      console.log('Navigating to entreprise list with id:', this.idEntreprise); // Debugging statement
      this.router.navigate(['/superAdmin/listeAdmin', this.idEntreprise]);
    } else {
      console.log('idEntreprise is null or undefined'); // Ajout de logs pour aider au débogage
    }
  }
  listUtilisateur(){
      this.utilisateurService.listeUtilisateur(this.id);
      this.router.navigateByUrl("/superAdmin/listeUtilisateur");

  }
}
