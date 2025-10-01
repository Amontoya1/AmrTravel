import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'amr-checkbox',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  @Input() label!: string;
  @Input() checked: boolean = false;
  @Output() change = new EventEmitter<boolean>();

  onChange(event: MatCheckboxChange) {
    this.checked = event.checked;
    this.change.emit(this.checked);
  }
}
