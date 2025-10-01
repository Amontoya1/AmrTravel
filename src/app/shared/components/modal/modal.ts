import { Component, HostListener, Inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

export interface ModalData {
  title?: string;
  messages?: string[];
  imageSrc?: string;
}

@Component({
  selector: 'amr-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  title = signal<string>('Default Title');
  messages = signal<string[]>([
    'Desarrollo web con Angular',
    'Desarrollo de Backend con Node.js (Sistema Legado)',
    'Gestión de proyectos con Azure',
    'Participación en equipos ágiles y remotos (Kanban, Scrum)',
    'Uso de JavaScript y TypeScript para crear interfaces intuitivas',
    'Control de versiones de código con Git',
    'Realización de pruebas unitarias e integradas',
  ]);
  imageSrc = signal<string>('/assets/Andrea03.svg');





  constructor(
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) data: ModalData,
    private router: Router
  ) {
    setTimeout(() => {
      this.title.set(data?.title ?? 'Default Title');
    });
  }


  onClose(): void {
    this.dialogRef.close();
  }

  onBack(): void {
    this.dialogRef.close();
    this.router.navigate(['/hotels']);
  }

  @HostListener('window:keydown.escape')
  onEscapeKey(): void {
    this.onClose();
  }

}
