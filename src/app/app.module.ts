import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { MapViewService } from './map-view.service';
import { MapViewComponent } from './map-view/map-view.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapModule } from './map/map.module';

@NgModule({
  declarations: [
    AppComponent,
    MapViewComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    MapModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [MapViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
