import express from "express";
import passport from "passport";
import objection from "objection";
import { User } from "../../../models/index.js";
import usersIngredientsRouter from "./usersIngredientsRouter.js";

const { ValidationError } = objection

const usersRouter = new express.Router();

usersRouter.use("/ingredients", usersIngredientsRouter)

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(422).json({ errors: error });
  }
});

export default usersRouter;
