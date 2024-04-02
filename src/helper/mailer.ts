import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // generating hashed token using bcrypt js 
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // checking email type 
    if (emailType === "VERIFY") {
      // saving hashedToken to db for email verification
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenEpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      // saving hashedToken to db for reseting password
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // creating transporter using nodemailer and mailtrap
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4cf36067e8c073", //❌❌🙅‍♀️
        pass: "b1eca7e9ae0e67", //❌❌🙅‍♀️
      },
    });

    // generating an server link
    const link = `${process.env.DOMAIN}/${
      emailType == "VERIFY" ? "verifyemail" : "forgotpassword"
    }?token=${hashedToken}`;

    // making vetification email html
    const verifyEmailHTML = `
    <p>
    <a href='${link}'>
    Click here to verify email
    </a>
    verify your email token=${hashedToken}
    </p>
    `;

    // making reset pass html 
    const forgotPassHTML = `
    <p>
    <a href='${link}'>
    Click here to forgot pass
    </a>
    forgot your password token=${hashedToken}
    </P>
    `;
    console.log(emailType)


    // creating email options 
    const mailOptions = {
      from: "manish@manish.ai",
      to: email,
      subject:
        emailType == "VERIFY" ? "Verify your email " : "Reset your password",
      html: emailType == "VERIFY" ? verifyEmailHTML : forgotPassHTML,
    };

    // finally sending mail
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
