import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth/auth.service';
import {Observable} from 'rxjs';
import {DataStorage} from '../const';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService,
    private dataStorage: DataStorage) {

  }

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.dataStorage.storageUrl, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<any> {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<Recipe[]>(this.dataStorage.storageUrl, {params: new HttpParams().set('auth', user.token)});
    }), map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }), tap(recipes => {
      this.recipesService.setRecipes(recipes);
    }));
  }
}
