import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers/index';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        IonicModule,
        AuthRoutingModule,
        StoreModule.forFeature('auth', fromAuth.reducers),
    ],
    exports: [],
})
export class AuthModule {}
