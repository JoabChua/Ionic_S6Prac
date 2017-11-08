webpackJsonp([7],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditRecipePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_recipes__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditRecipePage = (function () {
    function EditRecipePage(navCtrl, navParams, actionSheetController, alertCtrl, toastCtrl, recipesService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetController = actionSheetController;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.recipesService = recipesService;
        this.mode = 'New';
        this.selectOptions = ['Easy', 'Medium', 'Hard'];
    }
    EditRecipePage.prototype.ngOnInit = function () {
        this.mode = this.navParams.get('mode');
        if (this.mode == 'Edit') {
            this.recipe = this.navParams.get('recipe');
            this.index = this.navParams.get('index');
        }
        this.initForm();
    };
    EditRecipePage.prototype.initForm = function () {
        var title = null;
        var description = null;
        var difficulty = 'Medium';
        var ingredients = [];
        if (this.mode == 'Edit') {
            title = this.recipe.title;
            description = this.recipe.description;
            difficulty = this.recipe.difficulty;
            for (var _i = 0, _a = this.recipe.ingredients; _i < _a.length; _i++) {
                var ingredient = _a[_i];
                ingredients.push(new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](ingredient.name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required));
            }
        }
        this.recipeForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormGroup */]({
            'title': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](title, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            'description': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](description, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            'difficulty': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](difficulty, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            'ingredients': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormArray */](ingredients)
        });
    };
    EditRecipePage.prototype.onSubmit = function () {
        var value = this.recipeForm.value;
        var ingredients = [];
        if (value.ingredients.length > 0) {
            ingredients = value.ingredients.map(function (name) {
                return { name: name, amount: 1 };
            });
        }
        if (this.mode == 'Edit') {
            this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
        }
        else {
            this.recipesService.addRecipes(value.title, value.description, value.difficulty, ingredients);
        }
        this.recipeForm.reset();
        this.navCtrl.popToRoot();
    };
    EditRecipePage.prototype.onManageIngredients = function () {
        var _this = this;
        var actionSheetController = this.actionSheetController.create({
            title: 'What do you want to do?',
            buttons: [
                {
                    text: 'Add Ingredient',
                    handler: function () {
                        _this.createNewIngredientAlert().present();
                    }
                },
                {
                    text: 'Remove all ingredients',
                    handler: function () {
                        var fArray = _this.recipeForm.get('ingredients');
                        var len = fArray.length;
                        if (len > 0) {
                            for (var i = len - 1; i >= 0; i--) {
                                fArray.removeAt(i);
                            }
                            var toast = _this.toastCtrl.create({
                                message: 'All Ingredients were deleted!',
                                duration: 2000,
                                position: 'bottom'
                            });
                            toast.present();
                        }
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheetController.present();
    };
    EditRecipePage.prototype.createNewIngredientAlert = function () {
        var _this = this;
        return this.alertCtrl.create({
            title: 'Add Ingredient',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Add',
                    handler: function (data) {
                        if (data.name.trim() == '' || data.name == null) {
                            var toast_1 = _this.toastCtrl.create({
                                message: 'Please enter a valid value!',
                                duration: 2000,
                                position: 'bottom'
                            });
                            toast_1.present();
                            return;
                        }
                        _this.recipeForm.get('ingredients').push(new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](data.name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required));
                        var toast = _this.toastCtrl.create({
                            message: 'Item Added',
                            duration: 2000,
                            position: 'bottom'
                        });
                        toast.present();
                    }
                }
            ]
        });
    };
    return EditRecipePage;
}());
EditRecipePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit-recipe',template:/*ion-inline-start:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\edit-recipe\edit-recipe.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{mode}} Recipe</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Title</ion-label>\n        <ion-input type="text" formControlName="title"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Description</ion-label>\n        <ion-textarea formControlName="description"></ion-textarea>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Diffculty</ion-label>\n        <ion-select formControlName="difficulty">\n          <ion-option *ngFor = "let option of selectOptions" [value]="option">{{option}}</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-list>\n    <button ion-button type="button" clear block (click)="onManageIngredients()">Manage Ingredients</button>\n    <ion-list formArrayName="ingredients">\n      <ion-item *ngFor="let igControl of recipeForm.get(\'ingredients\').controls; let i = index">\n        <ion-label floating>Name</ion-label>\n        <ion-input type="text" [formControlName]="i"></ion-input>\n      </ion-item>\n    </ion-list>\n    <button ion-button type="submit" block [disabled]="!recipeForm.valid">{{mode}} Recipe</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\edit-recipe\edit-recipe.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__services_recipes__["a" /* RecipesService */]])
], EditRecipePage);

//# sourceMappingURL=edit-recipe.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingListService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_ingredient__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ShoppingListService = (function () {
    function ShoppingListService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.ingredients = [];
    }
    ShoppingListService.prototype.addItem = function (name, amount) {
        this.ingredients.push(new __WEBPACK_IMPORTED_MODULE_3__models_ingredient__["a" /* Ingredient */](name, amount));
        console.log(this.ingredients);
    };
    ShoppingListService.prototype.addItems = function (items) {
        (_a = this.ingredients).push.apply(_a, items);
        var _a;
    };
    ShoppingListService.prototype.getItems = function () {
        return this.ingredients.slice();
    };
    ShoppingListService.prototype.removeItem = function (index) {
        this.ingredients.splice(index, 1);
    };
    ShoppingListService.prototype.storeList = function (token) {
        var userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic-project-abded.firebaseio.com/' + userId + '/shopping-list.json?auth='
            + token, this.ingredients)
            .map(function (response) {
            return response.json();
        });
    };
    ShoppingListService.prototype.fetchList = function (token) {
        var _this = this;
        var userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic-project-abded.firebaseio.com/' + userId
            + '/shopping-list.json?auth=' + token)
            .map(function (response) {
            return response.json();
        })
            .do(function (ingredients) {
            if (ingredients) {
                _this.ingredients = ingredients;
            }
            else {
                _this.ingredients = [];
            }
        });
    };
    return ShoppingListService;
}());
ShoppingListService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_0__auth__["a" /* AuthService */]])
], ShoppingListService);

//# sourceMappingURL=shopping-list.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseOptionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DatabaseOptionsPage = (function () {
    function DatabaseOptionsPage(vc) {
        this.vc = vc;
    }
    DatabaseOptionsPage.prototype.onAction = function (action) {
        this.vc.dismiss({ action: action });
    };
    return DatabaseOptionsPage;
}());
DatabaseOptionsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-sl-options',template:/*ion-inline-start:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\database-options\database.html"*/'<ion-grid text-center>\n\n    <ion-row>\n\n        <ion-col>\n\n            <h3>Store and Load</h3>\n\n        </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n        <ion-col>\n\n            <button ion-button outline (click) = "onAction(\'load\')">Load List</button>\n\n        </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n    <ion-col>\n\n        <button ion-button outline (click) = "onAction(\'store\')">Store List</button>\n\n    </ion-col>\n\n</ion-row>\n\n</ion-grid>'/*ion-inline-end:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\database-options\database.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* ViewController */]])
], DatabaseOptionsPage);

//# sourceMappingURL=database-options.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, authService, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    SignupPage.prototype.onSignup = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Signing you up. . .'
        });
        loading.present();
        this.authService.signup(form.value.email, form.value.password)
            .then(function (data) {
            loading.dismiss();
        }).catch(function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Signup failed',
                message: error.message,
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\signup\signup.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n        <button ion-button icon-only menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n      </ion-buttons>\n    <ion-title>Signup</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form #f="ngForm" (ngSubmit)="onSignup(f)">\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Email</ion-label>\n        <ion-input type="email" ngModel name="email" required></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label floating>Password</ion-label>\n          <ion-input type="password" ngModel name="password" required [minlength]="6"></ion-input>\n        </ion-item>\n    </ion-list>\n    <button ion-button block type="submit" [disabled]="!f.valid">Sign Up</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\signup\signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__services_auth__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shopping_list__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_recipes__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RecipePage = (function () {
    function RecipePage(navCtrl, navParams, slService, recipesService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.slService = slService;
        this.recipesService = recipesService;
    }
    RecipePage.prototype.ngOnInit = function () {
        this.recipe = this.navParams.get('recipe');
        this.index = this.navParams.get('index');
    };
    RecipePage.prototype.onEditRecipe = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__["a" /* EditRecipePage */], { mode: 'Edit', recipe: this.recipe, index: this.index });
    };
    RecipePage.prototype.onAddIngredients = function () {
        this.slService.addItems(this.recipe.ingredients);
    };
    RecipePage.prototype.onDeleteRecipe = function () {
        this.recipesService.removeRecipe(this.index);
        this.navCtrl.popToRoot();
    };
    return RecipePage;
}());
RecipePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-recipe',template:/*ion-inline-start:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\recipe\recipe.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{recipe.title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col text-center>\n        <h2>{{recipe.title}}</h2>\n        <div class="subtitle">{{recipe.difficulty}}</div>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <p>{{recipe.description}}</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <ion-list>\n          <ion-item *ngFor="let ingredient of recipe.ingredients">{{ingredient.name}}</ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n    <ion-row *ngIf="recipe.ingredients.length >0 ">\n      <ion-col text-center>\n        <button ion-button clear (click)="onAddIngredients()">\n          Add Ingredients to Shopping List\n        </button>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <button ion-button outline block (click)="onEditRecipe()">\n          Edit Recipe\n        </button>\n      </ion-col>\n      <ion-col>\n        <button ion-button outline block (click)="onDeleteRecipe()" color="danger">\n          Delete Recipe\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\recipe\recipe.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__services_shopping_list__["a" /* ShoppingListService */], __WEBPACK_IMPORTED_MODULE_4__services_recipes__["a" /* RecipesService */]])
], RecipePage);

//# sourceMappingURL=recipe.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__edit_recipe_edit_recipe__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_recipes__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__database_options_database_options__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RecipesPage = (function () {
    function RecipesPage(navCtrl, navParams, recipesService, poc, authService, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.recipesService = recipesService;
        this.poc = poc;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    RecipesPage.prototype.ionViewWillEnter = function () {
        this.recipes = this.recipesService.getRecipes();
    };
    RecipesPage.prototype.onNewRecipe = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__edit_recipe_edit_recipe__["a" /* EditRecipePage */], { mode: 'New' });
    };
    RecipesPage.prototype.onLoadRecipe = function (recipe, index) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__recipe_recipe__["a" /* RecipePage */], { recipe: recipe, index: index });
    };
    RecipesPage.prototype.onShowOptions = function (event) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait . . .'
        });
        var popover = this.poc.create(__WEBPACK_IMPORTED_MODULE_6__database_options_database_options__["a" /* DatabaseOptionsPage */]);
        popover.present({ ev: event });
        popover.onDidDismiss(function (data) {
            if (!data) {
                return;
            }
            if (data.action == 'load') {
                loading.present();
                _this.authService.getActiveUser().getToken()
                    .then(function (token) {
                    _this.recipesService.fetchList(token)
                        .subscribe(function (list) {
                        loading.dismiss();
                        if (list) {
                            _this.recipes = list;
                        }
                        else {
                            _this.recipes = [];
                        }
                    }, function (error) {
                        loading.dismiss();
                        _this.handleError(error.message);
                    });
                });
            }
            else if (data.action == 'store') {
                loading.present();
                _this.authService.getActiveUser().getToken()
                    .then(function (token) {
                    _this.recipesService.storeList(token)
                        .subscribe(function () { return loading.dismiss(); }, function (error) {
                        loading.dismiss();
                        _this.handleError(error.message);
                    });
                });
            }
        });
    };
    RecipesPage.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'An Error has Occured',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    return RecipesPage;
}());
RecipesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-recipes',template:/*ion-inline-start:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\recipes\recipes.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button icon-only menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="onNewRecipe()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n      <button ion-button icon-only (click)="onShowOptions($event)">\n\n          <ion-icon name="more"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>Recipes</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    <button ion-item *ngFor = "let recipe of recipes; let i=index"\n\n    (click)="onLoadRecipe(recipe, i)">\n\n    <h2>{{recipe.title}}</h2>\n\n    <ion-note>{{recipe.difficulty}}</ion-note>\n\n    </button>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\recipes\recipes.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__services_recipes__["a" /* RecipesService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_0__services_auth__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */]])
], RecipesPage);

//# sourceMappingURL=recipes.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shopping_list__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__database_options_database_options__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ShoppingListPage = (function () {
    function ShoppingListPage(navCtrl, navParams, slService, poc, authService, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.slService = slService;
        this.poc = poc;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    ShoppingListPage.prototype.ionViewWillEnter = function () {
        this.loadItems();
    };
    ShoppingListPage.prototype.onAddItem = function (form) {
        this.slService.addItem(form.value.ingredientName, form.value.amount);
        form.reset();
        this.loadItems();
    };
    ShoppingListPage.prototype.loadItems = function () {
        this.listItems = this.slService.getItems();
    };
    ShoppingListPage.prototype.onCheckItem = function (index) {
        this.slService.removeItem(index);
        this.loadItems();
    };
    ShoppingListPage.prototype.onShowOptions = function (event) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait . . .'
        });
        var popover = this.poc.create(__WEBPACK_IMPORTED_MODULE_4__database_options_database_options__["a" /* DatabaseOptionsPage */]);
        popover.present({ ev: event });
        popover.onDidDismiss(function (data) {
            if (!data) {
                return;
            }
            if (data.action == 'load') {
                loading.present();
                _this.authService.getActiveUser().getToken()
                    .then(function (token) {
                    _this.slService.fetchList(token)
                        .subscribe(function (list) {
                        loading.dismiss();
                        if (list) {
                            _this.listItems = list;
                        }
                        else {
                            _this.listItems = [];
                        }
                    }, function (error) {
                        loading.dismiss();
                        _this.handleError(error.message);
                    });
                });
            }
            else if (data.action == 'store') {
                loading.present();
                _this.authService.getActiveUser().getToken()
                    .then(function (token) {
                    _this.slService.storeList(token)
                        .subscribe(function () { return loading.dismiss(); }, function (error) {
                        loading.dismiss();
                        _this.handleError(error.message);
                    });
                });
            }
        });
    };
    ShoppingListPage.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'An Error has Occured',
            message: errorMessage,
            buttons: ['Ok']
        });
        alert.present();
    };
    return ShoppingListPage;
}());
ShoppingListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: 'page-shopping-list',template:/*ion-inline-start:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\shopping-list\shopping-list.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n      <ion-buttons start>\n\n          <button ion-button icon-only menuToggle>\n\n            <ion-icon name="menu"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n        <ion-buttons end>\n\n          <button ion-button icon-only (click)="onShowOptions($event)">\n\n            <ion-icon name="more"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    <ion-title>Shopping List</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <form #f="ngForm" (ngSubmit)="onAddItem(f)">\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-label fixed>Name</ion-label>\n\n        <ion-input type="text" name="ingredientName" \n\n        placeholder="Meat? Fish?" ngModel required></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label fixed>Amount</ion-label>\n\n        <ion-input type="number" name="amount" \n\n        placeholder="number!" ngModel required></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n    <button ion-button type="submit" block\n\n    [disabled]="!f.valid">Add Item</button>\n\n  </form>\n\n\n\n  <ion-list>\n\n    <ion-item *ngFor="let item of listItems; let i=index" (click)="onCheckItem(i)">\n\n      <h3>{{item.name}} ({{item.amount}})</h3>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\shopping-list\shopping-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__services_shopping_list__["a" /* ShoppingListService */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1__services_auth__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
], ShoppingListPage);

//# sourceMappingURL=shopping-list.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SigninPage = (function () {
    function SigninPage(navCtrl, navParams, authService, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    SigninPage.prototype.onSignin = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Sigining you in. . . '
        });
        loading.present();
        this.authService.signin(form.value.email, form.value.password).then(function (data) {
            loading.dismiss();
        }).catch(function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'SignIn Failed',
                message: error.message,
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    return SigninPage;
}());
SigninPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: 'page-signin',template:/*ion-inline-start:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\signin\signin.html"*/'<ion-header>\n    \n      <ion-navbar>\n        <ion-buttons start>\n            <button ion-button icon-only menuToggle>\n              <ion-icon name="menu"></ion-icon>\n            </button>\n          </ion-buttons>\n        <ion-title>SignIn</ion-title>\n      </ion-navbar>\n    \n    </ion-header>\n    \n    \n    <ion-content padding>\n      <form #f="ngForm" (ngSubmit)="onSignin(f)">\n        <ion-list>\n          <ion-item>\n            <ion-label floating>Email</ion-label>\n            <ion-input type="email" ngModel name="email" required></ion-input>\n          </ion-item>\n          <ion-item>\n              <ion-label floating>Password</ion-label>\n              <ion-input type="password" ngModel name="password" required></ion-input>\n            </ion-item>\n        </ion-list>\n        <button ion-button block type="submit" [disabled]="!f.valid">Sign In</button>\n      </form>\n    </ion-content>\n    '/*ion-inline-end:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\signin\signin.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__services_auth__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* AlertController */]])
], SigninPage);

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipes_recipes__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shopping_list_shopping_list__ = __webpack_require__(176);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.slPage = __WEBPACK_IMPORTED_MODULE_3__shopping_list_shopping_list__["a" /* ShoppingListPage */];
        this.recipesPage = __WEBPACK_IMPORTED_MODULE_2__recipes_recipes__["a" /* RecipesPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tabs',template:/*ion-inline-start:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\tabs\tabs.html"*/'<ion-tabs selectedIndex="1">\n  <ion-tab [root]="slPage" tabIcon="list-box" tabTitle="Shopping List"></ion-tab>\n  <ion-tab [root]="recipesPage" tabIcon="book" tabTitle="Recipes"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\pages\tabs\tabs.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 189:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 189;

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/edit-recipe/edit-recipe.module": [
		738,
		6
	],
	"../pages/recipe/recipe.module": [
		739,
		5
	],
	"../pages/recipes/recipes.module": [
		740,
		4
	],
	"../pages/shopping-list/shopping-list.module": [
		741,
		3
	],
	"../pages/signin/signin.module": [
		742,
		2
	],
	"../pages/signup/signup.module": [
		743,
		1
	],
	"../pages/tabs/tabs.module": [
		744,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 272;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(345);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_signup_signup__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_signin_signin__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(737);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_recipe_recipe__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_recipes_recipes__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_shopping_list_shopping_list__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_edit_recipe_edit_recipe__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_shopping_list__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_recipes__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_database_options_database_options__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_recipe_recipe__["a" /* RecipePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_recipes_recipes__["a" /* RecipesPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_shopping_list_shopping_list__["a" /* ShoppingListPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_edit_recipe_edit_recipe__["a" /* EditRecipePage */],
            __WEBPACK_IMPORTED_MODULE_3__pages_signin_signin__["a" /* SigninPage */],
            __WEBPACK_IMPORTED_MODULE_2__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_database_options_database_options__["a" /* DatabaseOptionsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/edit-recipe/edit-recipe.module#EditRecipePageModule', name: 'EditRecipePage', segment: 'edit-recipe', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/recipe/recipe.module#RecipePageModule', name: 'RecipePage', segment: 'recipe', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/recipes/recipes.module#RecipesPageModule', name: 'RecipesPage', segment: 'recipes', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/shopping-list/shopping-list.module#ShoppingListPageModule', name: 'ShoppingListPage', segment: 'shopping-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/signin/signin.module#SigninPageModule', name: 'SigninPage', segment: 'signin', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* HttpModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_recipe_recipe__["a" /* RecipePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_recipes_recipes__["a" /* RecipesPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_shopping_list_shopping_list__["a" /* ShoppingListPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_edit_recipe_edit_recipe__["a" /* EditRecipePage */],
            __WEBPACK_IMPORTED_MODULE_3__pages_signin_signin__["a" /* SigninPage */],
            __WEBPACK_IMPORTED_MODULE_2__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_database_options_database_options__["a" /* DatabaseOptionsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_5__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_15__services_shopping_list__["a" /* ShoppingListService */],
            __WEBPACK_IMPORTED_MODULE_16__services_recipes__["a" /* RecipesService */],
            __WEBPACK_IMPORTED_MODULE_1__services_auth__["a" /* AuthService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);

var AuthService = (function () {
    function AuthService() {
    }
    AuthService.prototype.signup = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_0_firebase__["auth"]().createUserWithEmailAndPassword(email, password);
    };
    AuthService.prototype.signin = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_0_firebase__["auth"]().signInWithEmailAndPassword(email, password);
    };
    AuthService.prototype.logout = function () {
        __WEBPACK_IMPORTED_MODULE_0_firebase__["auth"]().signOut();
    };
    AuthService.prototype.getActiveUser = function () {
        return __WEBPACK_IMPORTED_MODULE_0_firebase__["auth"]().currentUser;
    };
    return AuthService;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Recipe; });
var Recipe = (function () {
    function Recipe(title, description, difficulty, ingredients) {
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.ingredients = ingredients;
    }
    return Recipe;
}());

//# sourceMappingURL=recipe.js.map

/***/ }),

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ingredient; });
var Ingredient = (function () {
    function Ingredient(name, amount) {
        this.name = name;
        this.amount = amount;
    }
    return Ingredient;
}());

//# sourceMappingURL=ingredient.js.map

/***/ }),

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_signup_signup__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_signin_signin__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, authService) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.authService = authService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */];
        this.signinPage = __WEBPACK_IMPORTED_MODULE_4__pages_signin_signin__["a" /* SigninPage */];
        this.signupPage = __WEBPACK_IMPORTED_MODULE_3__pages_signup_signup__["a" /* SignupPage */];
        this.isAuth = false;
        __WEBPACK_IMPORTED_MODULE_7_firebase__["initializeApp"]({
            apiKey: "AIzaSyD0Y4Hb0StMzsOWorAscyzR7oYbtKnc8-k",
            authDomain: "ionic-project-abded.firebaseapp.com"
        });
        __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().onAuthStateChanged(function (user) {
            if (user) {
                _this.isAuth = true;
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */];
            }
            else {
                _this.isAuth = false;
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_signin_signin__["a" /* SigninPage */];
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.onLoad = function (page) {
        this.nav.setRoot(page);
        this.menuCtrl.close();
    };
    MyApp.prototype.onLogout = function () {
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_signin_signin__["a" /* SigninPage */]);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_14" /* ViewChild */])('nav'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\app\app.html"*/'<ion-menu [content]="nav">\n\n    <ion-header>\n\n        <ion-toolbar>\n\n            <ion-title>Menu</ion-title>\n\n        </ion-toolbar>\n\n    </ion-header>\n\n\n\n    <ion-content>\n\n        <ion-list>\n\n            <button ion-item icon-left (click)="onLoad(rootPage)" *ngIf="isAuth">\n\n                <ion-icon name="book"></ion-icon>\n\n                Recipe Book</button>\n\n            <button ion-item icon-left (click)="onLoad(signinPage)" *ngIf="!isAuth">\n\n                <ion-icon name="log-in"></ion-icon>\n\n                SignIn</button>\n\n            <button ion-item icon-left (click)="onLoad(signupPage)" *ngIf="!isAuth">\n\n                <ion-icon name="person"></ion-icon>\n\n                SignUp</button>\n\n            <button ion-item icon-left (click)="onLogout()" *ngIf="isAuth">\n\n                    <ion-icon name="log-out"></ion-icon>\n\n                    Log Out</button>\n\n        </ion-list>\n\n    </ion-content>\n\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #nav></ion-nav>\n\n'/*ion-inline-end:"C:\Users\JoabChua\Documents\udemy\Ionic_S6Prac\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_0__services_auth__["a" /* AuthService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_recipe__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RecipesService = (function () {
    function RecipesService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.recipes = [];
    }
    RecipesService.prototype.addRecipes = function (title, description, difficulty, ingredients) {
        this.recipes.push(new __WEBPACK_IMPORTED_MODULE_3__models_recipe__["a" /* Recipe */](title, description, difficulty, ingredients));
        console.log(this.recipes);
    };
    RecipesService.prototype.getRecipes = function () {
        return this.recipes.slice();
    };
    RecipesService.prototype.updateRecipe = function (index, title, description, difficulty, ingredients) {
        this.recipes[index] = new __WEBPACK_IMPORTED_MODULE_3__models_recipe__["a" /* Recipe */](title, description, difficulty, ingredients);
    };
    RecipesService.prototype.removeRecipe = function (index) {
        this.recipes.splice(index, 1);
    };
    RecipesService.prototype.storeList = function (token) {
        var userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic-project-abded.firebaseio.com/' + userId + '/recipe.json?auth='
            + token, this.recipes)
            .map(function (response) { return response.json(); });
    };
    RecipesService.prototype.fetchList = function (token) {
        var _this = this;
        var userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic-project-abded.firebaseio.com/' + userId + '/recipe.json?auth='
            + token)
            .map(function (response) {
            var recipes = response.json() ? response.json() : [];
            for (var _i = 0, recipes_1 = recipes; _i < recipes_1.length; _i++) {
                var item = recipes_1[_i];
                if (!item.hasOwnProperty('ingredients')) {
                    item.ingredients = [];
                }
            }
            return recipes;
        })
            .do(function (recipes) {
            if (recipes) {
                _this.recipes = recipes;
            }
            else {
                _this.recipes = [];
            }
        });
    };
    ;
    return RecipesService;
}());
RecipesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_0__auth__["a" /* AuthService */]])
], RecipesService);

//# sourceMappingURL=recipes.js.map

/***/ })

},[340]);
//# sourceMappingURL=main.js.map