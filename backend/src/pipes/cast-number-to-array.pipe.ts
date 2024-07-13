import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CastNumberToArrayPipe implements PipeTransform {
    transform(data: number | number[]): number[] {
        if (Array.isArray(data)) {
            return data;
        }
        return [data];
    }
}
