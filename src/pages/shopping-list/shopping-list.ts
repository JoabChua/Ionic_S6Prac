import { AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, LoadingController, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ShoppingListService } from '../../services/shopping-list';
import {Ingredient} from '../../models/ingredient';
import { DatabaseOptionsPage } from '../database-options/database-options';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private slService: ShoppingListService,
              private poc: PopoverController, private authService: AuthService, private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }
  
  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form:NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }
  onCheckItem(index:number) {
    this.slService.removeItem(index);
    this.loadItems();
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
              this.slService.fetchList(token)
              .subscribe(
                (list: Ingredient[]) => {
                  loading.dismiss();
                  if (list) {
                    this.listItems = list;
                  } else {
                    this.listItems = [];
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
              this.slService.storeList(token)
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
