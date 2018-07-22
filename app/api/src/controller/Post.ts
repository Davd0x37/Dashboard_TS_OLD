import * as signale from "signale";
import { db } from "../config/config";
import { DB } from "./DB";

// Author_id is stored in session after success authentication
export interface IPost {
  title: string;
  content: string;
  author: string;
  author_id: number;
  create_date: number;
  likes?: number;
  comments?: number; // Comments ID
}

export const PostMutation = {
  createPost: async (_: any, args: any): Promise<boolean> => {
    try {
      const con = await DB();
      const req = await db.post.insert(args.data).run(con);
      return !!req.inserted;
    } catch (e) {
      signale.error(e);
      throw new Error(e);
    }
  }
};

export const PostQuery = {
  getPost: async (_: any, { author, author_id }: any): Promise<any> => {
    try {
      const con = await DB();
      return db.post.filter({ author, author_id }).run(con).then(r => r.toArray());
    } catch (e) {
      throw new Error(e);
    }
  }
};