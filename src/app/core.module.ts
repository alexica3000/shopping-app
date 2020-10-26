import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {RecipeService} from './recipes/recipe.service';
import {DataStorage, FirebaseVariables} from './const';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './auth/auth-interceptor.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    FirebaseVariables,
    DataStorage,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ]
})

export class CoreModule { }
