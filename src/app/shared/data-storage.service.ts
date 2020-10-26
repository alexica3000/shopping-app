import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {firebaseData} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService) {}

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put(firebaseData.storageUrl, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<any> {
    return this.http.get<Recipe[]>(firebaseData.storageUrl).pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }), tap(recipes => {
      this.recipesService.setRecipes(recipes);
    }));
  }
}
