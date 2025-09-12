<template>
  <div class="content-container">
    <h1>All Blog Posts</h1>
    <NuxtLink to="/blog/new" class="add-post-btn">Add New Post</NuxtLink>
    <div v-if="pending">Loading posts...</div>
    <div v-else-if="!data || data.length === 0">No blog posts found.</div>
    <div v-else class="blog-list">
      <BlogPostCard
        v-for="post in data"
        :key="post.id"
        :post="post"
        @post-deleted="refresh"
      />
    </div>
  </div>
</template>

<script setup>
const { data, pending, error, refresh } = await useAsyncData('posts', () => $fetch('/api/blog'));

if (error.value) {
  console.error('Failed to fetch posts:', error.value);
}
</script>