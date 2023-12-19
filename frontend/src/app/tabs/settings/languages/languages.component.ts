import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    standalone: true,
    imports: [CommonModule, IonicModule, TranslocoModule],
    selector: 'yac-languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent {}
