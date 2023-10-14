import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, IonicModule, AuthRoutingModule],
    exports: [],
})
export class AuthModule {}
