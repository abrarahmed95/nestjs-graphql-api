import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class UpdateWorkspaceDto extends PickType(CreateWorkspaceDto, [
  'name',
] as const) {}
