import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super Schnitzel',
      'https://cdn.pixabay.com/photo/2015/10/26/07/21/soup-1006694_960_720.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Big Fat Burger',
      'Description of Big Burger',
      'https://cdn.pixabay.com/photo/2015/09/16/20/10/dough-943245_960_720.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
    new Recipe(
      'Super Salad',
      'Desc of Salad',
      'https://cdn.pixabay.com/photo/2015/09/17/17/19/egg-944495_960_720.jpg',
      [
        new Ingredient('Tomatoes', 4),
        new Ingredient('Cucumbers', 5)
      ]),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
