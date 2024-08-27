import { insertAplicationsSchema } from "./db/schemas"

export const createAplicationSchema = insertAplicationsSchema.omit({ id: true })
