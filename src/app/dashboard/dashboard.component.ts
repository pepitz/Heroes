import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";

import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  searchForm: FormGroup;

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.heroes = this.heroService.getHeroes();
  }

  initForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        this.checkForHeroValidator(),
      ]),
    });
  }

  get name() {
    return this.searchForm.get("name");
  }

  checkForHeroValidator(): ValidatorFn {
    // const heroNames = this.heroes.map((h) => h.name);
    // const searchTerm = name.trim().toLowerCase();
    // return heroNames.includes(searchTerm);
    return (control: AbstractControl): { [key: string]: any } | null => {
      const heroNames = this.heroes.map((h) => h.name.toLowerCase());
      const searchTerm = control.value
        ? control.value.trim().toLowerCase()
        : null;
      console.log("form: ", control);
      if (!heroNames.includes(searchTerm)) {
        return {
          nameNotFound: true,
        };
      }
      return null;
    };
  }

  onSubmit() {
    const name = this.searchForm.controls["name"].value;
    const link = ["../results", name];
    this.router.navigate(link);
  }
}
