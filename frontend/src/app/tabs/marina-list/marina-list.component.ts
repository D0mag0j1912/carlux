import { Component, OnInit, inject } from '@angular/core';
import { filter, take } from 'rxjs';
import { PreferencesFacadeService } from '../preferences/preferences-facade.service';
import { AuthenticationFacadeService } from '../auth/auth-facade.service';

@Component({
    standalone: true,
    selector: 'yac-marina-list',
    templateUrl: './marina-list.component.html',
    styleUrls: ['./marina-list.component.scss'],
})
export class MarinaListComponent implements OnInit {
    private _preferencesFacadeService = inject(PreferencesFacadeService);
    private _authenticationFacadeService = inject(AuthenticationFacadeService);

    ngOnInit(): void {
        this._authenticationFacadeService
            .selectUserId()
            .pipe(take(2), filter(Boolean))
            .subscribe((userId: number) => {
                this._preferencesFacadeService.getPreferences(userId);
            });
    }
}
