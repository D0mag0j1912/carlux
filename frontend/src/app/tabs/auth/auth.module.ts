import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, IonicModule],
    exports: [],
})
export class AuthModule {}
