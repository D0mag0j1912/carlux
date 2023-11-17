import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './auth-reducers/auth.reducers';
import { TranslocoModule } from '@ngneat/transloco';
import { DomSanitizerModule } from '../../pipes/dom-sanitizer/dom-sanitizer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureKeys } from '../../constants/feature-keys';
import { AuthEffects } from './auth-effects/auth.effects';

const PIPES = [DomSanitizerModule];

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        TranslocoModule,
        AuthRoutingModule,
        StoreModule.forFeature(FeatureKeys.AUTH, fromAuth.authReducers),
        EffectsModule.forFeature(AuthEffects),
        ...PIPES,
    ],
    exports: [],
})
export class AuthModule {}
