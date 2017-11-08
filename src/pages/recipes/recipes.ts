import { AuthService } from '../../services/auth';
import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams, PopoverController } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes';
import { DatabaseOptionsPage } from '../database-options/database-options';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesService: RecipesService,
              private poc: PopoverController, private authService: AuthService, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }
  
  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
  onLoadRecipe(recipe:Recipe, index:number) {
    this.navCtrl.push(RecipePage, {recipe:recipe, index:index});
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content:'Please wait . . .'
    });
    const popover = this.poc.create(DatabaseOptionsPage);
    popover.present({ev:event});
    popover.onDidDismiss(
      data => {
        if(!data) {
          return;
        }
        if(data.action=='load'){
          loading.present();
          this.authService.getActiveUser().getToken()
          .then(
            (token:string) => {
              this.recipesService.fetchList(token)
              .subscribe(
                (list: Recipe[]) => {
                  loading.dismiss();
                  if (list) {
                    this.recipes = list;
                  } else {
                    this.recipes = [];
                  }
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.message);
                }
              )
            }
          );
        } else if (data.action=='store') {
          loading.present();
          this.authService.getActiveUser().getToken()
          .then(
            (token:string) => {
              this.recipesService.storeList(token)
              .subscribe(
                () =>  loading.dismiss(),
                error => { 
                  loading.dismiss();
                  this.handleError(error.message);
                }
              );
            }
          );
        }
      }
    );
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title:'An Error has Occured',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
