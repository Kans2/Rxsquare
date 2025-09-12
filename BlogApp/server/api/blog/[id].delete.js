import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const postId = parseInt(getRouterParam(event, 'id'));
  const filePath = path.join(process.cwd(), 'content', 'blog.json');
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    let posts = JSON.parse(fileContents);
    
    // Filter out the post to be deleted
    const initialLength = posts.length;
    posts = posts.filter(p => p.id !== postId);
    
    if (posts.length < initialLength) {
      fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
      return { success: true };
    }
    
    return { success: false, error: 'Post not found.' };
  } catch (error) {
    return { success: false, error: 'Failed to delete post.' };
  }
});