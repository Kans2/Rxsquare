import { c as defineEventHandler, r as readBody } from '../../_/nitro.mjs';
import fs from 'fs';
import path from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const index_post = defineEventHandler(async (event) => {
  const filePath = path.join(process.cwd(), "content", "blog.json");
  const body = await readBody(event);
  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const posts = JSON.parse(fileContents);
    const newPost = {
      id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
      ...body
    };
    posts.push(newPost);
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
    return { success: true, post: newPost };
  } catch (error) {
    return { success: false, error: "Failed to add post." };
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
