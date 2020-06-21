import mongoose from "mongoose";
import {
    mongodbConnectionURL
} from "./vars";
import logger from "./logger";

mongoose.Promise = Promise;

mongoose.connect(mongodbConnectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        logger.info(`mongodb connected`);
    },
).catch(err => {
    logger.info(`MongoDB connection error. Please make sure MongoDB is running ${err}`);
    // process.exit();
});
