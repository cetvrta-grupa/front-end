import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MapComponent } from 'src/app/shared/map/map.component';
import { MarketplaceService } from '../marketplace.service';
import { TourPreview } from '../model/tour-preview';
import { PublicTour } from '../model/public-tour.model';
import { MapObject } from '../../tour-authoring/model/map-object.model';
import { PublicCheckpoint } from '../../tour-execution/model/public_checkpoint.model';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { PurchasedTourPreview } from '../../tour-execution/model/purchased_tour_preview.model';
import { CompositeForm } from '../model/composite-create';

@Component({
  selector: 'xp-composite-tour-form',
  templateUrl: './composite-tour-form.component.html',
  styleUrls: ['./composite-tour-form.component.css']
})
export class CompositeTourFormComponent implements OnInit, AfterViewInit{
  
  user: User;

  purchasedTours:PurchasedTourPreview[]=[];
  selectedTours:PurchasedTourPreview[]=[];
  selectedIds: number[]=[];
  name: string = '';
  description: string = '';


  constructor(private service: MarketplaceService,private tourService: TourAuthoringService, private authService: AuthService, private router:Router) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.service.getTouristsPurchasedTours(this.user.id).subscribe({
      next: (result) => {
        this.purchasedTours = result;
      },
      error: () => {
      }
    });
  }

  createCompositeTour():void{
    if(this.selectedTours.length<2){
      console.log("You must select at least 2 tours to create a composite tour!");
      return;
    }
    if(this.name === ""){
      console.log("You must enter a name!");
      return;
    }
    if(this.description === ""){
      console.log("You must enter a description!");
      return;
    }

        this.selectedTours.forEach((tour) => {this.selectedIds.push(tour.id)});
        console.log(this.selectedIds);
        console.log(this.name);
        console.log(this.description);

        const form: CompositeForm = {
          ownerId : this.user.id,
          name: this.name || "",
          description: this.description || "",
          tourIds: this.selectedIds,   
        };
        this.selectedIds=[];
        this.service.addCompositeTour(form).subscribe({
          next:()=>{this.router.navigate(['/composite-list']);}
        });
    
  }

  selectionCheck(t: PurchasedTourPreview):boolean{
    return this.selectedTours.some(selected => selected.id === t.id);
  }


  addToSelected(t: PurchasedTourPreview):void{
    if(this.selectionCheck(t)){
      return;
    }
    this.selectedTours.push(t);
  }

  removeFromSelected(t: PurchasedTourPreview):void{
    this.selectedTours = this.selectedTours.filter((tour) => tour !== t);
  }


}
