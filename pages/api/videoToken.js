// import { videoToken, sendTokenResponse } from '../../../helpers/twilioTokens'
import config from '../../helpers/twilioConfig'
import twilio from "twilio"
const AccessToken = twilio.jwt.AccessToken;
const { ChatGrant, VideoGrant, VoiceGrant } = AccessToken;

const generateToken = () => {
  return new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret
  );
};

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
  console.log(req)
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room);
  res.status(200).send(JSON.stringify(token.toJwt()))
}
