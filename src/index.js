const express = require("express");
const cors=require("cors")
const dbConnect = require("../src/config/db");
const playerRoute=require("./Routes/playerinfo")


require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/register",playerRoute)





app.get("/", (req, res) => {
  res.send("Word GAME");
});

app.listen(PORT, async () => {
  await dbConnect()
  console.log(`server started at http://localhost:${PORT}`);
});
