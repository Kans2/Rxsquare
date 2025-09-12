import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id);
  const filePath = path.join(process.cwd(), 'content', 'blog.json');

  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' });
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const posts = JSON.parse(fileContents);
    
    const post = posts.find(p => p.id === id);

    if (!post) {
      throw createError({ statusCode: 404, statusMessage: 'Post not found' });
    }
    
    return post;
  } catch (error) {
    console.error('Failed to get post:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve post.'
    });
  }
});