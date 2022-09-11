import { Cards } from "@prisma/client";

export type CreateCardData = Omit<Cards, "id" | "userId">