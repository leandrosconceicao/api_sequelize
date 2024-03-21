import {Op} from "sequelize";
import {z} from "zod";
import {Request, Response, NextFunction} from "express";

import Category from "../../models/Categories";
import { CategoryOutput, CategoryInput } from "../../models/Categories";
import { GetAllCategoryFilters } from "../../models/types";

export default class CategoryController {
    static async findOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = z.number().min(1).parse(req.params.id);
            const category = await Category.findByPk(id);
            if (!category) {
                throw new Error("not found");
            }
            return res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = z.instanceof(Category).parse(req.body);
            const category = await Category.create(payload);
            return res.status(201).json(category);
        } catch (e) {
            next(e);
        }
    }
    
    static async update(id: number, payload: Partial<Category>) : Promise<Category> {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error("not found");
        }
        const updatedValue = await category.update(payload)
        return updatedValue;
    }
    
    static async deleteById(id: number) {
        const value = await Category.destroy({
            where: {id}
        });
        return !!value;
    }
    
    findAll(filters?: GetAllCategoryFilters) : Promise<CategoryOutput[]> {
        return Category.findAll({
            where: {
                ...(filters?.isDeleted && {deletedAt: {[Op.not]: undefined}})
            },
            ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
        });
    }
}
