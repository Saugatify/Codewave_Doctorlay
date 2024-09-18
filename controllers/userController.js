import nodemailer from "nodemailer";
import cron from "node-cron";
import Userdata from '../models/Userdata.js';

// @desc    Create new userdata
// @route   POST /api/userdata
export const createUserdata = async (req, res) => {
  try {
    // Create the userdata in the database
    const userdata = await Userdata.create(req.body);

    // Extract the reminder time, medication, email, and name from the user data
    const { reminders, email, name } = userdata;

    // Log the entire userdata for debugging
    console.log('Userdata created:', userdata);

    // Store the email address in a variable
    const recipientEmail = email;

    // Create an Ethereal test account
    let testAccount = await nodemailer.createTestAccount();

    // Set up nodemailer transporter with Ethereal credentials
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: "lora.kautzer@ethereal.email", // Use the generated testAccount user
        pass: "g2tmVAWzbupWDSDcJU", // Use the generated testAccount password
      }
    });

    reminders.forEach(({ time, medication }) => {
      const [hour, minute] = time.split(':');

      // Schedule the email reminder
      cron.schedule(`${minute} ${hour} * * *`, () => {
        const mailOptions = {
          from: testAccount.user, // Sender email from test account
          to: "saugatghimire2003@gmail.com", // Dynamic email from user data
          subject: `Medication Reminder: ${medication}`,
          text: `Hello,\n\nThis is a reminder to take your medication: ${medication}.\n\nPlease don't forget to take it at the specified time.\n\nBest regards,\nHealthcare Team`,
        };

        // Send the email reminder
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending reminder email:', error);
          } else {
            console.log(`Reminder email sent to ${recipientEmail} for ${medication} at ${time}`);
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
          }
        });
      });

      console.log(`Scheduled email reminder for ${name} at ${time} for medication: ${medication}`);
    });

    res.status(201).json({ userdata, message: 'User data created and email reminders scheduled' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all userdata
// @route   GET /api/userdata
export const getAllUserdata = async (req, res) => {
  try {
    const userdata = await Userdata.find();
    res.status(200).json(userdata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get single userdata
// @route   GET /api/userdata/:id
export const getUserdata = async (req, res) => {
  try {
    const userdata = await Userdata.findById(req.params.id);
    if (!userdata) {
      return res.status(404).json({ message: 'Userdata not found' });
    }
    res.status(200).json(userdata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update userdata
// @route   PUT /api/userdata/:id
export const updateUserdata = async (req, res) => {
  try {
    const userdata = await Userdata.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!userdata) {
      return res.status(404).json({ message: 'Userdata not found' });
    }
    res.status(200).json(userdata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete userdata
// @route   DELETE /api/userdata/:id
export const deleteUserdata = async (req, res) => {
  try {
    const userdata = await Userdata.findByIdAndDelete(req.params.id);
    if (!userdata) {
      return res.status(404).json({ message: 'Userdata not found' });
    }
    res.status(200).json({ message: 'Userdata deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
