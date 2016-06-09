import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { Router } from '@angular/router-deprecated';

var componentName = 'heroes';
var templateUrl = `templates/${componentName}.component.html`;
var styleUrl = `styles/${componentName}.component.css`;
if(typeof process!=="undefined") {
  templateUrl = `file://${__dirname}/../${templateUrl}`;
  styleUrl = `file://${__dirname}/../${styleUrl}`;
}
@Component({
    selector: 'my-heroes',
    templateUrl: templateUrl,
    styleUrls:[styleUrl],
    directives: [HeroDetailComponent],
    providers: [HeroService]
})

export class HeroesComponent implements OnInit {
    constructor(private heroService: HeroService, private router: Router) { }

    ngOnInit() {
        this.getHeroes();
    }

    title = 'Tour of Heroes';
    heroes: Hero[];
    selectedHero: Hero;
    addingHero = false;
    error: any;

    onSelect(hero: Hero) { this.selectedHero = hero; }

    gotoDetail() {
        this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }

    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }

    close(savedHero: Hero) {
        this.addingHero = false;
        if (savedHero) { this.getHeroes(); }
    }

    delete(hero: Hero, event: any) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

}
