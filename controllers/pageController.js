const Post = require('../models/Post');
const User = require('../models/User');

exports.getIndexPage = async (req, res) => {
  const page_name = 'index';

  const userID = req.session.userID;

  const posts = await Post.find();

  console.log(userID);

  res.render('index', {
    posts,
    page_name,
  });
};

exports.getUserPage = async (req, res) => {
  const page_name = 'user';

  const userID = req.session.userID;

  const user = await User.findById({ _id: userID }).populate('posts');

  const posts = await Post.find();

  res.render('user', {
    posts,
    user,
    page_name,
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
  
  <h1>Message Details</h1>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Message</h1> 
  <p>${req.body.message}</p>
  `;
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user:  "havvaarslann@gmail.com", // gmail account
        pass: "serkxxxcfdteffoarhanxx", // gmail password',
      },
    });
// send mail with defined transport object
let info = await transporter.sendMail({
  from: '"Freelancer Contact Form" <havvaarslann@gmail.com>', // sender address
  to: "eminmertpolatli@gmail.com", // list of receivers
  subject: "Freelancer Contact Form New Message ✔", // Subject line
  html: outputMessage, // html body
});
    

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash('success', 'We received your message succesfully');
    res.status(200).redirect('contact');
  } catch (err) {
    req.flash('error', 'Something went wrong');
    res.status(200).redirect('contact');
  }
};
