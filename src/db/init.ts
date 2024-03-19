import Category from "../models/Categories";
const isDev = process.env.NODE_ENV === "development";

const dbInit = () => {
    Category.sync({
        alter: isDev
    })
}

export default dbInit