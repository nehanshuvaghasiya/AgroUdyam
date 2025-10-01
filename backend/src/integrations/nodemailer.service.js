const nodemailer = require('nodemailer');
const path = require('path');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  welcome: {
    subject: 'Welcome to AgroUdyam!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2e7d32;">Welcome to AgroUdyam!</h2>
        <p>Hello {{name}},</p>
        <p>Welcome to AgroUdyam! We're excited to have you join our community of farmers and customers.</p>
        <p>You can now:</p>
        <ul>
          <li>Browse fresh produce from local farmers</li>
          <li>Place orders and have them delivered to your doorstep</li>
          <li>Connect directly with farmers</li>
          <li>Leave reviews and ratings</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Best regards,<br>The AgroUdyam Team</p>
      </div>
    `
  },
  order_confirmation: {
    subject: 'Order Confirmation - AgroUdyam',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2e7d32;">Order Confirmed!</h2>
        <p>Hello {{customerName}},</p>
        <p>Your order has been confirmed and is being processed.</p>
        <p><strong>Order Number:</strong> {{orderNumber}}</p>
        <p><strong>Total Amount:</strong> ₹{{totalAmount}}</p>
        <p>We'll notify you when your order is shipped.</p>
        <p>Thank you for choosing AgroUdyam!</p>
        <p>Best regards,<br>The AgroUdyam Team</p>
      </div>
    `
  },
  order_shipped: {
    subject: 'Your Order Has Been Shipped - AgroUdyam',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2e7d32;">Your Order Has Been Shipped!</h2>
        <p>Hello {{customerName}},</p>
        <p>Great news! Your order has been shipped and is on its way to you.</p>
        <p><strong>Order Number:</strong> {{orderNumber}}</p>
        <p><strong>Tracking Number:</strong> {{trackingNumber}}</p>
        <p>Expected delivery: {{expectedDelivery}}</p>
        <p>Thank you for choosing AgroUdyam!</p>
        <p>Best regards,<br>The AgroUdyam Team</p>
      </div>
    `
  },
  order_delivered: {
    subject: 'Order Delivered - AgroUdyam',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2e7d32;">Order Delivered!</h2>
        <p>Hello {{customerName}},</p>
        <p>Your order has been successfully delivered!</p>
        <p><strong>Order Number:</strong> {{orderNumber}}</p>
        <p>We hope you enjoy your fresh produce. Please consider leaving a review to help other customers.</p>
        <p>Thank you for choosing AgroUdyam!</p>
        <p>Best regards,<br>The AgroUdyam Team</p>
      </div>
    `
  },
  password_reset: {
    subject: 'Password Reset Request - AgroUdyam',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2e7d32;">Password Reset Request</h2>
        <p>Hello {{name}},</p>
        <p>You requested a password reset for your AgroUdyam account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="{{resetLink}}" style="background-color: #2e7d32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The AgroUdyam Team</p>
      </div>
    `
  },
  staff_invitation: {
    subject: 'Invitation to Join Farm - AgroUdyam',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2e7d32;">Farm Invitation</h2>
        <p>Hello,</p>
        <p>You have been invited to join <strong>{{farmName}}</strong> on AgroUdyam as a {{role}}.</p>
        <p>{{message}}</p>
        <p>Click the link below to accept the invitation:</p>
        <a href="{{invitationLink}}" style="background-color: #2e7d32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Accept Invitation</a>
        <p>Best regards,<br>The AgroUdyam Team</p>
      </div>
    `
  },
  payout_approved: {
    subject: 'Payout Approved - AgroUdyam',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2e7d32;">Payout Approved!</h2>
        <p>Hello {{farmerName}},</p>
        <p>Your payout request has been approved!</p>
        <p><strong>Amount:</strong> ₹{{amount}}</p>
        <p><strong>Request ID:</strong> {{requestId}}</p>
        <p>The amount will be transferred to your registered bank account within 2-3 business days.</p>
        <p>Thank you for being part of AgroUdyam!</p>
        <p>Best regards,<br>The AgroUdyam Team</p>
      </div>
    `
  },
  payout_rejected: {
    subject: 'Payout Request Update - AgroUdyam',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">Payout Request Update</h2>
        <p>Hello {{farmerName}},</p>
        <p>Your payout request has been rejected.</p>
        <p><strong>Request ID:</strong> {{requestId}}</p>
        <p><strong>Reason:</strong> {{reason}}</p>
        <p>Please contact support if you have any questions.</p>
        <p>Best regards,<br>The AgroUdyam Team</p>
      </div>
    `
  }
};

// Send email
const sendEmail = async ({ to, subject, template, data = {}, html, attachments = [] }) => {
  try {
    const transporter = createTransporter();

    let emailSubject = subject;
    let emailHtml = html;

    // Use template if provided
    if (template && emailTemplates[template]) {
      emailSubject = emailTemplates[template].subject;
      emailHtml = emailTemplates[template].html;

      // Replace template variables
      Object.keys(data).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        emailSubject = emailSubject.replace(regex, data[key]);
        emailHtml = emailHtml.replace(regex, data[key]);
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject: emailSubject,
      html: emailHtml,
      attachments
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

// Send bulk email
const sendBulkEmail = async (emails) => {
  try {
    const transporter = createTransporter();
    const results = [];

    for (const email of emails) {
      try {
        const result = await sendEmail(email);
        results.push({ success: true, email: email.to, result });
      } catch (error) {
        results.push({ success: false, email: email.to, error: error.message });
      }
    }

    return results;
  } catch (error) {
    throw new Error(`Bulk email sending failed: ${error.message}`);
  }
};

// Verify email configuration
const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration verification failed:', error);
    return false;
  }
};

module.exports = {
  sendEmail,
  sendBulkEmail,
  verifyEmailConfig,
  emailTemplates
};
