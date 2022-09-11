import { WiFi } from "@prisma/client";

export type CreateWifiData = Omit<WiFi, "id" | "userId">