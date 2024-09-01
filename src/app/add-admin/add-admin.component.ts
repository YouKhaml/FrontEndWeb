import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  AdminFormGroup!: FormGroup;
  idEntreprise!: string;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private adminService: AdminService,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.idEntreprise = this.activedRoute.snapshot.params['idEntreprise'];
    this.AdminFormGroup = this.fb.group({
      nom: [''],
      prenom: [''],
      telephone: [''],
      email: ['', Validators.email],
      departement: [''],
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(6), this.passwordValidator]
      ],
      confirmPassword: ['', Validators.required],
      idEntreprise: [this.idEntreprise]
    }, { validator: this.passwordMatchValidator });
  }
  passwordValidator(control: any) {
    const value = control.value;
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!$@%])[A-Za-z0-9!$@%]{6,}$/;
    return regex.test(value) ? null : { invalidPassword: true };
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }
  saveAdmin() {
    if (this.AdminFormGroup.valid) {
      const adminData = this.AdminFormGroup.getRawValue(); // Utilisez getRawValue() pour inclure les champs désactivés
      this.adminService.AddAdmin(adminData).subscribe({
        next: value => {
          alert('Admin saved successfully!!!');
          this.route.navigate(['/superAdmin/listeAdmin',this.idEntreprise]);
        },
        error: err => {
          console.log('Erreur:', err);
          this.errorMessage = err.error?.message || 'Une erreur est survenue. Veuillez réessayer.';
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
