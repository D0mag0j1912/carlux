import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './auth-reducers/auth.reducers';
import { TranslocoModule } from '@ngneat/transloco';
import { DomSanitizerModule } from '../../pipes/dom-sanitizer/dom-sanitizer.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatureKeys } from '../../constants/feature-keys';

const PIPES = [DomSanitizerModule];

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        TranslocoModule,
        AuthRoutingModule,
        StoreModule.forFeature(FeatureKeys.AUTH, fromAuth.authReducers),
        ...PIPES,
    ],
    exports: [],
})
export class AuthModule {}
