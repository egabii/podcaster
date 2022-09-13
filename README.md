# Proyecto: Podcaster

## Requerimientos (bien resumido):

* Obtener una lista de los 100 top podcasts de itunes
* Obtener de cada podcast una lista de episodios
* Reproducir episodios de un podcast

## Stack de tecnologia

La applicacion web es una SPA (o Single Page Application), la cual esta siendo desarrollada usando el siguiente stack

* [Vitejs](https://vitejs.dev/) para montar el proyecto
* [Reactjs 18](https://reactjs.org/), biblioteca principal para la interfaz de usuario
* [React-query](https://react-query-v3.tanstack.com/) para manejar las peticiones de los servicios
* [React router v6](https://reactrouter.com/en/main) para el manejod de las rutas en la UI
* [Chakra UI](https://chakra-ui.com/) framework con un set de componentes listo para el desarrollo

### Vercel api routes como API 

Al realizar el analisis de los requerimientos y notar que debemos utilizar varios servicios de dominio publico, encontrandome con el inconveniente de que las respuestas contenian informacion adicional que no hacian al objetivo del proyecto. Me dispuse a investigar como manipular el resultado de dichos servicios a traves de una API Rest. En adicion a esto, los episodios se encuentran en un feed de rss, cuyo formato de respues es **XML**, llevando a ser costosa la manipulacion de dicho tipo de documento en la UI.

Al documento XML lo puedo manipular con un paquete de npm [fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser) siendo este el mas adecuado a la necesidad.

Llegando a una version rapida en desarrollo con vercel api routes. 
* [Vercel development](https://vercel.com/docs/concepts/functions/serverless-functions)
* [Vercel cli](https://vercel.com/docs/cli)

*Disclaimer: A pesar de la ventaja de poder consumir una sola API, condiciona el uso de Vercel como proveedor*

## Correr en modo:development

Instalar dependencias.

`npm install`

Para correr API + UI: 

`npm run dev:vercel`

Para correr la UI

`npm run dev`



