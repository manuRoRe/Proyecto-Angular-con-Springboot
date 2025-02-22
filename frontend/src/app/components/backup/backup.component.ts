import { Component } from '@angular/core';

import { UsuariasListComponent } from '../usuarias-list/usuarias-list.component';

@Component({
  selector: 'app-backup',
  imports: [UsuariasListComponent],
  templateUrl: './backup.component.html',
  styleUrl: './backup.component.css',
})
export class BackupComponent {}
