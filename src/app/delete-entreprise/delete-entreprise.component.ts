import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-entreprise',
  templateUrl: './delete-entreprise.component.html',
  styleUrl: './delete-entreprise.component.css'
})
export class DeleteEntrepriseComponent {

  constructor(public dialogRef: MatDialogRef<DeleteEntrepriseComponent>) {}
  onConfirm(): void {
    // Ferme le dialogue et renvoie 'true'
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Ferme le dialogue et renvoie 'false'
    this.dialogRef.close(false);
  }
}
