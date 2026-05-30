import { Request, Response } from "express";
import { Multer } from "multer";
import { Restaurant } from "../models/restaurant.model";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/order.model";

export const createRestaurant = async (req: Request, res: Response) => {
    try {

        const { restaurantName, city, country, deliveryTime, cuisines } = req.body

        const file = req.file;

        const restaurant = await Restaurant.findOne({ user: req.id as any })

        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            })
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        }

        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

        // console.log(cuisines);
        // console.log(typeof cuisines);

        await Restaurant.create({
            user: req.id as any,
            restaurantName: restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: cuisines,
            imageUrl,
        });


        return res.status(201).json({
            success: true,
            message: "Restaurant Added"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })

    }
}


export const getRestaurant = async (req: Request, res: Response) => {

    try {

        const restaurant = await Restaurant.findOne({ user: req.id as any }).populate('menus')

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                restaurant: {},
                message: "Restaurant not found"
            })
        }

        return res.status(200).json({
            success: true,
            restaurant
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })

    }
}


export const updateRestaurant = async (req: Request, res: Response) => {

    try {

        const restaurant = await Restaurant.findOne({ user: req.id as any })

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        }

        const { restaurantName, city, country, deliveryTime, cuisines } = req.body

        const file = req.file;

        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = cuisines

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            restaurant.imageUrl = imageUrl
        }

        await restaurant.save()

        return res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })

    }
}


export const getRestaurantOrder = async (req: Request, res: Response) => {

    try {

        const restaurant = await Restaurant.findOne({ user: req.id as any })

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        }

        const orders = await Order.find({ restaurant: restaurant._id as any }).populate("restaurant").populate('user')

        return res.status(200).json({
            success: true,
            orders
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })

    }
}


export const updatedOrderStatus = async (req: Request, res: Response) => {

    try {

        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        order.status = status

        await order.save()

        return res.status(200).json({
            success: true,
            message: "Order Status Updated"
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })

    }
}


export const searchRestaurant = async (req: Request, res: Response) => {

    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery as string || ""

        const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisine => cuisine).map((cuisine) => cuisine.toLowerCase())

        const query: any = {};

        // * basic search based on searchText (name,city,country)

        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
            ]
        }
        // * search based on searchQuery 


        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchQuery, $options: 'i' } },
                { cuisines: { $regex: searchQuery, $options: 'i' } }, // * single cuisines
            ]
        }


        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines }
        }

        const restaurants = await Restaurant.find(query)
        return res.status(200).json({
            success: true,
            data: restaurants
        })


    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}




export const getSingleRestaurant = async (req: Request, res: Response) => {

    try {

        const restaurantId = req.params.id;

        const restaurant = await Restaurant.findById(restaurantId).populate({
            path: "menus",
            options: { created: -1 }
        });

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        }

        return res.status(200).json({
            success: true,
            restaurant
        })
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}
































































