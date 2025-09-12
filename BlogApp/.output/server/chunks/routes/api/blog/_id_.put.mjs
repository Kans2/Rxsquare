import { c as defineEventHandler, g as getRouterParam, r as readBody } from '../../../_/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  const postId = parseInt(getRouterParam(event, "id"));
  const body = await readBody(event);
  const filePath = path.join(process.cwd(), "content", "blog.json");
  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const posts = JSON.parse(fileContents);
    const postIndex = posts.findIndex((p) => p.id === postId);
    if (postIndex !== -1) {
      posts[postIndex] = { ...posts[postIndex], ...body };
      fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
      return { success: true, post: posts[postIndex] };
    }
    return { success: false, error: "Post not found." };
  } catch (error) {
    return { success: false, error: "Failed to update post." };
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
