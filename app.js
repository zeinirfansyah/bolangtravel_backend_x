const express = require("express");
const router = require("./src/routes/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router);
app.listen(3000, () => console.log("Server is running on port 3000"));