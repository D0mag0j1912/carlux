import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Preferences')
@Controller('api/preferences')
export class PreferencesController {}
