import { onRequest as __api_helloworld_js_onRequest } from "/Users/xeodev/Sites/pastor-nuxt/functions/api/helloworld.js"

export const routes = [
    {
      routePath: "/api/helloworld",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_helloworld_js_onRequest],
    },
  ]