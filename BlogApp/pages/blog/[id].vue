<template>
  <div class="container">
    <h1>Edit Blog Post</h1>
    <div v-if="!post">Loading...</div>
    <form v-else @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="form.title" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="form.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image URL</label>
        <input type="text" id="image" v-model="form.imageUrl" required />
      </div>
      <div class="form-buttons">
        <button type="submit">Update Post</button>
        <NuxtLink to="/">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const postId = parseInt(route.params.id);
const post = ref(null);
const form = ref({
  title: '',
  description: '',
  imageUrl: '',
  date: '',
});

// Fetch the post data
const { data, error } = await useFetch(`/api/blog`);
const allPosts = data.value;
post.value = allPosts.find(p => p.id === postId);

if (post.value) {
  form.value = { ...post.value };
} else {
  // Redirect if post is not found
  router.push('/');
}

const submitForm = async () => {
  const { data, error } = await useFetch(`/api/blog/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(form.value),
  });

  if (data.value && data.value.success) {
    alert('Post updated successfully!');
    router.push('/');
  } else {
    alert('Error updating post: ' + (error.value?.message || 'Unknown error'));
  }
};
</script>