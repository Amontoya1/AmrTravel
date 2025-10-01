import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { Modal } from '../modal/modal';

@Component({
  selector: 'amr-nav',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  constructor(private dialog: MatDialog) { }

  openModal(): void {
    this.dialog.open(Modal, {
      data: {
        title: 'Prueba Testing Angular',
      },
      width: '90%',
      maxWidth: '600px',
    });
  }
}
