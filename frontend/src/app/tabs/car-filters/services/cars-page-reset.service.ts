import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarsPageResetService {
    private _resetPage$ = new Subject<void>();

    getPageResetEvent(): Observable<void> {
        return this._resetPage$.asObservable();
    }

    emitPageReset(): void {
        this._resetPage$.next();
    }
}
