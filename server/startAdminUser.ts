import { db } from "./db";
import { groups, usersToGroups } from "./db/schemas";
import { users } from "./db/schemas/users";
import bcrypt from 'bcrypt';

// run just once after initializing postgress and first migration

const hashPass = await bcrypt.hash('admin', 10)

await db.insert(users).values({
    user: 'admin',
    fullName: 'Admin Souza',
    email: 'admin@admin.com',
    password: hashPass,
});

await db.insert(groups).values([
    {
        name: 'ADMIN',
    }, {
        name: 'BASIC'
    }]);


async function selectUsers(withUserName: boolean) {
    return db
        .select({
            id: users.id,
            ...(withUserName ? { user: users.user } : {}),
        })
        .from(users);
}


async function selectAdminGroupId(withGroupName: boolean) {
    return db
        .select({
            id: groups.id,
            ...(withGroupName ? { group: groups.name } : {}), // Updated to use `groups.group` assuming it's the correct column name
        })
        .from(groups);
}

const adminUsers = await selectUsers(true);
const adminGroups = await selectAdminGroupId(true);

// Extract IDs 
const adminUserId = adminUsers.length > 0 ? adminUsers[0].id : undefined;
const adminGroupId = adminGroups.length > 0 ? adminGroups[0].id : undefined;


if (adminUserId && adminGroupId) {
    await db.insert(usersToGroups).values({
        userId: adminUserId,
        groupId: adminGroupId,
    });
} else {
    console.error('Admin user or group not found');
}
