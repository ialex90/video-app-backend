import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Role } from './interfaces/role.interface';
import { CreateRoleDTO } from './dto/create-role.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';

@Injectable()
export class RolesService {

    constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) { }

    async getById(id: string): Promise<Role> {
        return await this.roleModel.findById(id).exec();
    }

    async getByName(name: string): Promise<Role> {
        return await this.roleModel.findOne({ name }).exec();
    }

    async getAll(): Promise<Role[]> {
        return await this.roleModel.find().exec();
    }

    async create(dto: CreateRoleDTO): Promise<Role> {
        const role = new this.roleModel(dto);
        return await role.save();
    }

    async update(id: string, dto: UpdateRoleDTO): Promise<Role> {
        return await this.roleModel.findByIdAndUpdate(id , { ...dto }).exec();
    }

    async delete(id: string): Promise<Role> {
        return await this.roleModel.findByIdAndRemove(id).exec();
    }
}
