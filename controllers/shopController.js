import ShopItems from "../models/Shop.js"

export async function getItems(req, res, next) {

    try {
        const item = await ShopItems.find({})
        res.status(200).send({ item })
    } catch (err) {
        next(err);
    }

}

export async function getSingleItem(req, res, next) {
    console.log(req);
    const { itemName } = req.body

    try {
        const item = await ShopItems.find({ itemName })
        res.status(200).send({ item })
    } catch (err) {
        next(err);
    }

}