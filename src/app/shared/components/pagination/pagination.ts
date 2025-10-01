import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'amr-pagination',
  standalone: true,
  imports: [MatPaginator, NgIf],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination implements OnChanges {
  @Input() length: number = 0;
  @Input() pageSize: number = 15;
  @Input() pageSizeOptions: number[] = [5, 10, 15, 20];
  @Output() pageChange = new EventEmitter<{ pageIndex: number; pageSize: number }>();

  showPaginator: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['length'] || changes['pageSize']) {
      this.showPaginator = this.length > this.pageSize;
    }
  }

  onPageChange(event: any): void {
    this.pageChange.emit({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    });
  }
}
