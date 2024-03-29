import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MarketplaceService } from '../marketplace.service';
import { TourRating } from '../model/tour-rating.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ImageService } from 'src/app/shared/image/image.service';

@Component({
  selector: 'xp-tour-rating',
  templateUrl: './tour-rating.component.html',
  styleUrls: ['./tour-rating.component.css'],
  providers: [DatePipe]
})
export class TourRatingComponent  implements OnInit {
  ratings: TourRating[] = [];
  selectedRating: TourRating;
  shouldRenderTourRatingForm: boolean = false;
  shouldDelete: boolean = false;
  shouldAdd: boolean = false;
  user: User;
  
  constructor(private service: MarketplaceService, private authService: AuthService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.showElements(this.user);
    this.getTourRating();
  }

  showElements(user: User): void{
    switch (user.role) {
      case 'administrator': {
        this.shouldDelete = true;
        this.shouldAdd = false;
        break;
      }
      case 'author': {
        this.shouldDelete = false;
        this.shouldAdd = false;
        break;
      }
      default:{ // tourist
        this.shouldDelete = false;
        this.shouldAdd = true;
        break;
      }
    }
  }

  deleteTourRating(id: number): void {
    this.service.deleteTourRating(id).subscribe({
      next: () => {
        this.getTourRating();
      },
    })
  }

  getTourRating(): void {
    this.service.getTourRating(this.user.role).subscribe({
      next: (result: PagedResults<TourRating>) => {
        this.ratings = result.results;
        },
        error: () => {
        }
      })
  }

  onAddClicked(): void {
    this.shouldRenderTourRatingForm = true;
  }

  getImageUrl(imageName: string): string {
    return this.imageService.getImageUrl(imageName);
  }
}