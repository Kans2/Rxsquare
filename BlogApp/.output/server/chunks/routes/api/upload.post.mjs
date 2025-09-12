import { c as defineEventHandler, f as readMultipartFormData } from '../../_/nitro.mjs';
import fs from 'fs/promises';
import path from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const upload_post = defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  if (!body || body.length === 0) {
    return { error: "No files uploaded." };
  }
  const file = body[0];
  const filename = `${Date.now()}-${file.filename}`;
  const filePath = path.join(process.cwd(), "public", "uploads", filename);
  try {
    await fs.writeFile(filePath, file.data);
    return { imageUrl: `/uploads/${filename}` };
  } catch (error) {
    console.error("Failed to write file:", error);
    return { error: "Failed to upload image." };
  }
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
