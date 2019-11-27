const config = require("./src/server/config");
const app = require("./src/server/server");
require("./src/server/database/database");

const PORT = process.env.PORT || config.PORT;

app.listen(PORT, () => {
  console.log("Server is listening...");
});
