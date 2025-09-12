import { c as defineEventHandler } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const filePath = path.join(process.cwd(), "content", "blog.json");
  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
