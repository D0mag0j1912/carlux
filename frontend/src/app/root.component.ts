import { Component, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Platforms } from '@ionic/core';
import { PlatformFacadeService } from './tabs/platform/platform-facade/platform-facade.service';

@Component({
    selector: 'yac-root',
    templateUrl: 'root.component.html',
    styleUrls: ['root.component.scss'],
})
export class RootComponent implements OnInit {
    private _platform = inject(Platform);
    private _platformFacadeService = inject(PlatformFacadeService);

    ngOnInit(): void {
        const currentPlatforms = this._platform.platforms() as Platforms[];
        this._platformFacadeService.setPlatform(currentPlatforms);
    }
}
