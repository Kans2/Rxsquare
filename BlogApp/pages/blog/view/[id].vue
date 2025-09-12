<template>
  <div class="content-container">
    <div v-if="pending">
      <p>Loading post...</p>
    </div>
    <div v-else-if="error">
      <p>Error: Post not found.</p>
    </div>
    <div v-else class="full-post">
      <h1>{{ post.title }}</h1>
      <img :src="post.imageUrl" :alt="post.title" class="full-post-image" />
      <div class="post-meta">
        <span class="blog-card-date">Published on {{ formattedDate }}</span>
      </div>
      <p class="full-post-description">{{ post.description }}</p>
      
      <div class="post-actions">
        <NuxtLink to="/blog" class="back-to-blog-btn">Back to all posts</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const id = route.params.id;

const { data: post, pending, error } = await useAsyncData(
  `post-${id}`,
  () => $fetch(`/api/blog/${id}`)
);

const formattedDate = computed(() => {
  if (!post.value || !post.value.date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(post.value.date).toLocaleDateString('en-US', options);
});
</script>