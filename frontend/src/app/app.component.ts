import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Platforms } from '@ionic/core';
import { PlatformService } from './services/platform.service';

@Component({
    selector: 'yac-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private _platform: Platform, private _platformService: PlatformService) {}

    ngOnInit(): void {
        const currentPlatforms = this._platform.platforms();
        this._platformService.emitPlatform(currentPlatforms as Platforms[]);
    }
}
