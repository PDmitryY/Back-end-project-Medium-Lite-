import { Post } from "./Post";

export interface User {
  id: number;
  email: string;
  password: number;
  posts?: Post[];
}