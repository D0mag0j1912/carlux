import { Component } from '@angular/core';
import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    standalone: true,
    imports: [TranslocoModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle],
    selector: 'yac-languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent {}
