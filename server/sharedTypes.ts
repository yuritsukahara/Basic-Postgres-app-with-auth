import {
    insertUsersSchema,
    insertGroupsSchema,
} from "./db/schemas"

export const createUsersSchema = insertUsersSchema.omit({ id: true })
export const createGroupsSchema = insertGroupsSchema.omit({ id: true })

export type Payload = {
    user: string,
    groups: string[],
    authenticated: boolean,
    exp: number,
}