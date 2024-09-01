import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrepriseService } from '../services/entreprise.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quota } from '../Modele/quota.model';
import { Entreprise } from '../Modele/Entreprises.model';

enum QuotaType {
  ENTREPRISE = 'ENTREPRISE',
  ADMIN = 'ADMIN',
  UTILISATEUR = 'UTILISATEUR'
}

@Component({
  selector: 'app-addquota-entreprise',
  templateUrl: './addquota-entreprise.component.html',
  styleUrls: ['./addquota-entreprise.component.css']
})
export class AddquotaEntrepriseComponent {
  quotaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private entrepriseService: EntrepriseService,
    public dialogRef: MatDialogRef<AddquotaEntrepriseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entrepriseId: string }
  )  {
    console.log('Entreprise ID:', this.data.entrepriseId); // Vérifiez que l'ID est bien défini
    this.quotaForm = this.fb.group({
      quota: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.quotaForm.valid) {
      const quotaControl = this.quotaForm.get('quota');
      if (quotaControl) {
        const quotaValue: number = quotaControl.value;
        const quota: Quota = {
          idQuota: "", // Assigner l'ID du quota si nécessaire
          valeur: quotaValue,
          type: QuotaType.ENTREPRISE
        };

        this.entrepriseService.addQuotaToEntreprise(this.data.entrepriseId, quota).subscribe(
          (response: Entreprise) => {
            console.log('Quota affecté avec succès', response);
            this.dialogRef.close(); // Fermer la boîte de dialogue après la réussite
          },
          error => {
            console.error('Erreur lors de l\'affectation du quota', error);
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Fermer la boîte de dialogue sans enregistrer
  }

  private convertGbToBytes(gb: number): number {
    return gb * 1024 * 1024 * 1024; // Conversion de Go en octets
  }
}
