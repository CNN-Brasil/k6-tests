import http from 'k6/http';
import {sleep} from 'k6';

export default function () {
    const bypass = Math.random() < 0.25;

    http.get(__ENV.TARGET_URL, {
        headers: bypass ? {'Cookie': 'vip-go-cb=1'} : {},
        tags: {
            vus: String(__VU),
            cache: bypass ? 'false' : 'true',
        },
    });

    sleep(10);
}

