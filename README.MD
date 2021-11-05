# Pollution Level
Questa web.app serve per vedere l'inquinamento dell'aria delle grandi cittá. E le coordinate della tua posizione.

Ho realizzato questa web.app utilizando l'API di https://aqicn.org/map/world/. Per provarlo dovreste prima richiedere la vostra API Key https://aqicn.org/data-platform/token/#/ e seguire i passi che vengono indicati. Dopodiché sostituirlo al TOKEN.

Questa app l'ho realizzata con il framework Tailwind.css, lavorando direttamente con le sue classi, nell'index.html.



### Instalazione:

Dopo aver clonato il ripositorio bisogna installare i moduli di Node con:

```
npm install
```

Dopodiché bisogna installare le varie dependencies:

````
npm i -D css-loader css-minimizer-webpack-plugin dotenv-webpack file-loader html-loader html-webpack-plugin mini-css-extract-plugin style-loader script-loader terser-webpack-plugin webpack webpack-cli webpack-dev-server axios dotenv
````
Quando finisce di installare tutte le dependencies puoi provare la app con:

````
npm run start
````

Potete provare l'app in questo link https://pollutionlevel.netlify.app
