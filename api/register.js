import { addMemberToList } from "./_mailchimp.js";
import axios from 'axios';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';


const getJWKS = async () => {
    const response = await axios.get("https://auth.immutable.com/.well-known/jwks.json");
    return response.data;
};

const getSecret = async () => {
    const jwks = await getJWKS();
    const jwk = jwks.keys[0];
    const pem = jwkToPem(jwk);
    return pem;
};

export default async (req, res) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Authorization header is missing or not in the correct format.' });
        }

        const secret = await getSecret();

        jwt.verify(token, secret, async (err, payloadVerify) => {
            if (err) {
                console.log(`JWT verification failed: ${err}`);
                return res.status(500).json({ success: false, message: 'JWT verification failed.' });
            }

            console.log(`JWT received: ${JSON.stringify(payloadVerify, null, 2)}`);
            console.log(`Adding email to Mailchimp list: ${payloadVerify.email}`);

            try {
                await addMemberToList(payloadVerify.email);
                res.status(200).json({ success: true, message: 'Email has been successfully added to the list.' });
            } catch (error) {
                console.log(`An error occurred while adding the contact to the audience list: ${error}`);
                res.status(500).json({ success: false, message: 'An error occurred while adding the contact to the audience list. dane' });
            }
        });

    } catch (err) {
        console.log(err);
        const errorMessage = err.response && err.response.text ? JSON.parse(err.response.text).title : err.message;
        const errorStatus = err.status || 500;
        
        res.status(errorStatus).json({ success: false, message: errorMessage });
    }
};
