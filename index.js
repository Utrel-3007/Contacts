const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const setupContactRoutes = require("./app/routers/contact.routes");
const { BadRequestError } = require("./app/helpers/errors");
const app = express();

app.use(cors({origin: config.app.origins}));

app.use(express.json());

app.use(express.urlencoded({extended: true}));
setupContactRoutes(app);
    
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."});
});

const PORT = config.app.port;

app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}.`);
});

app.use((req, res, next) => {
    next(new BadRequestError(404, "Resource not found"));
});

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Inrenal Server Error",
    });
});

const db = require("./app/models");
db.mongoose.connect(config.db.url)
    .then(() => {
        console.log("Connected to the database!!");
    })
    .catch((error) => {
        console.log("Can't connect to the database!!", error);
        process.exit();
    });

