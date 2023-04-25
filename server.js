const app = require("./app");
const { PORT } = require("./config");
require("colors");

app.listen(PORT, function () {
    console.log(`Started on http://localhost:${PORT}`.cyan);
});
