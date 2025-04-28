import app from "./index";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connect } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5666;

const server = app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Listening to port ${PORT}...`);
  } catch (err) {
    console.error("Error:", err);
  }
});
