<template>
  <div class="blog-card">
    <img :src="post.imageUrl" :alt="post.title" />
    <div class="blog-card-content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
    </div>
    <div class="actions">
      <NuxtLink :to="`/blog/${post.id}`">Edit</NuxtLink>
      <button @click="deletePost">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['post-deleted']);

const deletePost = async () => {
  if (confirm('Are you sure you want to delete this post?')) {
    const { data, error } = await useFetch(`/api/blog/${props.post.id}`, {
      method: 'DELETE'
    });
    
    if (data.value && data.value.success) {
      alert('Post deleted successfully!');
      emit('post-deleted', props.post.id);
    } else {
      alert('Error deleting post: ' + (error.value?.message || 'Unknown error'));
    }
  }
};
</script>