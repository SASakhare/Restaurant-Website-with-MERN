// const { MailtrapClient } = require("mailtrap");
import { MailtrapClient } from "mailtrap";


export const client = new MailtrapClient({
    token: process.env.MAILTRAP_API_TOKEN as string,
});

export const sender = {
    email: "hello@demomailtrap.co",
    name: "Restaurant Website with MERN",
};

