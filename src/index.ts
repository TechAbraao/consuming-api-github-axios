import express, { Request, Response } from 'express';
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/process", (req: Request, res: Response): void => {
    const username: string = req.body.username;
    console.log(username);

    res.send(`<h1>${username}</h1>`);
})

function htmlInformationsProfile(req: Request, res: Response): void {
    const filePath: string = path.resolve(__dirname, "html/user_informations.html");
    res.status(200).sendFile(filePath);
}
app.get("/", htmlInformationsProfile);


const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, (): void => {
    console.log("Servidor iniciou na porta: " + PORT);
});
