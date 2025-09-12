import { readMultipartFormData } from 'h3';
import fs from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  
  if (!body || body.length === 0) {
    return { error: 'No files uploaded.' };
  }
  
  const file = body[0];
  const filename = `${Date.now()}-${file.filename}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
  
  try {
    await fs.writeFile(filePath, file.data);
    return { imageUrl: `/uploads/${filename}` };
  } catch (error) {
    console.error('Failed to write file:', error);
    return { error: 'Failed to upload image.' };
  }
});