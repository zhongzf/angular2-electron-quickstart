import { Component }       from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from "./dashboard.component";
import { HeroDetailComponent } from './hero-detail.component';

var componentName = 'app';
var templateUrl = `templates/${componentName}.component.html`;
var styleUrl = `styles/${componentName}.component.css`;
if(typeof process!=="undefined") {
  templateUrl = `file://${__dirname}/../${templateUrl}`;
  styleUrl = `file://${__dirname}/../${styleUrl}`;
}
@Component({
  selector: 'my-app',
  templateUrl: templateUrl,
  styleUrls:[styleUrl],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HeroService
    ]
})
@RouteConfig([
 {
  path: '/dashboard',
  name: 'Dashboard',
  component: DashboardComponent,
  useAsDefault: true
},
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  }  ,
  {
  path: '/detail/:id',
  name: 'HeroDetail',
  component: HeroDetailComponent
}
])
export class AppComponent {
  title = 'Tour of Heroes';
  private process : any;
  constructor() { 
    if(typeof process!=="undefined") {
      this.process = process;
    }
  }
}
