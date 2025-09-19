<template>
  <div class="blog-card">
    <img :src="post.imageUrl" :alt="post.title" />
    <div class="blog-card-content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
      
      <div class="card-footer">
        <span class="blog-card-date">{{ post.date }}</span>
        <NuxtLink :to="`/blog/view/${post.id}`" class="view-link">
          Click here to view full blog
        </NuxtLink>
      </div>

    </div>
    <div class="actions">
      <NuxtLink :to="`/blog/${post.id}`" class="edit-btn">Edit</NuxtLink>
      <button @click.prevent="deletePost" class="delete-btn">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['post-deleted']);

const formattedDate = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(props.post.date).toLocaleDateString('en-US', options);
});

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

<style scoped>
/* Add these styles to your assets/css/main.css file */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.blog-card-date {
  font-size: 14px;
  color: #999;
}

.view-link {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.view-link:hover {
  text-decoration: underline;
}

/* Other existing styles for the blog card... */
.blog-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
}

.blog-card:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.blog-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-card-content {
  padding: 20px;
}

.blog-card-content h2 {
  font-size: 20px;
  margin-top: 0;
  color: #242424;
}

.blog-card-content p {
  font-size: 16px;
  color: #6B6B6B;
}

.actions {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  padding: 15px;
  border-top: 1px solid #eee;
  background-color: #fafafa;
}

.actions a,
.actions button {
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
}

.edit-btn {
  background-color: #28a745;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}
</style>