import { verify } from "hono/jwt";
import { Payload } from "../sharedTypes";
import { Context } from "hono";

export default async function getAuthToken(c: Context<any, any, {}>): Promise<Payload> {
    // Get the Authorization header
    const authHeader = c.req.header('Authorization');

    // Check if the header is present and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Invalid or missing token');
    }

    // Extract the token by removing the 'Bearer ' prefix
    const token = authHeader.substring(7);

    const secretKey = import.meta.env.VITE_JWT_TOKEN_SECRET;

    try {
        // Verify the token and return the decoded payload
        const decodedPayload = await verify(token, secretKey) as Payload;
        return decodedPayload;
    } catch (error) {
        throw new Error('Unauthorized: Invalid token');
    }
}
