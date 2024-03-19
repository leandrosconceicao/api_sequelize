import {DataTypes, Model, Optional } from "sequelize";
import sequelizeCon from "../db/config";

interface CategoryAttributes {
    id: number,
    nome: string
    storeCode: string,
    ordenacao: number,
    image: string,
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface CategoryInput extends Optional<CategoryAttributes, 'id' | 'image' | 'nome' | 'storeCode'> {};
export interface CategoryOutput extends Required<CategoryAttributes>{};

class Category extends Model<CategoryAttributes, CategoryInput> implements CategoryAttributes {
    public id!: number
    public nome!: string
    public storeCode!: string;
    public ordenacao!: number;
    public image!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Category.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storeCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ordenacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    }
}, {
    timestamps: true,
    sequelize: sequelizeCon,
    paranoid: true
})

export default Category;