import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hola from the backend server" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
