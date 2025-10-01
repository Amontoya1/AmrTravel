import { Routes } from '@angular/router';
import { HotelDetails } from './pages/hotel-details/hotel-details';
import { HotelList } from './pages/hotel-list/hotel-list';

export const routes: Routes = [
    {
        path: '',
        component: HotelList,
    },
    {
        path: 'hotels/:id',
        component: HotelDetails,
    },
    { path: '', redirectTo: '/hotels', pathMatch: 'full' },
];
