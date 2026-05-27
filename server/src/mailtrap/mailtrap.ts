// const { MailtrapClient } = require("mailtrap");
import { MailtrapClient } from "mailtrap";


export const client = new MailtrapClient({
    token: process.env.MAILTRAP_API_TOKEN as string,
});

export const sender = {
    email: "hello@demomailtrap.co",
    name: "Restaurant Website with MERN",
};

const recipients = [
    {
        email: "sakharwsejal@gmail.com",
    }
];


client.send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
}).then(console.log, console.error);



