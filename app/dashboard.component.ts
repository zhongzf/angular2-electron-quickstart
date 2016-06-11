import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router-deprecated';


var componentName = 'dashboard';
var templateUrl = `../templates/${componentName}.component.html`;
var styleUrl = `../styles/${componentName}.component.css`;
@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: templateUrl,
  styleUrls:[styleUrl]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private router: Router, private heroService: HeroService) { }
  ngOnInit() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1,5));
  }
  gotoDetail(hero: Hero) {
  let link = ['HeroDetail', { id: hero.id }];
  this.router.navigate(link);
}

}

