import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingIssueComponent } from './reporting-issue/reporting-issue.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreferenceComponent } from './preference/preference/preference.component';
import { PreferenceFormComponent } from './preference-form/preference-form/preference-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { TourRatingComponent } from './tour-rating/tour-rating.component';
import { TourRatingFormComponent } from './tour-rating-form/tour-rating-form.component';
import { AllToursComponent } from './all-tours/all-tours.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PurchasedToursComponent } from './purchased-tours/purchased-tours.component';

@NgModule({
  declarations: [
    ReportingIssueComponent,
    PreferenceComponent,
    PreferenceFormComponent,
    TourRatingComponent,
    TourRatingFormComponent,
    AllToursComponent,
    ShoppingCartComponent,
    PurchasedToursComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[
    PreferenceFormComponent, 
    TourRatingFormComponent,
    PurchasedToursComponent
  ]

})
export class MarketplaceModule { }