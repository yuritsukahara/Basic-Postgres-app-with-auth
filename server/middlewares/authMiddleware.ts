import { createMiddleware } from 'hono/factory';
import getAuthToken from '../lib/getAuthToken';

export const isUser = (requiredGroups?: string[]) => {
    return createMiddleware(async (c, next) => {
        try {
            const payload = await getAuthToken(c);

            console.log('payload', payload);

            const userGroups = payload.groups || [];

            // Check if requiredGroups is an array and has elements
            if (Array.isArray(requiredGroups) && requiredGroups.length > 0) {
                // Check if the user belongs to at least one of the required groups
                const hasRequiredGroup = requiredGroups.some(group => userGroups.includes(group));

                if (!hasRequiredGroup) {
                    return c.json({ error: 'Forbidden: You do not belong to the required group(s).' }, 403);
                }
            }

            await next();

        } catch (error) {
            return c.json({ error: (error as Error).message }, 401);
        }
    });
};
