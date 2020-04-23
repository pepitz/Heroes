import { heroesData } from "./heroes-data";
import { Injectable } from "@angular/core";
import { Hero } from "./hero";

@Injectable({
  providedIn: "root",
})
export class HeroService {
  heroes: Hero[] = heroesData;
  constructor() {}

  getHeroes() {
    return this.heroes;
  }

  getHero(name: string) {
    return this.heroes.find((element: Hero) => {
      return name.toLowerCase() === element.name.toLowerCase();
    });
  }
}
