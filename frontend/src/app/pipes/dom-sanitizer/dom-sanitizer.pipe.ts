import { Pipe, PipeTransform } from '@angular/core';
import {
    DomSanitizer,
    SafeHtml,
    SafeResourceUrl,
    SafeScript,
    SafeStyle,
    SafeUrl,
} from '@angular/platform-browser';
import { isNeverCheck } from '../../helpers/is-never-check';

type DomSanitizerInputType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl';

@Pipe({ name: 'carDomSanitizer' })
export class DomSanitizerPipe implements PipeTransform {
    constructor(private _domSanitizer: DomSanitizer) {}

    transform(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any,
        type: DomSanitizerInputType,
    ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html':
                return this._domSanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this._domSanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this._domSanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this._domSanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this._domSanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                isNeverCheck(type);
        }
    }
}
