import { Component, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import XyzSource from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import {Icon} from 'ol/style';
import { MapBrowserEvent, Overlay } from 'ol';
import { GioPosition } from '../map-view.service';
import Geometry from 'ol/geom/Geometry';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  // receiving observable from parent component
  @Input() gioPositions: GioPosition[] = [];

  componentName = '';
  componentImg = '';
  componentStatus = '';
  componentType = '';
  lastUpdated = '';

  vectorSource: VectorSource | undefined;
  vectorLayer!: VectorLayer;
  xyzSource: XyzSource | undefined;
  tileLayer!: TileLayer;
  view: View | undefined;
  map!: Map;
  marker: Feature | undefined;
  overlay!: Overlay;
  popup!: Overlay;

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void{

    const closer = document.getElementById('popup-closer') as HTMLElement;
    const pos = fromLonLat([this.gioPositions[0].location.lon, this.gioPositions[0].location.lat]);

    // adding marker from passed positions and style
    const markers: Feature<Geometry>[] = [];
    this.gioPositions?.map((gioPosition) => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([gioPosition.location.lon, gioPosition.location.lat])),
        componentName: gioPosition.componentName,
        componentType: gioPosition.componentType,
        lastUpdated: gioPosition.lastUpdated,
        componentStatus: gioPosition.status,
      });
      marker.setStyle(new Style({
        image: new Icon({
          src: `assets/${gioPosition.status}.png`
        })
      }));
      markers.push(marker);
    });

    // Feature and vector to be able to add markers
    this.vectorSource = new VectorSource({
      features: markers
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    // XYZ
    this.xyzSource = new XyzSource({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.tileLayer = new TileLayer({
      source: this.xyzSource
    });

    // View and map
    this.view = new View({
      center: pos,
      zoom: 5.5
    });

    this.overlay = new Overlay({
      element: document.getElementById('popup') as HTMLElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      },
      position: pos,
    });

    this.map = new Map({
      target: 'map',
      layers: [this.tileLayer, this.vectorLayer],
      view: this.view,
    });


    this.map.addOverlay(this.overlay);

    // Popup showing the position the user clicked
    this.popup = new Overlay({
      element: document.getElementById('popup') as HTMLElement,
      autoPan: true,
    });

    this.map.addOverlay(this.popup);

    this.map.on('click', (evt: MapBrowserEvent<UIEvent>) => {
      const coordinate = evt.coordinate;

      // make sure its one of the marker to show popup
      const features = this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        return feature;
        });
      if (features) {
          this.popup.setPosition(coordinate);
          const date = new Date(features?.get('lastUpdated') * 1000);
          // add content of popup
          this.componentName = features?.get('componentName');
          this.componentImg = `assets/component-${features?.get('componentStatus')}.png`;
          this.componentStatus = features?.get('componentStatus');
          this.componentType = features?.get('componentType');
          this.lastUpdated = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} - ${date.getHours()}: ${date.getMinutes()}`;
        }else {
          this.popup.setPosition(undefined);
        }
    });

    // close on x click
    closer.onclick = () => {
      this.popup.setPosition(undefined);
      closer.blur();
      return false;
    };
  }
}
