export const verificationEmailTemplate = (verificationToken: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RoyalMasala Email Verification</title>

        <style>
            body{
                margin:0;
                padding:0;
                background:#0f172a;
                font-family:Arial, Helvetica, sans-serif;
            }

            .container{
                max-width:600px;
                margin:40px auto;
                background:#111827;
                border-radius:20px;
                overflow:hidden;
                border:1px solid #1f2937;
            }

            .header{
                background:linear-gradient(135deg, #f97316, #ea580c);
                padding:35px;
                text-align:center;
            }

            .header h1{
                color:white;
                margin:0;
                font-size:32px;
                letter-spacing:1px;
            }

            .content{
                padding:40px 30px;
                text-align:center;
                color:#e5e7eb;
            }

            .content h2{
                color:white;
                font-size:28px;
                margin-bottom:10px;
            }

            .content p{
                color:#cbd5e1;
                font-size:16px;
                line-height:1.7;
            }

            .code-box{
                margin:35px auto;
                background:#1e293b;
                border:2px dashed #f97316;
                width:fit-content;
                padding:18px 35px;
                border-radius:14px;
            }

            .code{
                font-size:34px;
                font-weight:bold;
                letter-spacing:6px;
                color:#f97316;
            }

            .footer{
                padding:20px;
                text-align:center;
                color:#94a3b8;
                font-size:13px;
                border-top:1px solid #1f2937;
            }
        </style>
    </head>

    <body>
        <div class="container">

            <div class="header">
                <h1>RoyalMasala</h1>
            </div>

            <div class="content">
                <h2>Verify Your Email</h2>

                <p>
                    Welcome to RoyalMasala! Please use the verification code below
                    to activate your account and start exploring delicious meals.
                </p>

                <div class="code-box">
                    <div class="code">${verificationToken}</div>
                </div>

                <p>
                    If you did not create this account, you can safely ignore this email.
                </p>
            </div>

            <div class="footer">
                © 2026 RoyalMasala. All rights reserved.
            </div>

        </div>
    </body>
    </html>
    `;
};


export const generateWelcomeEmailHtml = (name: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body{
                background:#0f172a;
                margin:0;
                padding:20px;
                font-family:Arial, Helvetica, sans-serif;
            }

            .container{
                max-width:600px;
                margin:auto;
                background:#111827;
                border-radius:20px;
                overflow:hidden;
                border:1px solid #1f2937;
            }

            .header{
                background:linear-gradient(135deg,#22c55e,#16a34a);
                padding:35px;
                text-align:center;
            }

            .header h1{
                color:white;
                margin:0;
                font-size:30px;
            }

            .content{
                padding:40px 30px;
                color:#e5e7eb;
            }

            .content h2{
                color:white;
            }

            .content p{
                line-height:1.8;
                color:#cbd5e1;
            }

            .button{
                display:inline-block;
                margin-top:25px;
                background:#f97316;
                color:white !important;
                padding:14px 28px;
                text-decoration:none;
                border-radius:10px;
                font-weight:bold;
            }

            .footer{
                border-top:1px solid #1f2937;
                padding:20px;
                text-align:center;
                color:#94a3b8;
                font-size:13px;
            }
        </style>
    </head>

    <body>
        <div class="container">

            <div class="header">
                <h1>Welcome to RoyalMasala 🍛</h1>
            </div>

            <div class="content">
                <h2>Hello ${name},</h2>

                <p>
                    Your email has been successfully verified.
                    We’re excited to have you join the RoyalMasala family.
                </p>

                <p>
                    Explore premium dishes, fast delivery,
                    and unforgettable flavors crafted specially for you.
                </p>

                <a href="#" class="button">
                    Explore Menu
                </a>
            </div>

            <div class="footer">
                © 2026 RoyalMasala. All rights reserved.
            </div>

        </div>
    </body>
    </html>
    `;
};

export const generatePasswordResetEmailHtml = (resetURL: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body{
                background:#0f172a;
                margin:0;
                padding:20px;
                font-family:Arial, Helvetica, sans-serif;
            }

            .container{
                max-width:600px;
                margin:auto;
                background:#111827;
                border-radius:20px;
                overflow:hidden;
                border:1px solid #1f2937;
            }

            .header{
                background:linear-gradient(135deg,#ef4444,#dc2626);
                padding:35px;
                text-align:center;
            }

            .header h1{
                color:white;
                margin:0;
            }

            .content{
                padding:40px 30px;
                color:#e5e7eb;
            }

            .content p{
                line-height:1.8;
                color:#cbd5e1;
            }

            .button{
                display:inline-block;
                margin-top:25px;
                background:#f97316;
                color:white !important;
                padding:14px 28px;
                text-decoration:none;
                border-radius:10px;
                font-weight:bold;
            }

            .footer{
                border-top:1px solid #1f2937;
                padding:20px;
                text-align:center;
                color:#94a3b8;
                font-size:13px;
            }
        </style>
    </head>

    <body>
        <div class="container">

            <div class="header">
                <h1>Reset Your Password</h1>
            </div>

            <div class="content">
                <p>
                    We received a request to reset your RoyalMasala account password.
                </p>

                <p>
                    Click the button below to securely reset your password.
                </p>

                <a href="${resetURL}" class="button">
                    Reset Password
                </a>

                <p>
                    If you didn’t request this, please ignore this email.
                </p>
            </div>

            <div class="footer">
                © 2026 RoyalMasala. All rights reserved.
            </div>

        </div>
    </body>
    </html>
    `;
};

export const generateResetSuccessEmailHtml = () => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body{
                background:#0f172a;
                margin:0;
                padding:20px;
                font-family:Arial, Helvetica, sans-serif;
            }

            .container{
                max-width:600px;
                margin:auto;
                background:#111827;
                border-radius:20px;
                overflow:hidden;
                border:1px solid #1f2937;
            }

            .header{
                background:linear-gradient(135deg,#22c55e,#16a34a);
                padding:35px;
                text-align:center;
            }

            .header h1{
                color:white;
                margin:0;
            }

            .content{
                padding:40px 30px;
                color:#e5e7eb;
            }

            .content p{
                line-height:1.8;
                color:#cbd5e1;
            }

            .success{
                margin:30px 0;
                text-align:center;
                font-size:60px;
            }

            .footer{
                border-top:1px solid #1f2937;
                padding:20px;
                text-align:center;
                color:#94a3b8;
                font-size:13px;
            }
        </style>
    </head>

    <body>
        <div class="container">

            <div class="header">
                <h1>Password Updated</h1>
            </div>

            <div class="content">
                <div class="success">✅</div>

                <p>
                    Your password has been successfully reset.
                </p>

                <p>
                    You can now login securely using your new password.
                </p>

                <p>
                    If you did not perform this action,
                    please contact RoyalMasala support immediately.
                </p>
            </div>

            <div class="footer">
                © 2026 RoyalMasala. All rights reserved.
            </div>

        </div>
    </body>
    </html>
    `;
};