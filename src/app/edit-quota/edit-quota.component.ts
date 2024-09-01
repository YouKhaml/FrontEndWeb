import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quota, QuotaType } from '../Modele/quota.model';
import { QuotaService } from '../services/quota.service';

@Component({
  selector: 'app-edit-quota',
  templateUrl: './edit-quota.component.html',
  styleUrls: ['./edit-quota.component.css']
})
export class EditQuotaComponent {
  quotaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quotaService: QuotaService,
    public dialogRef: MatDialogRef<EditQuotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idQuota: string, quota: Quota }
  ) {
    // Initialiser le formulaire avec la valeur de quota existante
    this.quotaForm = this.fb.group({
      quota: [this.data.quota.valeur, [Validators.required, Validators.min(0)]]
    });
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.quotaForm.valid) {
      const quotaControl = this.quotaForm.get('quota');
      if (quotaControl) {
        const quotaValue: number = quotaControl.value;
        const updatedQuota: Quota = {
          idQuota: this.data.idQuota,
          valeur: quotaValue,
          type: QuotaType.ENTREPRISE
        };

        // Appel du service pour mettre à jour le quota
        this.quotaService.updateQuota(updatedQuota.idQuota, updatedQuota).subscribe(
          response => {
            console.log('Quota mis à jour avec succès', response);
            this.dialogRef.close(updatedQuota); // Fermer la boîte de dialogue après la réussite
          },
          error => {
            console.error('Erreur lors de la mise à jour du quota', error);
          }
        );
      }
    }
  }

  // Annuler et fermer la boîte de dialogue
  onCancel(): void {
    this.dialogRef.close();
  }

  private convertGbToBytes(gb: number): number {
    return gb * 1024 * 1024 * 1024; // Conversion de Go en octets
  }
}
