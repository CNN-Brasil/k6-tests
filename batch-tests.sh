#!/bin/bash

# Lista de URLs
URLS=(
    'https://staging.cnnbrasil.com.br/ciencia-da-virada/cerro-porteno-x-palmeiras-horario-e-onde-assistir-ao-jogo-da-libertadores/'
    'https://staging.cnnbrasil.com.br/autor/leonardo-martins/'
    'https://staging.cnnbrasil.com.br/autor/leonardo-martins/pagina/2/'
    'https://staging.cnnbrasil.com.br/tudo-sobre/auto/'
    'https://staging.cnnbrasil.com.br/esportes/ultimas-noticias/'
    'https://staging.cnnbrasil.com.br/esportes/'
    'https://staging.cnnbrasil.com.br/esportes/lances-ao-vivo/libertadores-da-america-2025/06-05-2025/alianza-lima-x-sao-paulo/'
    'https://staging.cnnbrasil.com.br/ao-vivo/'
)

# Loop pelas URLs
for url in "${URLS[@]}"; do
    # Extrai parte da URL para usar como nome de arquivo
    safe_name=$(echo "$url" | sed 's|https://staging.cnnbrasil.com.br/||; s|/|_|g; s|[^a-zA-Z0-9_-]||g')
    
    # Define nome do arquivo de saída
    report_name="html-report-${safe_name}.html"
    
    echo "Executando teste para: $url"
    echo "Relatório: $report_name"
    
    # Executa o comando
    sudo K6_WEB_DASHBOARD=true \
         K6_WEB_DASHBOARD_EXPORT="$report_name" \
         TARGET_URL="$url" \
         k6 run ./test-by-url.js --duration=300s --vus=10000
done
