import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'camelToSnakeCase', standalone: true })
export class CamelToSnakeCasePipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/[A-Z]/g, (letter: string, index: number) =>
            index === 0 ? letter.toLowerCase() : '_' + letter.toLowerCase(),
        );
    }
}
