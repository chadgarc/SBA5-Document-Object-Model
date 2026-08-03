# 📘 SBA – Document Object Model 
A CRUD-based Post Manager built for the **Software Engineering Bootcamp (Per Scholas)**.  
Developed using **HTML, SASS, TailwindCSS, DaisyUI, and JavaScript**, with a focus on DOM manipulation, event handling, validation, modals, and `localStorage` persistence.

---

## 📌 Project Overview

This project is a simple and clean blog-like application that allows users to:

- Create posts  
- Edit posts  
- Delete posts  
- Validate form inputs  
- Display posts dynamically  
- Persist data using `localStorage`  

The UI is inspired by the minimalist blog style of **[Cassidy Williams](https://cassidoo.co/blog/)**.  
I intentionally avoided building a Twitter/Facebook clone and instead focused on a lightweight, blog-like interface.

---

## 🎯 SBA Requirements Covered

This project demonstrates proficiency in:

- DOM traversal and manipulation  
- Event listeners and event delegation  
- Form validation  
- Modal control using DaisyUI  
- Template cloning  
- CRUD operations  
- State management using arrays  
- Data persistence with `localStorage`  
- Clean and modular JavaScript structure  

---

## 🛠️ Technologies Used

- **HTML5**
- **SASS**  
- **TailwindCSS**  
- **DaisyUI**  
- **JavaScript (ES6+)**  
- **localStorage**  

---

## 🚀 Features

### ✔ Create Post
- Input validation  
- Unique ID generation  
- Automatic timestamp  
- Dynamic DOM rendering  

### ✔ Edit Post
- Loads existing content into modal  
- Validates updated content  
- Updates DOM and `localStorage`  

### ✔ Delete Post
- Removes post from DOM  
- Updates internal arrays  
- Saves updated state  

### ✔ Persistent Storage
- Saves posts and IDs to `localStorage`  
- Loads posts on page refresh  
- Re-renders posts dynamically  

---

## 🧠 Development Process & Personal Insights

### 🔹 Inspiration
I explored different ideas and found **Cassidy Williams’ blog**.  
Its clean, simple layout was perfect for what I wanted:  
a minimal, functional interface without copying social media platforms.

### 🔹 Previous Experience That Helped
This SBA shares concepts with earlier labs, especially the **Task Manager**:

- CRUD logic  
- DOM updates  
- event listeners  
- array state management  

Because of that prior practice, I was able to build this project faster and with more confidence.

### 🔹 Improvements I Noticed
Throughout development, I saw clear growth in:

- Understanding event listeners  
- Using event delegation 
- Controlling DaisyUI modals  
- Debugging DOM-related issues  
- Organizing functions cleanly  
- Writing clearer, more modular code  

---

## 🧩 Code Structure

The project is organized into small, focused functions:

- `createPost()` – handles new post creation  
- `editPost()` – updates existing posts  
- `validator()` – validates both forms  
- `idGenerator()` – ensures unique IDs  
- `newPostContainer()` – clones the template  
- `createContainer()` – builds the full post element  
- `saveState()` – writes to `localStorage`  
- `loadState()` – loads from `localStorage`  
- `renderLoadedPost()` – renders saved posts on load  

---

## 📂 Application State

State is managed through:

- `postsArray` – stores all post objects  
- `postsIds` – stores unique IDs  
- `targetID` – tracks the post being edited  

---

## 📈 Conclusion

This SBA reflects significant progress in:

- Code organization  
- Debugging skills  
- DOM comprehension  
- Event handling  
- Application flow  
- Speed and confidence  

The combination of **TailwindCSS + SASS + DaisyUI + JavaScript** allowed me to build a clean, functional, and well-structured application.

---

## 📘 Additional Project Details

### 1. Brief Description
This project is a simple Post Manager application built with HTML, TailwindCSS, DaisyUI, and JavaScript.  
It includes a user header with:

- The user’s name and blog title  
- A profile picture  
- A short “about me” description  
- A sticky navbar containing relevant links (GitHub, Frontend Mentor, etc.)

Below the header, users can create new posts using the **Post** button.  
Each post appears at the top of the list and includes:

- A timestamp (creation date)  
- An Edit button  
- A Delete button  

Editing a post loads its previous title and content into a modal.  
Deleting a post removes it immediately.

The application uses `localStorage` to persist posts across page reloads.

---

### 2. Instructions to Run the Application
No installation or build steps are required.

To run the project:

1. Download or clone the repository.  
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).  
3. The application will load automatically and render any saved posts from `localStorage`.

Also you can open this [shortcut to website deploy](https://chadgarc.github.io/SBA5-Document-Object-Model/) with github pages.

One challenge I faced was learning that **arrow functions cannot be called before they are defined**, unlike regular functions.  
This reminded me of Python’s behavior and helped reinforce the difference between function declarations and function expressions in JavaScript.

Another challenge was managing DaisyUI modals, which behave differently depending on attributes like `method="dialog"`.  
I learned to control them manually using `.showModal()` and `.close()`.

Overall, this project helped me improve my debugging skills, code organization, and confidence in building interactive UI components.

---

### 3. Known Issues / Features Not Implemented
- Posts currently only display the **creation timestamp**. A future enhancement could add a “last edited” timestamp or a small label indicating that the post was edited.
- Posts cannot be reordered manually.  
- There is no search or filtering functionality.  
- The application does not support rich text formatting inside posts.
- Modularization (splitting logic into separate JS files) is not yet implemented.