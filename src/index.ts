import express from "express";
import axios, { AxiosResponse } from "axios";
import dotenv from 'dotenv'

dotenv.config();
const app =  express();
app.use(express.json());

async function searchGithub(userName: string): Promise<void> {
    const _userName: string = userName
    const URL: string = `https://api.github.com/users/${_userName}/repos`;
    axios
    .get(`${URL}`)
    .then((res: AxiosResponse) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(`Erro na resposta da requisição: ${err}`);
    })
    .finally(() => {
            console.log("Requisição finalizada")
    })
}

searchGithub("TechAbraao")


const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, (): void => {
    console.log("Servidor iniciou na porta: " + PORT);
})
