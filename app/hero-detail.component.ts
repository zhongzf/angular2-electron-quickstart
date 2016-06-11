import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from './hero';
import { RouteParams } from '@angular/router-deprecated';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';

var componentName = 'hero-detail';
var templateUrl = `../templates/${componentName}.component.html`;
var styleUrl = `../styles/${componentName}.component.css`;
@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: templateUrl,
  styleUrls:[styleUrl]
})
export class HeroDetailComponent implements OnInit {
    error: any;
    navigated = false; // true if navigated here
    @Output() 
    close = new EventEmitter();

    constructor(
        private heroService: HeroService,
        private routeParams: RouteParams) 
      {
      }

  ngOnInit() {
    if (this.routeParams.get('id') !== null) {
      let id = +this.routeParams.get('id');
      this.navigated = true;
      this.heroService.getHero(id)
          .then(hero => this.hero = hero);
    } else {
      this.navigated = false;
      this.hero = new Hero();
    }
  }


  @Input()
  hero: Hero;

  goBack(savedHero: Hero = null) {
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }

  save() {
    this.heroService
        .save(this.hero)
        .then(hero => {
          this.hero = hero; // saved hero, w/ id if new
          this.goBack(hero);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

}
