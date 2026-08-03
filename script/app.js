// Calling the elements retaled to new posts
const newPostTitle = document.getElementById("new-post-title");
const newPostContent = document.getElementById("new-post-content");
const postForm = document.getElementById("postForm");
const closeBtn = document.getElementById("closeBtn");

// Calling the elements related to edit posts
const editPostTitle = document.getElementById("edit-post-title");
const editPostContent = document.getElementById("edit-post-content");
const editForm = document.getElementById("editForm");
const cancelBtn = document.getElementById("cancelBtn");

// The postsSection and postTemplate
const postsSection = document.getElementById("PostsSection");
const postTemplate = document.getElementById("postTemplate");

// Global variables to store ids, posts objects and manage target ID for editing posts
let postsIds = new Array();
let postsArray = new Array();
let targetID = "";

// Creates a new ID
idGenerator = () => {
    const range = 50000;
    let newID = 0;
    do{
        // I know there's a limit for this way, but I won't do 50k posts
        // There are more ways to get a random ID, for this purpose is enough
        newID = Math.round(Math.random() * range);
    } while (postsIds.includes(newID)){
        newID = Math.round(Math.random() * range);
    }
    return newID;
}

// Reset values from inputs
defaultContent = (title, content) => {
    title.value = "";
    content.value = "";
}

// Gets the time and return a timestamp
getTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    return `${year}-${month+1}-${day} at ${hour}:${minutes}`;
};

// Clone the post template
newPostContainer = (id) => {
    const container = postTemplate.cloneNode(true);
    container.classList.remove("hidden");
    container.classList.add("flex");
    container.id = id;

    // Avoid duplicates after render
    if (!postsIds.includes(id)) {
    postsIds.push(id);
    }
    return container;
}

// Create a new container with the data given
createContainer = (id, title, content, time) => {
    const container = newPostContainer(id);

    container.querySelector(".post-title").textContent = title;
    container.querySelector(".post-content").textContent = content;
    container.querySelector(".postTime").textContent = time;

    return container;
}

// Creates new post using the new container
createPost = (title, content) => {
    let titleInput = title.value.trim();
    let contentInput = content.value.trim();
    const newID = idGenerator().toString();
    const time = getTime();

    postsSection.prepend(createContainer(newID, titleInput, contentInput, time));

    postsArray.push({'id':newID, 'title':titleInput, 'content':contentInput, 'time':time});

    defaultContent(title, content);

    saveState();

    document.getElementById("post_modal").close();
}

// Edit posts
editPost = (title, content, id) => {
    titleInput = title.value.trim();
    contentInput = content.value.trim();

    const container = document.getElementById(id);
    container.querySelector(".post-title").textContent = titleInput;
    container.querySelector(".post-content").textContent = contentInput;

    // iterate posts arrays and compare ids of every object
    // Edite values of the container when the id is found
        postsArray.forEach((element, index) =>{
            if(element.id === id){
                element.title = titleInput;
                element.content = contentInput;
            } 
        })

    defaultContent(title, content);

    saveState();

    document.getElementById("edit_modal").close();
}

// Validate inputs, if not it will show the span with the error message
validator = (form, title, content) => {
    if(title.value.trim() !== "" && content.value.trim() !== ""){
        form.querySelector(".titleSpan").classList.add("hidden");
        form.querySelector(".contentSpan").classList.add("hidden");
        return true;
    } else{
        if (title.value.trim() === ""){
            form.querySelector(".titleSpan").classList.remove("hidden");
        } else{
            form.querySelector(".titleSpan").classList.add("hidden");
        }
        if (content.value.trim() === ""){
            form.querySelector(".contentSpan").classList.remove("hidden");
        } else{
            form.querySelector(".contentSpan").classList.add("hidden");
        }
        return false;
    }
}

// Listeners that will call all functions to create post, edit or delete
postForm.querySelector("#postBtn").addEventListener("click", () => {
    if(validator(postForm, newPostTitle, newPostContent)){
        createPost(newPostTitle, newPostContent);
    }
});

postForm.querySelector("#closeBtn").addEventListener("click", () => {
    defaultContent(newPostTitle,newPostContent);
    document.getElementById("post_modal").close();
});

editForm.querySelector("#editBtn").addEventListener("click", () => {
    if(validator(editForm, editPostTitle, editPostContent)){
        editPost(editPostTitle, editPostContent, targetID);
    }
});

editForm.querySelector("#cancelBtn").addEventListener("click", () => {
    defaultContent(editPostTitle,editPostContent);
    document.getElementById("edit_modal").close();
});

// If an element from postsection is clicked
postsSection.addEventListener("click", event => {
    // targeting the button clicked
    if(event.target.classList.contains("deleteBtn")){
        // for the target button, I'll get the closest article, the current post
        const currentPost = event.target.closest("article");
        // if id of this post is included in the array, I'll
        // override the array list with another list excluding that specific id
        postsIds = postsIds.filter( id => id !== currentPost.id );
        // iterate posts arrays and compare ids of every object
        postsArray.forEach((element, index) =>{
            if(element.id === currentPost.id){
                // delete one element from this index
                postsArray.splice(index,1);
            } 
        })
        saveState();
        // remove current post
        currentPost.remove();
    } else if (event.target.classList.contains("editBtn")){
        const currentPost = event.target.closest("article");
        editPostTitle.value = currentPost.querySelector('.post-title').textContent;
        editPostContent.value = currentPost.querySelector('.post-content').textContent;
        targetID = currentPost.id;
    }
});

// Save current data to localStorage
saveState = () => {
    localStorage.setItem('posts',JSON.stringify(postsArray));
    localStorage.setItem('ids',JSON.stringify(postsIds));
}

// Load previous data from last refresh
loadState = () => {
    const posts = localStorage.getItem('posts');
    const ids = localStorage.getItem('ids');

    postsArray = posts ? JSON.parse(posts) : [];
    postsIds = ids ? JSON.parse(ids) : [];
}

// Create posts with previous data
renderLoadedPost = () => {
    postsArray.forEach( post => {

        const id =  post.id;
        const title = post.title;
        const content = post.content;
        const time = post.time;
        
        postsSection.prepend(createContainer(id, title, content, time));
    });
}

loadState();

if(postsArray.length > 0){
    renderLoadedPost();
}