import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-desinscribirse-dialog',
  imports: [],
  templateUrl: './desinscribirse-dialog.component.html',
  styleUrl: './desinscribirse-dialog.component.css',
})
export class DesinscribirseDialogComponent {
  constructor(public dialogRef: MatDialogRef<DesinscribirseDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
