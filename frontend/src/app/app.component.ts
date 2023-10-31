import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Platforms } from '@ionic/core';
import { PlatformFacadeService } from './tabs/platform/platform-facade/platform-facade.service';

@Component({
    selector: 'yac-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
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
