import "dotenv/config";
import express from "express";
import router from "./routes";
import { errorHandler } from "./middlewares";

const app = express();
const PORT = process.env.PORT!;

app.use(express.json());

app.use("/", router);
app.get("/", (req, res) => {
    res.status(200).json({
        message : "Server is up and running."
    });
});

app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});