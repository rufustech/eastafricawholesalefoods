import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create reusable transporter for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Validate message length
    if (body.message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 },
      );
    }

    // Verify environment variables are set
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Gmail credentials not configured");
      return NextResponse.json(
        { error: "Email service is not properly configured" },
        { status: 500 },
      );
    }

    // Send email to business
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to:
        process.env.CONTACT_EMAIL_RECIPIENT ||
        "info@eastafricawholesalefoods.com",
      replyTo: body.email,
      subject: `New Contact Form Submission: ${body.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>This message was sent from the contact form at eastafricawholesalefoods.com</small></p>
      `,
      text: `New Contact Form Submission\n\nName: ${body.name}\nEmail: ${body.email}\nSubject: ${body.subject}\n\nMessage:\n${body.message}`,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: body.email,
      subject: "We received your message - East Africa Wholesale Foods",
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Hi ${body.name},</p>
        <p>We've received your message and will get back to you as soon as possible, usually within 24 hours.</p>
        <p><strong>Your message details:</strong></p>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p>Best regards,<br>East Africa Wholesale Foods Team</p>
      `,
      text: `Thank you for contacting us!\n\nWe've received your message and will get back to you as soon as possible.\n\nSubject: ${body.subject}\n\nBest regards,\nEast Africa Wholesale Foods Team`,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! We've received your message and will respond shortly.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
