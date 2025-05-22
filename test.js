import http from 'k6/http';
import {sleep} from 'k6';

export const urls = [
    //Home
    'https://alpha.cnnbrasil.com.br',
    //Home de money
    'https://alpha.cnnbrasil.com.br/money/',
    //Single
    'https://alpha.cnnbrasil.com.br/ciencia-da-virada/cerro-porteno-x-palmeiras-horario-e-onde-assistir-ao-jogo-da-libertadores/',
    //Autor
    'https://alpha.cnnbrasil.com.br/autor/leonardo-martins/',
    //Autor com paginiacão
    'https://alpha.cnnbrasil.com.br/autor/leonardo-martins/pagina/2/',
    //Listagem: Tudo sobre - TAG
    'https://alpha.cnnbrasil.com.br/tudo-sobre/auto/',
    //Listagem: Editoria (categoria)
    'https://alpha.cnnbrasil.com.br/esportes/ultimas-noticias/',
    //Home de Esportes
    'https://alpha.cnnbrasil.com.br/esportes/',
    //Jogo Ao Vivo
    'https://alpha.cnnbrasil.com.br/esportes/lances-ao-vivo/libertadores-da-america-2025/06-05-2025/alianza-lima-x-sao-paulo/',
    //PAGINA DE AO VIVO
    'https://alpha.cnnbrasil.com.br/ao-vivo/'
];

export default function () {
    for (const url of urls) {
        const bypass = Math.random() < 0.25;

        http.get(url, {
            headers: bypass ? {'Cookie': 'vip-go-cb=1'} : {},
            tags: {
                name: 'load-test',              // tag estática
                cache: bypass ? 'false' : 'true',
            },
        });

        sleep(10);
    }
}
