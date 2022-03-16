import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  recipesUrl =
    'https://ng-complete-guid-ae03f-default-rtdb.firebaseio.com/recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(this.recipesUrl, recipes).subscribe((recipes) => {
      console.log(recipes);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
