import Server from "./server";

const port = process.env.PORT || 3400;

(async () => {
  Server()
    .then(({ app }) => {
      app.listen(port, () => {

      })
    })
})();
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
