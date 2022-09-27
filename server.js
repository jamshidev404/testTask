const express = require("express");

const app = express();

//middleware
app.use(express.json());

app.use("/api/user", require("./routes/userRoute.js"));

//connecting
const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
