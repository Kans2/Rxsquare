import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const filePath = path.join(process.cwd(), 'content', 'blog.json');
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    return [];
  }
});