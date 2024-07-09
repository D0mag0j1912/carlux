import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from '../models/pagination.dto';

export const PaginationDocs = <T extends Type<unknown>>(model: T) =>
    applyDecorators(
        ApiExtraModels(PaginationDto),
        ApiOkResponse({
            status: 200,
            schema: {
                title: `PaginationDocs`,
                allOf: [
                    { $ref: getSchemaPath(PaginationDto) },
                    {
                        properties: {
                            page: {
                                type: 'number',
                            },
                            perPage: {
                                type: 'number',
                            },
                            count: {
                                type: 'number',
                            },
                            results: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        }),
    );
