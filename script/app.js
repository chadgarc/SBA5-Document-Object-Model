
const newPostTitle = document.getElementById("new-post-title");
const newPostContent = document.getElementById("new-post-content");
const postForm = document.getElementById("postForm");
const closeBtn = document.getElementById("closeBtn");

const editPostTitle = document.getElementById("edit-post-title");
const editPostContent = document.getElementById("edit-post-content");
const editForm = document.getElementById("editForm");
const cancelBtn = document.getElementById("cancelBtn");

const postsSection = document.getElementById("PostsSection");
const postTemplate = document.getElementById("postTemplate");

let postsIds = new Array();
const postsArray = new Array();
let targetID = "";

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

defaultContent = (title, content) => {
    title.value = "";
    content.value = "";
}

getTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    return `${year}-${month+1}-${day} at ${hour}:${minutes}`;
};

newPostContainer = (id) => {
    const container = postTemplate.cloneNode(true);
    container.classList.remove("hidden");
    container.classList.add("flex");
    container.id = id;
    postsIds.push(id);
    return container;
}

createPost = (title, content) => {
    titleInput = title.value.trim();
    contentInput = content.value.trim();
    const newID = idGenerator().toString();
    const time = getTime();

    const container = newPostContainer(newID);

    container.querySelector(".post-title").textContent = titleInput;
    container.querySelector(".post-content").textContent = contentInput;
    container.querySelector(".postTime").textContent = time;

    postsSection.prepend(container);

    postsArray.push({'id':newID, 'title':titleInput, 'content':contentInput, 'time':time});

    defaultContent(title, content);

    document.getElementById("post_modal").close();
}

editPost = (title, content, id) => {
    titleInput = title.value.trim();
    contentInput = content.value.trim();

    const container = document.getElementById(id);
    console.log(container);
    container.querySelector(".post-title").textContent = titleInput;
    container.querySelector(".post-content").textContent = contentInput;
    
    console.log(container);

    // iterate posts arrays and compare ids of every object
        postsArray.forEach((element, index) =>{
            if(element.id === id){
                element.title = titleInput;
                element.content = contentInput;
            } 
        })

    defaultContent(title, content);

    document.getElementById("edit_modal").close();
}

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
        // remove current post
        currentPost.remove();
    } else if (event.target.classList.contains("editBtn")){
        const currentPost = event.target.closest("article");
        editPostTitle.value = currentPost.querySelector('.post-title').textContent;
        editPostContent.value = currentPost.querySelector('.post-content').textContent;
        targetID = currentPost.id;
    }
});

