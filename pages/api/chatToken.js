// import { videoToken, sendTokenResponse } from '../../../helpers/twilioTokens'
import config from '../../helpers/twilioConfig'
import twilio from "twilio"
const AccessToken = twilio.jwt.AccessToken;
const { ChatGrant } = AccessToken;

const generateToken = () => {
  return new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret
  );
};

const chatToken = (identity) => {
  const chatGrant = new ChatGrant({
    serviceSid: config.twilio.chatService
  });
  const token = generateToken();
  token.addGrant(chatGrant);
  token.identity = identity;
  return token
}

const videoToken = (identity, room) => {
  console.log(identity)
  let videoGrant;
  if (typeof room !== "undefined") {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken();
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

export default (req, res) => {
  const identity = req.body.identity;
  const token = chatToken(identity);
  console.log(token)
  res.status(200).send(JSON.stringify(token.toJwt()))
}
