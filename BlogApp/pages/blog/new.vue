<template>
  <div class="form-page-container">
    <div class="form-content-wrapper">
      <h1>Create New Blog Post</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" v-model="form.title" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="form.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="image">Upload Image</label>
          <input type="file" id="image" @change="handleFileUpload" accept="image/*" required />
        </div>
        <div v-if="uploading" style="color: blue;">Uploading image...</div>
        <div v-if="form.imageUrl" style="margin-top: 10px;">
          <p>Image uploaded. Preview:</p>
          <img :src="form.imageUrl" alt="Uploaded Image" style="max-width: 200px; max-height: 200px;" />
        </div>
        
        <div class="form-group">
          <label for="date">Date</label>
          <input type="date" id="date" v-model="form.date" required />
        </div>

        <div class="form-buttons">
          <button type="submit" :disabled="uploading">Add Post</button>
          <NuxtLink to="/blog">Cancel</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const uploading = ref(false);

const form = reactive({
  title: '',
  description: '',
  imageUrl: '',
  date: '',
});

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
    alert('Please upload an image first.');
    return;
  }
  
  const { data, error } = await useFetch('/api/blog', {
    method: 'POST',
    body: JSON.stringify(form),
  });

  if (data.value && data.value.success) {
    alert('Post added successfully!');
    router.push('/blog');
  } else {
    alert('Error adding post: ' + (error.value?.message || 'Unknown error'));
  }
};
</script>