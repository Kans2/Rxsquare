import { c as defineEventHandler, e as createError } from '../../../_/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const filePath = path.join(process.cwd(), "content", "blog.json");
  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const posts = JSON.parse(fileContents);
    const filteredPosts = posts.filter((post) => post.id !== parseInt(id));
    if (filteredPosts.length === posts.length) {
      throw createError({
        statusCode: 404,
        statusMessage: "Post not found."
      });
    }
    fs.writeFileSync(filePath, JSON.stringify(filteredPosts, null, 2));
    return { success: true, message: `Post with ID ${id} deleted.` };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { success: false, error: "Failed to delete post." };
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
