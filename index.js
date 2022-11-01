const express = require("express");
const path = require("path");
const exhbs = require("express-handlebars");
const tasks = require("./Tasks");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", exhbs.engine({
	partialsDir: __dirname + "/views/partials"
}));
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
	res.render("home", {
		title: "Home Page",
		tasks,
	});
});

app.use(express.static(path.join(__dirname, "/public")));

app.use("/api/tasks", require("./routes/api/tasks"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
