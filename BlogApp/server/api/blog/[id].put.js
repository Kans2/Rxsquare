import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const postId = parseInt(getRouterParam(event, 'id'));
  const body = await readBody(event);
  const filePath = path.join(process.cwd(), 'content', 'blog.json');
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const posts = JSON.parse(fileContents);
    
    // Find and update the post
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      posts[postIndex] = { ...posts[postIndex], ...body };
      fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
      return { success: true, post: posts[postIndex] };
    }
    
    return { success: false, error: 'Post not found.' };
  } catch (error) {
    return { success: false, error: 'Failed to update post.' };
  }
});