import express, {Application, Request, Response} from "express";
import Category from "./models/Categories";

const app: Application = express();

const port = 3000;

app.use(express.json());

app.get("/", async (req: Request, res: Response) : Promise<Response> => {
    const data = await  Category.findAll({});
    console.log(data);
    return res.status(200).send({
        "ok": true
    });
})

app.listen(port, () => {
    console.log("Servidor rodando");
})