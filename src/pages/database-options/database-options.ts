import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';


@Component({
    selector:'page-sl-options',
    templateUrl: 'database.html'
})

export class DatabaseOptionsPage {
    constructor(private vc:ViewController) {

    }

    onAction(action: string) {
        this.vc.dismiss({action: action});
    }
}