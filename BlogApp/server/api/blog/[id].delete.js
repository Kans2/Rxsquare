import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const filePath = path.join(process.cwd(), 'content', 'blog.json');

  try {
    // Read the existing posts from the JSON file
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const posts = JSON.parse(fileContents);
    
    // Create a new array that filters out the deleted post
    const filteredPosts = posts.filter(post => post.id !== parseInt(id));

    // Check if a post was actually removed
    if (filteredPosts.length === posts.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found.'
      });
    }

    // Write the new, filtered posts array back to the file
    fs.writeFileSync(filePath, JSON.stringify(filteredPosts, null, 2));

    return { success: true, message: `Post with ID ${id} deleted.` };
    
  } catch (error) {
    // Handle specific errors like file not found or write permissions
    console.error('Failed to delete post:', error);
    return { success: false, error: 'Failed to delete post.' };
  }
});