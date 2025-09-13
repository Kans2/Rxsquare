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

📂 Data Handling & Live Environment

This application uses a local JSON file (/content/blog.json) to store all blog post data. All actions (add, edit, delete) directly modify this file.

Important Note: This data handling method is suitable for a local demonstration. The JSON file will not work in a live deployment on a hosting service like Vercel or Netlify. This is because these platforms use a read-only file system, which prevents the application from writing new data or making changes to the file. For a live, persistent application, a database would be required.

✨ Features
This application includes the following features as per the task requirements:

List Blog Posts: View all posts on the main blog page (/blog).

Add New Post: Create a new blog post with a title, description, date, and image. The image is uploaded and stored on the local file system.

View Full Post: Click "View Full Blog" to see a dedicated page for a single post.

Edit Post: Update an existing post's details, including the image and date.

Delete Post: Permanently remove a post.

🛠 Project Structure
The project follows a standard Nuxt.js directory structure:

components/: Vue components for UI elements.

pages/: Application pages and routes.

server/: API endpoints.

assets/: Global styles and assets.

content/: The local blog.json file.


##Author

Kannan S