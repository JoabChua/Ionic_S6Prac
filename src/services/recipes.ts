import { AuthService } from './auth';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";
import 'rxjs/Rx';

@Injectable()
export class RecipesService {
    private recipes: Recipe[] = [];

    constructor(private http: Http, private authService: AuthService) {

    }

    addRecipes(title: string,
                description: string,
                difficulty: string,
                ingredients: Ingredient[]) {
                    this.recipes.push(new Recipe(title,description,difficulty,ingredients));
                    console.log(this.recipes);
                }

    getRecipes() {
        return this.recipes.slice();
    }

    updateRecipe(index: number, title: string, description:string, difficulty:string, ingredients:Ingredient[]) {
        this.recipes[index] = new Recipe(title,description,difficulty,ingredients);
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    storeList(token:string){
        const userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic-project-abded.firebaseio.com/' + userId + '/recipe.json?auth=' 
        + token, this.recipes)
        .map((response: Response) => response.json());
    }

    fetchList(token:string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic-project-abded.firebaseio.com/' + userId + '/recipe.json?auth=' 
        + token)
        .map((response: Response) => {
            const recipes: Recipe[] = response.json() ? response.json() : [];
            for (let item of recipes) {
                if (!item.hasOwnProperty('ingredients')){
                    item.ingredients=[];
                }
            }
            return recipes;
        })
        .do((recipes: Recipe[]) => {
            if(recipes) {
                this.recipes = recipes;
            } else {
                this.recipes = [];
            }
        });
    };
}