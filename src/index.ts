import express, {Application, Request, Response} from "express";
import dbInit from "./db/init";

const app: Application = express();

const port = 3000;

app.use(express.json());

app.get("/", async (req: Request, res: Response) : Promise<Response> => {
    return res.status(200).send({
        "ok": true
    });
})

app.listen(port, () => {
    console.log("Servidor rodando");
})