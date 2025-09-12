<template>
  <div class="container">
    <h1>All Blog Posts</h1>
    <NuxtLink to="/blog/new" class="add-post-btn">Add New Post</NuxtLink>
    <div v-if="pending">Loading posts...</div>
    <div v-else-if="!posts || posts.length === 0">No blog posts found.</div>
    <div v-else class="blog-list">
      <BlogPostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @post-deleted="fetchPosts"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const posts = ref([]);
const pending = ref(true);

const fetchPosts = async () => {
  pending.value = true;
  const { data, error } = await useFetch('/api/blog');
  if (error.value) {
    console.error('Failed to fetch posts:', error.value);
    posts.value = [];
  } else {
    posts.value = data.value;
  }
  pending.value = false;
};

// Fetch posts when the component is mounted
await fetchPosts();
</script>