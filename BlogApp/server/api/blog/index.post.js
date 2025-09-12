import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const filePath = path.join(process.cwd(), 'content', 'blog.json');
  const body = await readBody(event);
  
  try {
    // Read the existing posts
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const posts = JSON.parse(fileContents);
    
    // Add the new post
    const newPost = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      ...body
    };
    posts.push(newPost);
    
    // Write the updated posts back to the file
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
    
    return { success: true, post: newPost };
  } catch (error) {
    return { success: false, error: 'Failed to add post.' };
  }
});