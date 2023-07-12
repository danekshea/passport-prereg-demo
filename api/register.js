import { addMemberToList } from "./_mailchimp.js";
import axios from 'axios';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';


// Your other functions (getJWKS, getSecret) would also go in this file
const getJWKS = async () => {
    try {
      const response = await axios.get("https://auth.immutable.com/.well-known/jwks.json?_gl=1*1g7a0qs*_ga*NDg1NTg3MDI3LjE2ODU1OTY1Mzg.*_ga_4JBHZ7F06X*MTY4ODUyNjkyNy4xNC4wLjE2ODg1MjY5MjcuMC4wLjA.*_ga_7XM4Y7T8YC*MTY4ODUyNjkyNy4yNy4wLjE2ODg1MjY5MjcuMC4wLjA.");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  const getSecret = async (request, token, callback) => {
    const jwks = await getJWKS();
    const jwk = jwks.keys[0];
    const pem = jwkToPem(jwk);
    callback(null, pem);
  }


module.exports = async (req, res) => {
  try {
    // You may need to modify the verification to work directly with jwt instead of Fastify's plugin
    const payloadVerify = jwt.verify(req.body.token, getSecret);

    console.log(`JWT received: ${payloadVerify}`);
    console.log(`Adding email to Mailchimp list: ${payloadVerify.email}`);
    await addMemberToList(payloadVerify.email);

    res.status(200).json({ success: true, message: 'Email has been successfully added to the list.' });

  } catch (err) {
    console.log(err);
    let errorMessage = err.message;
    let errorStatus = err.status || 500;

    if (err.response && err.response.text) {
      const parsedErrorText = JSON.parse(err.response.text);
      errorMessage = parsedErrorText.title;
      errorStatus = err.response.status;
    }

    res.status(errorStatus).json({ success: false, message: errorMessage });
  }
};
