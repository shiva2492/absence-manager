import express from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "../../config/swagger";
import userRoute from "./user.route";
import absenceRoute from "./absence.route";
import adminRoute from "./admin.route";



const router = express.Router();

/**
 * GET v1/health
 */

router.get("/health", (req, res) => res.status(200).send("OK"));
/**
 * GET v1/docs
 */
router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

router.use("/users", userRoute);

router.use("/absence", absenceRoute);

router.use("/admin", adminRoute);


export default router;
