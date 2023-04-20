const TelegramBot = require('node-telegram-bot-api');
const math = require('mathjs');

exports.myFunction = (req, res) => {
  // Create a new bot instance using your bot token
  const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false });

  if(!req.body.message) {
    console.log('no message');
    res.status(200).send('ok but no message');
    return;
  }

  // Get the message text from the request body
  const messageText = req.body.message.text;

  let result = 'no result';
  try {
    result = math.evaluate(messageText); 
  }
  catch (err) {
    result = `Invalid query: ${err}`;
  }

  // Send a message back to the user
  bot.sendMessage(req.body.message.chat.id, JSON.stringify(result, null, 2));

  // Send a response back to the client
  res.status(200).send('Message sent!');
};
