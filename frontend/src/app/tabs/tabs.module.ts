import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsRoutingModule } from './tabs-routing.module';

import { TabsComponent } from './tabs.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    imports: [IonicModule, CommonModule, FormsModule, TabsRoutingModule, TranslocoModule],
    declarations: [TabsComponent],
})
export class TabsModule {}
