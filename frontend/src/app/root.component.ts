import { Component, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { Platforms } from '@ionic/core';
import { PlatformFacadeService } from './tabs/platform/platform-facade/platform-facade.service';

@Component({
    standalone: true,
    imports: [IonicModule],
    selector: 'yac-root',
    templateUrl: 'root.component.html',
    styleUrls: ['root.component.scss'],
})
export class RootComponent implements OnInit {
    constructor(
        private _platform: Platform,
        private _platformFacadeService: PlatformFacadeService,
    ) {}

    ngOnInit(): void {
        const currentPlatforms = this._platform.platforms() as Platforms[];
        this._platformFacadeService.setPlatform(currentPlatforms);
    }
}
