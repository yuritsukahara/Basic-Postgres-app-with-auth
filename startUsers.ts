import { db } from "./server/db";
import { groups, usersToGroups } from "./server/db/schemas";
import { users } from "./server/db/schemas/users";
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

// run just once after initializing postgress and first migration

const adminHashPass = await bcrypt.hash('admin', 10)

const adminUserResult = await db
    .insert(users)
    .values({
        user: 'admin',
        fullName: 'Admin Souza',
        email: 'admin@admin.com',
        password: adminHashPass,
    })
    .returning()
    .then(res => res[0]);;

const basicHashPass = await bcrypt.hash('basic', 10)

const basicUserResult = await db
    .insert(users)
    .values({
        user: 'basic',
        fullName: 'Basico Souza',
        email: 'basico@basico.com',
        password: basicHashPass,
    })
    .returning()
    .then(res => res[0]);;

await db
    .insert(groups)
    .values([
        {
            name: 'ADMIN',
        }, {
            name: 'BASIC'
        }]);

const basicGroupId = await db
    .select()
    .from(groups)
    .where(eq(groups.name, 'BASIC'))
    .then(res => res[0]);

const adminGroupId = await db
    .select()
    .from(groups)
    .where(eq(groups.name, 'ADMIN'))
    .then(res => res[0]);

await db.insert(usersToGroups).values({
    userId: adminUserResult.id,
    groupId: adminGroupId.id,
});

await db.insert(usersToGroups).values({
    userId: basicUserResult.id,
    groupId: basicGroupId.id,
});

console.log('Done!')

