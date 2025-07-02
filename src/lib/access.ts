import type { User } from "@/payload-types";
import { ClientUser } from "payload";


export const isSuperAdmin = (user: User | ClientUser | null) => {
  console.log("this user has the role :", user?.roles?.includes("super-admin"))
  return Boolean(user?.roles?.includes("super-admin"))
} 
