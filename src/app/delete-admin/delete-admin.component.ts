import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrl: './delete-admin.component.css'
})
export class DeleteAdminComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAdminComponent>) {}
  onConfirm(): void {
    // Ferme le dialogue et renvoie 'true'
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Ferme le dialogue et renvoie 'false'
    this.dialogRef.close(false);
  }

}
