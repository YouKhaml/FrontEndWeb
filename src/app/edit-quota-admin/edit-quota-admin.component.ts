import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuotaService} from "../services/quota.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Quota, QuotaType} from "../Modele/quota.model";

@Component({
  selector: 'app-edit-quota-admin',
  templateUrl: './edit-quota-admin.component.html',
  styleUrl: './edit-quota-admin.component.css'
})
export class EditQuotaAdminComponent {
  quotaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quotaService: QuotaService,
    public dialogRef: MatDialogRef<EditQuotaAdminComponent>,
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
          type: QuotaType.ADMIN
        };

        this.quotaService.updateQuota(updatedQuota.idQuota, updatedQuota).subscribe(
          response => {
            console.log('Quota mis à jour avec succès', response);
            this.dialogRef.close(updatedQuota); // Passer le quota mis à jour
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
