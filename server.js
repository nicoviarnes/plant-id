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

//Connect to Mongo
//Mongo Atlas
//Gmail: project.plant.id@gmail.com : projectplantid
//Atlas: USER:	project.plant.id@gmail.com
//PASS: project3!
// "mongoURI": "mongodb+srv://project_3:123@cluster0-zndk3.mongodb.net/test?retryWrites=true",
//Blake sucks
mongoose
	.connect(process.env.MONGODB_URI || db, {
		useNewUrlParser: true,
		useCreateIndex: true
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

//Port
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on Port ${port}`));
