import http from 'k6/http';
import {sleep} from 'k6';
import { Trend } from 'k6/metrics';

export const urls = [
    //Home
    'https://staging.cnnbrasil.com.br',
    //Home de money
    'https://staging.cnnbrasil.com.br/money/',
    //Single
    'https://staging.cnnbrasil.com.br/ciencia-da-virada/cerro-porteno-x-palmeiras-horario-e-onde-assistir-ao-jogo-da-libertadores/',
    //Autor
    'https://staging.cnnbrasil.com.br/autor/leonardo-martins/',
    //Autor com paginiacão
    'https://staging.cnnbrasil.com.br/autor/leonardo-martins/pagina/2/',
    //Listagem: Tudo sobre - TAG
    'https://staging.cnnbrasil.com.br/tudo-sobre/auto/',
    //Listagem: Editoria (categoria)
    'https://staging.cnnbrasil.com.br/esportes/ultimas-noticias/',
    //Home de Esportes
    'https://staging.cnnbrasil.com.br/esportes/',
    //Jogo Ao Vivo
    'https://staging.cnnbrasil.com.br/esportes/lances-ao-vivo/libertadores-da-america-2025/06-05-2025/alianza-lima-x-sao-paulo/',
    //PAGINA DE AO VIVO
    'https://staging.cnnbrasil.com.br/ao-vivo/'
];

const urlTrend = new Trend('url_response_time', true); // true = com tags

export default function () {
  for (const url of urls) {
    const bypass = Math.random() < 0.25;
    const res = http.get(url, {
        headers: bypass ? {'Cookie': 'vip-go-cb=1'} : {},
        tags: {
            name: 'load-test',
            cache: bypass ? 'false' : 'true',
        },
    });
    // tag aqui só na métrica customizada, não nas métricas padrão
    urlTrend.add(res.timings.duration, {
        url: url,
        cache: bypass ? 'false' : 'true'
    });

    sleep(10);
  }
}

