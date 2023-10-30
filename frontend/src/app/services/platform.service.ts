import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platforms } from '@ionic/core';

@Injectable({ providedIn: 'root' })
export class PlatformService {
    private _platform$ = new BehaviorSubject<Platforms[]>([]);

    emitPlatform(platform: Platforms[]): void {
        this._platform$.next(platform);
    }

    get platform$(): Observable<Platforms[]> {
        return this._platform$.asObservable();
    }
}
