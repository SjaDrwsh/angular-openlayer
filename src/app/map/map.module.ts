import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MapViewComponent } from '../map-view/map-view.component';
import { MapViewModule } from '../map-view/map-view.module';

@NgModule({
  declarations: [
    MapComponent,
    MapViewComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MapViewModule
  ],
  exports: [
    MapComponent,
    MatSidenavModule,
    MapViewModule
  ]
})
export class MapModule { }
