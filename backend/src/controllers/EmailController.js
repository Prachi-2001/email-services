const EmailService = require("../services/EmailService");
const emailService = new EmailService();

exports.sendEmail = async (req, res) => {
  const { to, subject, body } = req.body;
  const result = await emailService.sendEmail({ to, subject, body });
  res.status(200).json(result);
};
