import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../../shared/services/hotel.service';
import { Hotel } from '../../shared/services/hotel';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Footer } from '../../shared/components/footer/footer';
import { Pagination } from '../../shared/components/pagination/pagination';
import { Filters } from '../../shared/components/filters/filters';
import { Nav } from '../../shared/components/nav/nav';
import { Checkbox } from '../../shared/components/checkbox/checkbox';

@Component({
  selector: 'amr-hotel-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    Filters,
    Pagination,
    Footer,
    Nav,
    Checkbox,
  ],
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.scss',
  providers: [HotelService]
})
export class HotelList {
  // Señales de estado
  hotels = signal<Hotel[]>([]);
  nameFilter = signal('');
  priceFilter = signal(Infinity);
  selectedRatings = signal<number[]>([]);
  currentPage = signal(0);
  itemsPerPage = signal(15);
  errorMessage = signal('');

  // Lista filtrada reactiva
  filteredHotels = computed(() => {
    return this.hotels().filter(hotel =>
      hotel.name.toLowerCase().includes(this.nameFilter().toLowerCase()) &&
      (this.selectedRatings().length === 0 || this.selectedRatings().includes(hotel.stars)) &&
      hotel.price <= this.priceFilter()
    );
  });

  // Hoteles paginados reactivos
  paginatedHotels = computed(() => {
    const start = this.currentPage() * this.itemsPerPage();
    return this.filteredHotels().slice(start, start + this.itemsPerPage());
  });

  constructor(private hotelService: HotelService, private router: Router) {
    this.loadHotels();
  }

  // Cargar hoteles desde el servicio
  private loadHotels(): void {
    this.hotelService.getHotels().subscribe({
      next: (hotels) => this.hotels.set(hotels),
      error: (err) => this.handleError(err),
    });
  }

  // Métodos de filtros
  updateNameFilter(value: string) {
    this.nameFilter.set(value);
    this.currentPage.set(0); // reinicia la página al filtrar
  }

  updatePriceFilter(value: number) {
    this.priceFilter.set(value);
    this.currentPage.set(0);
  }

  handleCheckboxChange(rating: number, checked: boolean) {
    const ratings = [...this.selectedRatings()];
    if (checked) {
      ratings.push(rating);
    } else {
      const index = ratings.indexOf(rating);
      if (index !== -1) ratings.splice(index, 1);
    }
    this.selectedRatings.set(ratings);
    this.currentPage.set(0);
  }

  // Paginación
  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.currentPage.set(event.pageIndex);
    this.itemsPerPage.set(event.pageSize);
  }

  // Navegación a detalles
  openDetails(id: string) {
    this.router.navigate([`/hotels/${id}`]);
  }

  // Iconos de estrellas
  getStarIcons(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const totalStars = 5;
    const stars = Array(fullStars).fill('star');
    if (hasHalfStar) stars.push('star_half');
    while (stars.length < totalStars) stars.push('star_border');
    return stars;
  }

  private handleError(error: any): void {
    this.errorMessage.set('Error fetching hotels');
    console.error('Error fetching hotel details', error);
  }
}
