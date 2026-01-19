import { Router } from "express";

import { createRestaurantWithAdmin, superAdminLogin } 
from "../controllers/superAdminController.js";

import superAdminAuth from "../middleware/superAdminAuth.js";

const router = Router();

router.post("/login", superAdminLogin);

router.post(
  "/create-restaurant",
  superAdminAuth,
  createRestaurantWithAdmin
);

export default router;
