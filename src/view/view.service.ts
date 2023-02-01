import { Injectable } from '@nestjs/common';
import { CreateViewInput } from './dto/create-view.input';
import { UpdateViewInput } from './dto/update-view.input';

@Injectable()
export class ViewService {
  create(createViewInput: CreateViewInput) {
    return 'This action adds a new view';
  }

  findAll() {
    return `This action returns all view`;
  }

  findOne(id: number) {
    return `This action returns a #${id} view`;
  }

  update(id: number, updateViewInput: UpdateViewInput) {
    return `This action updates a #${id} view`;
  }

  remove(id: number) {
    return `This action removes a #${id} view`;
  }
}
