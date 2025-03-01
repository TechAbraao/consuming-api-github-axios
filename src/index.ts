import express, { Request, Response } from 'express';
import path from "path";
import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


async function searchGithub(userName: string): Promise<any> {
    const URL: string = `https://api.github.com/users/${userName}`;
    try {
        const res: AxiosResponse = await axios.get(URL);
        const user_name: string = res.data["login"];
        const avatar_image: string = res.data["avatar_url"];
        const followers_count: number = res.data["followers"];
        const following_count: number = res.data["following"];
        const data = {
            "username": user_name,
            "avatar_image": avatar_image,
            "followers": followers_count,
            "following": following_count,
        };
        return data;
    } catch (err) {
        console.log(`Erro na resposta da requisição: ${err}`);
        return null;
    } finally {
        console.log("Requisição finalizada");
    }
}

async function retunInfoGithub(username: string): Promise<any> {
    const data = await searchGithub(username);
    console.log(data);
    return data;
}

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/user", async (req: Request, res: Response): Promise<void> => {
    const username: string = req.body.username;
    const data = await retunInfoGithub(username);
    if (data) {
        res.send(`
            <img src="${data.avatar_image}" alt="Avatar">
            <h1>Nome: ${data.username}</h1>
            <h1>Seguidores: ${data.followers}</h1>
            <h1>Seguindo: ${data.following}</h1>
        `);
    } else {
        res.send("Usuário não encontrado ou erro na requisição.");
    }
});

function htmlInformationsProfile(req: Request, res: Response): void {
    const filePath: string = path.resolve(__dirname, "html/user_informations.html");
    res.status(200).sendFile(filePath);
}

app.get("/", htmlInformationsProfile);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, (): void => {
    console.log("Servidor iniciou na porta: " + PORT);
});
