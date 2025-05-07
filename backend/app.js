const express = require('express');
const routes = require('./routes/routes.js');
const passport = require("./config/passportConfig");
const cors = require('cors');
require('./config/passportConfig.js');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // if you use cookies or need credentials
  }));
app.use(passport.initialize());

app.use("/user", routes.user);
app.use("/post", routes.post);
app.use("/comment", routes.comment);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});