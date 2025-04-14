import { Key } from "react";

export interface User {
  id: Key | null | undefined;
  username: string;
  email: string;
  password: string;
}
