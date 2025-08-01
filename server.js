require("dotenv").config();
const express = require("express");
const connectToDB = require("./src/db/db");
const noteModel = require("./src/models/note.model");

const app = express();
app.use(express.json());

//Create note
app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  console.log(req.body);

  const note = await noteModel.create({
    title,
    content,
  });

  res.json({
    message: "Note created successfully",
    note,
  });
});

//Fetch all the notes
app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.json({
    message: "Notes fetched successfullly",
    notes,
  });
});

//Update note
app.patch("/notes/:index", async (req, res) => {
  const noteId = req.params.index;
  const { title } = req.body;

  const note = await noteModel.findOneAndUpdate(
    {
      _id: noteId,
    },
    {
      title: title,
    }
  );

  res.json({
    message: "Note updated successfully",
    note,
  });
});

//Delete note
app.delete("/notes/:index", async (req, res) => {
  const noteId = req.params.index;

  const note = await noteModel.findOneAndDelete({
    _id: noteId,
  });

  res.json({
    message: "Note delted successfully",
    note,
  });
});

connectToDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
