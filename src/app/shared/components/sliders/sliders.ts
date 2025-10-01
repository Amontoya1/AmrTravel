import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'amr-sliders',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './sliders.html',
  styleUrl: './sliders.scss'
})
export class Sliders {
  @Input() min: number = 0;
  @Input() max: number = 5;
  @Input() step: number = 0.1;
  @Input() value: number = 0;
  @Input() type: 'rating' | 'price' = 'rating';

  @Output() valueChange = new EventEmitter<number>();

  onValueChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.value = parseFloat(target.value);
      this.valueChange.emit(this.value);
    }
  }

}
