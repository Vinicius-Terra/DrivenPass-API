import { Credentials } from "@prisma/client";

export type CreateCredentialData = Omit<Credentials, "id" | "userId">