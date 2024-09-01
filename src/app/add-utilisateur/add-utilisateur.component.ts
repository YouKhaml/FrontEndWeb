import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent implements OnInit {
  UserFormGroup!: FormGroup;
  idAdmin!: string;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.idAdmin = this.activedRoute.snapshot.params['idAdmin'];
    this.UserFormGroup = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departement: ['', Validators.required],
      quotaUser: ['', Validators.required],
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(6), this.passwordValidator]
      ],
      confirmPassword: ['', Validators.required],
      idAdmin: [this.idAdmin]
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

  saveUser() {
    if (this.UserFormGroup.valid) {
      const utilisateurData = this.UserFormGroup.getRawValue();
      this.utilisateurService.AddUtilisateur(utilisateurData).subscribe({
        next: value => {
          alert('Utilisateur enregistré avec succès !');
          this.route.navigate(['/superAdmin/listeUtilisateur']);
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
