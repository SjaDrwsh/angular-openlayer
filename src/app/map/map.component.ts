import { Component, OnInit } from '@angular/core';
import { GioPosition, MapViewService } from '../map-view.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private mapViewService: MapViewService, private router: Router) { }

  gioLocations: GioPosition[] = [];

  ngOnInit(): void {



    /**
     * I search into this and seems like there is no deprecation but its a bug in
     * Eslint https://github.com/ReactiveX/rxjs/issues/6060 and not yet shipped
     */
    // tslint:disable-next-line: deprecation
    this.mapViewService.getGioPosition().subscribe((res: GioPosition[]) => {
      this.gioLocations = res;
    });

  }

  navigateBack(): void{
    this.router.navigate(['/login']);
  }

}
