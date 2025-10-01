import { Component } from '@angular/core';
import { Hotel } from '../../shared/services/hotel';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../shared/services/hotel.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'amr-hotel-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './hotel-details.html',
  styleUrl: './hotel-details.scss'
})
export class HotelDetails {
  hotel: Hotel | undefined;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private router: Router
  ) {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if (hotelId) {
      this.hotelService.getHotelById(hotelId).subscribe({
        next: (hotel) => (this.hotel = hotel),
        error: (err) => this.handleError(err),
      });
    }
  }

  handleError(error: any): void {
    this.errorMessage = 'Error fetching hotel';
    console.error('Error fetching hotel details', error);
  }

  goToHotelList(): void {
    this.router.navigate(['/']);
  }

  getStarIcons(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const totalStars = 5;
    const stars = Array(fullStars).fill('star');
    if (hasHalfStar) stars.push('star_half');
    while (stars.length < totalStars) stars.push('star_border');
    return stars;
  }

}
