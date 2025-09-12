<template>
  <div class="form-page-container">
    <div class="form-content-wrapper">
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
          <label for="image">Upload New Image (optional)</label>
          <input type="file" id="image" @change="handleFileUpload" accept="image/*" />
        </div>
        <div v-if="uploading" style="color: blue;">Uploading image...</div>
        <div v-if="form.imageUrl" style="margin-top: 10px;">
          <p>Current/New Image Preview:</p>
          <img :src="form.imageUrl" alt="Post Image" style="max-width: 200px; max-height: 200px;" />
        </div>
        
        <div class="form-group">
          <label for="date">Date</label>
          <input type="date" id="date" v-model="form.date" required />
        </div>

        <div class="form-buttons">
          <button type="submit" :disabled="uploading">Update Post</button>
          <NuxtLink to="/blog/view/{{postId}}">Cancel</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const uploading = ref(false);

const postId = parseInt(route.params.id);
const post = ref(null);
const form = reactive({
  title: '',
  description: '',
  imageUrl: '',
  date: '',
});

// Fetch the post data for editing
const { data, error } = await useFetch(`/api/blog/${postId}`);
post.value = data.value;

// Populate the form with the fetched data
if (post.value) {
  Object.assign(form, post.value);
} else {
  router.push('/blog');
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  uploading.value = true;
  
  const formData = new FormData();
  formData.append('image', file);

  try {
    const { imageUrl } = await $fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (imageUrl) {
      form.imageUrl = imageUrl;
    }
  } catch (error) {
    alert('Failed to upload image: ' + error.message);
  } finally {
    uploading.value = false;
  }
};

const submitForm = async () => {
  if (!form.imageUrl) {
    alert('Please upload an image or provide an image URL.');
    return;
  }
  
  const { data, error } = await useFetch(`/api/blog/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(form),
  });

  if (data.value && data.value.success) {
    alert('Post updated successfully!');
    router.push(`/blog/${postId}`);
  } else {
    alert('Error updating post: ' + (error.value?.message || 'Unknown error'));
  }
};
</script>