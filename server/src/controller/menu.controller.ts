import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";


export const addMenu = async (req: Request, res: Response) => {

    try {

        const { name, description, price } = req.body;

        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        };

        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File)

        const menu = await Menu.create({
            name,
            description,
            price,
            image: imageUrl
        });

        const restaurant = await Restaurant.findOne({ user: req.id as any })

        if (restaurant) {
            (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id as any);
            await restaurant.save()
        }

        // return res.status
        return res.status(201).json({
            success: true,
            message: "Menu added successfully",
            menu,
        })

    } catch (error) {

        //(error);
        return res.status(500).json({
            message: "Internal server error"
        })

    }
}


export const updateMenu = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const { name, description, price } = req.body;

        const file = req.file;

        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: " Menu is not found"
            })
        };

        if (name) menu.name = name;
        if (description) menu.description = description;
        if (price) menu.price = price;


        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File)
            menu.image = imageUrl;
        };

        await menu.save();

        // return res.status
        return res.status(200).json({
            success: true,
            message: "Menu Updated successfully",
            menu,
        })

    } catch (error) {

        //(error);
        return res.status(500).json({
            message: "Internal server error"
        })

    }
}


export const deleteMenu = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;


        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: " Menu is not found"
            })
        }

        const restaurant = await Restaurant.findOne({ user: req.id as any })

        if (restaurant) {
            restaurant.menus = restaurant.menus.filter(
                (menuId) => menuId.toString() != id
            );
            await restaurant.save()
        }

        await menu.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Menu Deleted successfully",
            menu,
        })

    } catch (error) {

        //(error);
        return res.status(500).json({
            message: "Internal server error"
        })

    }
}


























