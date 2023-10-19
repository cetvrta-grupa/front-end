import { Component, OnInit } from '@angular/core';
import { Tour } from '../model/tour.model';
import { Equipment } from '../model/equipment.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit{
  tours: Tour[] = [];
  selectedTour: Tour;
  selectedEquipmet: Equipment;
  shouldRenderTourForm: boolean = false;
  shouldEdit: boolean = false;
  user: User;
  equipment: Equipment[] = [];

  
  constructor(private service: TourAuthoringService,private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getTour();
  }
  
  deleteTour(id: number): void {
    this.service.deleteTour(id).subscribe({
      next: () => {
        this.getTour();
      },
    })
  }

  getTour(): void {
    this.service.getTour(this.user.id).subscribe({
      next: (result: Tour[]) => {
        this.tours = result;
      },
      error: () => {
      }
    })
  }

  deleteEquipment(tourId?: number, equipmentId?: number): void {
    if(tourId !== undefined && equipmentId !== undefined)
    {
      this.service.deleteEquimpent(tourId, equipmentId).subscribe({
        next: () => {
          this.getTour();
        }
      })
    }
  }

  onEditClicked(tour: Tour): void {
    this.selectedTour = tour;
    this.shouldRenderTourForm = true;
    this.shouldEdit = true;
  }

  onAddClicked(): void {
    this.shouldEdit = false;
    this.shouldRenderTourForm = true;
  }
}
