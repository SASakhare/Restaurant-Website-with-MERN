import { generatePasswordResetEmailHtml, generateWelcomeEmailHtml, verificationEmailTemplate, generateResetSuccessEmailHtml } from './htmlEmail';
import { client, sender } from './mailtrap'


export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const recipient = [
        {
            email: email,
        }
    ];
    const htmlContent = verificationEmailTemplate(verificationToken);

    try {

        const res = await client.send({
            from: sender,
            to: recipient,
            html: htmlContent,
            subject: "Verify your email",
            category: "Email Verification"
        })

    } catch (error) {
        console.log(error);
        throw new Error("Failed to send Email verification.")
    }


}


export const sendWelcomeEmail = async (email: string, name: string) => {
    const recipient = [
        {
            email: email,
        }
    ];

    const htmlContent = generateWelcomeEmailHtml(name);

    try {

        const res = await client.send({
            from: sender,
            to: recipient,
            html: htmlContent,
            subject: "Welcome to RoyalMasala",
            template_variables: {
                company_info_name: "RoyalMasala",
                name: name,
            }
        });

    } catch (error) {
        console.log(error);
        throw new Error("Failed to send Welcome Email")
    }

}




export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
    const recipient = [
        {
            email: email,
        }
    ];

    const htmlContent = generatePasswordResetEmailHtml(resetURL);

    try {

        const res = await client.send({
            from: sender,
            to: recipient,
            html: htmlContent,
            subject: "Reset your Password",
            category: "Reset Password"
        });

    } catch (error) {
        console.log(error);
        throw new Error("Failed to send Reset Password Email")
    }

}


export const sendResetSuccessEmail = async (email: string) => {
    const recipient = [
        {
            email: email,
        }
    ];

    const htmlContent = generateResetSuccessEmailHtml();

    try {

        const res = await client.send({
            from: sender,
            to: recipient,
            html: htmlContent,
            subject: "Password Reset Successfully",
            category: "Reset Password"
        });

    } catch (error) {
        console.log(error);
        throw new Error("Failed to send Password Reset Success Email")
    }

}

















