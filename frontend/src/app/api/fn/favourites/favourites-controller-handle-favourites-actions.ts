/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequestBuilder } from '../../request-builder';
import { StrictHttpResponse } from '../../strict-http-response';

import { GeneralResponseDto } from '../../models/general-response-dto';

export interface FavouritesControllerHandleFavouritesActions$Params {
    carId: number;
    method: string;
}

export function favouritesControllerHandleFavouritesActions(
    http: HttpClient,
    rootUrl: string,
    params: FavouritesControllerHandleFavouritesActions$Params,
    context?: HttpContext,
): Observable<StrictHttpResponse<GeneralResponseDto>> {
    const rb = new RequestBuilder(rootUrl, favouritesControllerHandleFavouritesActions.PATH, 'put');
    if (params) {
        rb.path('carId', params.carId, {});
        rb.query('method', params.method, {});
    }

    return http
        .request(rb.build({ responseType: 'json', accept: 'application/json', context }))
        .pipe(
            filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<GeneralResponseDto>;
            }),
        );
}

favouritesControllerHandleFavouritesActions.PATH = '/api/favourites/{carId}';
