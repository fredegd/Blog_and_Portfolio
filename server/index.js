// const express = require('express');
import express from 'express';  
// const path = require('path');
import path from 'path';
// const fs = require("fs"); 
import fs from 'fs';
// const { getPostById } = require('./stub/posts');
import  getPostById  from './stub/posts.js';

const app = express();
const PORT = process.env.PORT || 3000;
// Get the directory name of the current module using import.meta.url
const currentDir = path.dirname(new URL(import.meta.url).pathname);

// Build the full path to the index.html file
const indexPath = path.resolve(currentDir, '..', 'dist', 'index.html');

// static resources should just be served as they are
app.use(express.static(path.resolve(currentDir, '..', 'dist'), { maxAge: '30d' }));




app.get("/*", (req, res, next) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }
    // get post info
    const postId = req.query.id;
    const post = getPostById(postId);
    if (!post) return res.status(404).send("Post not found");

    // inject meta tags
    htmlData = htmlData
      .replace("<title>React App</title>", `<title>${post.title}</title>`)
      .replace("__META_OG_TITLE__", post.title)
      .replace("__META_OG_DESCRIPTION__", post.description)
      .replace("__META_DESCRIPTION__", post.description)
      .replace("__META_OG_IMAGE__", post.thumbnail);
      console.log(htmlData)
    return res.send(htmlData);
  });
});

app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
