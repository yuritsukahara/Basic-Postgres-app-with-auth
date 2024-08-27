import { index, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const aplications = pgTable(
    "aplications",
    {
        id: serial("id").primaryKey(),
        codigo: varchar("codigo").notNull().unique(),
        descricao: varchar("descricao").notNull(),
    },
    (aplications) => {
        return {
            id: index("name_idx").on(aplications.id)
        }
    }
);

// Schema for inserting a user - can be used to validate API requests
export const insertAplicationsSchema = createInsertSchema(aplications, {
    codigo: z.string(),
    descricao: z.string(),
})

// Schema for selecting a user - can be used to validate API responses
export const selectAplicationsSchema = createSelectSchema(aplications)
