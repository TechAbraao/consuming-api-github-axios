import axios, { AxiosResponse } from "axios";

async function searchGithub(userName: string): Promise<void> {
    const _userName: string = userName
    const URL: string = `https://api.github.com/users/${_userName}`;
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
