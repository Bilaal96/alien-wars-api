import express from "express";


import { getItems } from "../controllers/shopController.js";

const router = express.Router();

router.get("/", getItems);
//get items -- loads up shop items (name, stat boost, cost)


router.use((err, req, res, next) => {
    if (err) {
        console.error(`${err.name} - ${err.message}`);
        return res.status(403).json({ err });
    }
});

export default router;
