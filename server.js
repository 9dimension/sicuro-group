const app = require("./app");
const dbConnect = require("./src/db/connect");

dbConnect()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () =>
      console.log(`App is listening on the port ${PORT}...`)
    );
  })
  .catch((err) => {
    console.log("Error while connecting to database ..", err);
  });
