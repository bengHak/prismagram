import dotenv from "dotenv";
import path from "path";
// console.log(__dirname);
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = (email) => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const client = nodemailer.createTransport(mgTransport(options));
  return client
    .sendMail(email)
    .then(() => {
      console.log("Message sent!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "bh@prismagram.com",
    to: address,
    subject: "Login Secret for Prismagram 🔐",
    html: `<h1>Hello! Your login secret is \"${secret}\".</h1> <br/>Copy paste on the app/website to log in.`,
  };
  return sendMail(email);
};
