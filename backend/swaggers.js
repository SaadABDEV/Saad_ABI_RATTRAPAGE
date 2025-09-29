export const openapi = {
  openapi: "3.0.0",
  info: { title: "API HETIC", version: "1.0.0" },
  servers: [{ url: "http://localhost:4000/api" }],
  paths: {
    "/auth/login": {
      post: {
        summary: "Login admin",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" }
                },
                required: ["email", "password"]
              }
            }
          }
        },
        responses: {
          "200": { description: "OK (JWT + user)" },
          "400": { description: "Missing email/password" },
          "401": { description: "Invalid credentials" }
        }
      }
    },

    "/formations": {
      get: {
        summary: "Liste publique",
        responses: { "200": { description: "OK" } }
      }
    },

    "/formations/{slug}": {
      get: {
        summary: "Détail public",
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "OK" }, "404": { description: "Not found" } }
      }
    },

    "/admin/formations": {
      get: {
        summary: "Liste admin",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "OK" }, "401": { description: "Unauthorized" } }
      }
    },

    "/admin/formations/{id}/publish": {
      patch: {
        summary: "Publier",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "200": { description: "OK" }, "404": { description: "Not found" } }
      }
    },

    "/admin/formations/{id}/unpublish": {
      patch: {
        summary: "Dépublier",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "200": { description: "OK" }, "404": { description: "Not found" } }
      }
    }
  },
  components: {
    securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } }
  }
};