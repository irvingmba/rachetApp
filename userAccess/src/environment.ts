const nodeVariables ={
  development: {
    AUTH_SCHEMA: "./src/schema.graphql",
    DEVELOPMENT_MODE: true,
  },
  production: {
    AUTH_SCHEMA: "./build/schema.graphql",
    DEVELOPMENT_MODE: false,
  }
}

export default nodeVariables;