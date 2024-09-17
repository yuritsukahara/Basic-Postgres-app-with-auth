import { insertUsersSchema } from "./db/schemas"

export const createUsersSchema = insertUsersSchema.omit({ id: true })
