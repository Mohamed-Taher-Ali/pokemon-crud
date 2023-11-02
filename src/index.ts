import { startup } from "./startup";
import express from "express";

const app = express();
startup(app);
