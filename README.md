# Nuxt.js Blog Application

A simple blog application built with the Nuxt.js framework, demonstrating core features such as creating, viewing, editing, and deleting blog posts.

## 🚀 Getting Started

Follow these steps to get the development environment running.

### Prerequisites

You need to have **Node.js** and **npm** installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone [your-repository-url]
    ```

2.  Navigate to the project directory:
    ```bash
    cd [your-project-folder]
    ```

3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To run the application in development mode:

```bash
npm run dev
 

The application will be available at http://localhost:3000.

```

# 📝 Blog Application (Nuxt.js)

## 📂 Data Handling & Live Environment
This application uses a local JSON file (`/content/blog.json`) to store all blog post data.  
All actions (add, edit, delete) directly modify this file.

⚠️ **Important Note:**  
This data handling method is suitable for **local demonstration only**.  
In a live deployment (e.g., Vercel, Netlify), the JSON file will not work for saving changes because these platforms use a **read-only file system**.  
For a live, persistent application, a **backend with a database** would be required.

---

## ✨ Features
- **List Blog Posts** → View all posts on the main blog page (`/blog`).
- **Add New Post** → Create a new blog post with title, description, date, and image (stored locally).
- **View Full Post** → Open a dedicated page to read the full blog.
- **Edit Post** → Update an existing post’s details (title, description, image, date).
- **Delete Post** → Permanently remove a post.

---

## 🛠 Project Structure
The project follows a standard **Nuxt.js directory structure**:

components/ # Vue components for UI elements
pages/ # Application pages and routes
server/ # API endpoints (for local JSON handling)
assets/ # Global styles and assets
content/ # Local blog.json file (data storage)

## 👨‍💻 Author
**Kannan S**