import { Component, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sliders } from '../sliders/sliders';

@Component({
  selector: 'amr-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    Sliders,
    MatCheckboxModule,
  ],
  templateUrl: './filters.html',
  styleUrl: './filters.scss'
})
export class Filters {
  ratingFilter: number = 0;
  priceFilter: number = 1000;
  selectedRatings: number[] = [];

  @Output() nameFilterChanged = new EventEmitter<string>();
  @Output() ratingChange = new EventEmitter<number>();
  @Output() priceChange = new EventEmitter<number>();
  @Output() ratingsChange = new EventEmitter<number[]>(); // Emitir array de ratings seleccionados

  /** Maneja el cambio del input de nombre */
  onNameChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.nameFilterChanged.emit(target.value.trim());
  }

  /** Maneja el cambio del slider de calificación */
  onRatingChange(value: number) {
    this.ratingFilter = value;
    this.ratingChange.emit(this.ratingFilter);
  }

  /** Maneja el cambio del slider de precio */
  onPriceChange(value: number) {
    this.priceFilter = value;
    this.priceChange.emit(this.priceFilter);
  }

  /** Maneja los checkboxes de calificaciones */
  onCheckboxChange(event: MatCheckboxChange, rating: number): void {
    if (event.checked) {
      if (!this.selectedRatings.includes(rating)) {
        this.selectedRatings.push(rating);
      }
    } else {
      this.selectedRatings = this.selectedRatings.filter(r => r !== rating);
    }
    this.ratingsChange.emit([...this.selectedRatings]); // Emitir copia del array
  }

}
