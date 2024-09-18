import { db } from "./server/db";
import { groups, usersToGroups } from "./server/db/schemas";
import { users } from "./server/db/schemas/users";
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

// run just once after initializing postgress and first migration

const adminHashPass = await bcrypt.hash('admin', 10)

const adminUserResult = await db.insert(users).values({
    user: 'admin',
    fullName: 'Admin Souza',
    email: 'admin@admin.com',
    password: adminHashPass,
}).returning();

const basicHashPass = await bcrypt.hash('basic', 10)

const basicUserResult = await db.insert(users).values({
    user: 'basico',
    fullName: 'Basico Souza',
    email: 'basico@basico.com',
    password: basicHashPass,
}).returning();

await db.insert(groups).values([
    {
        name: 'ADMIN',
    }, {
        name: 'BASIC'
    }]);

const basicGroupId = await db.select().from(groups).where(eq(groups.name, 'BASIC'));
const adminGroupId = await db.select().from(groups).where(eq(groups.name, 'ADMIN'));

await db.insert(usersToGroups).values({
    userId: adminUserResult[0].id,
    groupId: adminGroupId[0].id,
});


await db.insert(usersToGroups).values({
    userId: basicUserResult[0].id,
    groupId: basicGroupId[0].id,
});

console.log('Done!')

