import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [RegistrationComponent],
    imports: [CommonModule, IonicModule],
    exports: [],
})
export class AuthModule {}
