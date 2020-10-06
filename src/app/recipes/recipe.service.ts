import {EventEmitter} from '@angular/core';
import {Recipe} from './recipe.model';

export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is a simply test', 'https://cdn.pixabay.com/photo/2015/10/26/07/21/soup-1006694_960_720.jpg'),
    new Recipe('Recipe 2', 'This is a simply description', 'https://cdn.pixabay.com/photo/2015/09/16/20/10/dough-943245_960_720.jpg'),
    new Recipe('A recipe 3', 'Simply desc', 'https://cdn.pixabay.com/photo/2015/09/17/17/19/egg-944495_960_720.jpg'),
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }


}
