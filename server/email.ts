import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function sendLeadNotification(
  email: string,
  productInterest?: string
): Promise<void> {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    console.warn(
      "Email credentials not configured. Skipping email notification."
    );
    return;
  }

  const productText = productInterest || "Not specified";
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "syamsundarkudumala661@gmail.com",
    subject: "New Waitlist Signup - EV 11thOne",
    html: `
      <h2>New Waitlist Signup!</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Product Interest:</strong> ${productText}</p>
      <p><strong>Signup Time:</strong> ${new Date().toLocaleString()}</p>
      <p>Thank you for the interest in EV 11thOne!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent for: ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
