import * as jwt from 'jsonwebtoken'
import { DEFAULT_KEY } from '@/utils/default-key'

/**
    * Creates an access token using the provided payload.
    *
    * @param {Object} payload - The payload to be included in the token.
    * @returns {Promise<string>} - The generated JWT token.
*/

const createAccessToken = (payload: any) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, 
            DEFAULT_KEY,  
            {
                expiresIn: "30d"
            }, (err, token) => {
                if(err) reject(err);
                resolve(token);
            }
        )
    })


}

export default createAccessToken