import app, { init } from "./app";

const port = process.env.PORT || 4000;

init()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}.`);
    });
  })
  .catch((error) => {
    console.error("Falha ao inicializar o servidor:", error);
    process.exit(1);
  });
