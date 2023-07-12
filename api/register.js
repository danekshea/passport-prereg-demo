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


  export default async (req, res) => {
    try {
      // Extract the token from the Authorization header
      const authHeader = req.headers.authorization || '';
      const token = authHeader.split(' ')[1];
  
      if (!token) {
        res.status(401).json({ success: false, message: 'Authorization header is missing or not in the correct format.' });
        return;
      }
  
      // Verify the token
      jwt.verify(token, async (request, decodedToken, callback) => {
        const secret = await getSecret(request, decodedToken, callback);
        callback(null, secret);
      }, (error, payloadVerify) => {
        if (error) {
          console.error(`JWT verification failed: ${error}`);
          res.status(500).json({ success: false, message: 'JWT verification failed.' });
          return;
        }
  
        console.log(`JWT received: ${payloadVerify}`);
        console.log(`Adding email to Mailchimp list: ${payloadVerify.email}`);
        addMemberToList(payloadVerify.email)
          .then(() => {
            res.status(200).json({ success: true, message: 'Email has been successfully added to the list.' });
          })
          .catch((error) => {
            console.error(`An error occurred while adding the contact to the audience list: ${error}`);
            res.status(500).json({ success: false, message: 'An error occurred while adding the contact to the audience list.' });
          });
      });
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
  
  
