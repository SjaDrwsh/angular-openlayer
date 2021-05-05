import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface GioPosition {
  componentName: string;
  componentType: string;
  status: GioStatus;
  lastUpdated: number;
  location: Location;
}

export interface Location {
  lat: number;
  lon: number;
}

export type GioStatus= 'OK' | 'Alert';

@Injectable({
  providedIn: 'root'
})
export class MapViewService {

  constructor() { }

  getGioPosition(): Observable<GioPosition[]> {
    return (
      of([
          {
            componentName: 'Clamp 1',
            componentType: 'Blade Clamp',
            status: 'OK',
            lastUpdated: 1613046193,
            location: {
              lat: 48.137222,
              lon: 11.575556
            }
          },
          {
            componentName: 'Clamp 2',
            componentType: 'Blade Clamp',
            status: 'OK',
            lastUpdated: 1613806033,
            location: {
              lat: 56.138481,
              lon: 8.973180
            }
          },
          {
            componentName: 'Clamp 3',
            componentType: 'Blade Clamp',
            status: 'Alert',
            lastUpdated: 1614782833,
            location: {
              lat: 55.789509,
              lon: 8.735330
            }
          },
          {
            componentName: 'Clamp 4',
            componentType: 'Blade Clamp',
            status: 'OK',
            lastUpdated: 1615622173,
            location: {
              lat: 31.230391,
              lon: 121.473701
            }
          }
        ]
    ));
  }
}
