import { verify } from "hono/jwt";
import { Payload } from "../sharedTypes";
import { Context } from "hono";


interface ErrorResponse {
    authenticated: false;
    error: string;
}

export default async function getAuthToken(c: Context<any, any, {}>): Promise<Payload | ErrorResponse> {
    // Get the Authorization header
    const authHeader = c.req.header('Authorization');

    // Check if the header is present and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { authenticated: false, error: 'Missing token' }
    }

    // Extract the token by removing the 'Bearer ' prefix
    const token = authHeader.substring(7);

    const secretKey = import.meta.env.VITE_JWT_TOKEN_SECRET;

    try {
        // Verify the token and return the decoded payload
        const decodedPayload = await verify(token, secretKey) as Payload;
        return decodedPayload;
    } catch (error) {
        return { authenticated: false, error: 'Invalid token' }
    }
}
