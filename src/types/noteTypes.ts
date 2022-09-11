import { Notes } from "@prisma/client";

export type CreateNoteData = Omit<Notes, "id" | "userId">