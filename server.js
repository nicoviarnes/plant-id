const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
// const cors = require("cors");
//const routes = require("./routes");

const app = express();
// app.use(cors());
//Express Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//DB Mongo Atlas Config
const db = config.get("mongoURI");

mongoose
	.connect(process.env.MONGODB_URI || db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => console.log("Connected to Mongo"))
	.catch(err => console.log(err));

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/garden", require("./routes/api/garden"));
app.use("/api/plant", require("./routes/api/plant"));
app.use("/api/addplant", require("./routes/api/addplant"));
app.use("/api/addnote", require("./routes/api/addnote"));
app.use("/api/notes", require("./routes/api/notes"));
app.use("/api/notes/remove", require("./routes/api/deletenote"));
app.use("/api/removeplant", require("./routes/api/removeplant"));
app.use("/api/waterplant", require("./routes/api/waterplant"));

//Port
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on Port ${port}`));
