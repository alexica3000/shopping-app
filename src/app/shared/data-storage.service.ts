import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  private baseUrl = 'https://shopping-app-6da50.firebaseio.com/recipes.json';
  constructor(private http: HttpClient, private recipesService: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.baseUrl, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(): any {
    return this.http.get<Recipe[]>(this.baseUrl)
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }), tap(recipes => {
        this.recipesService.setRecipes(recipes);
      }));
  }
}
