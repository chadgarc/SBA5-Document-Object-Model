
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

const postsIds = new Array();

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

newPostContainer = (id) => {
    const container = postTemplate.cloneNode(true);
    container.classList.remove("hidden");
    container.classList.add("flex");
    container.id = id.toString();
    postsIds.push(id.toString());
    return container;
}

createPost = (title, content) => {
    titleInput = title.value;
    contentInput = content.value;

    const container = newPostContainer(idGenerator());

    container.querySelector(".post-title").textContent = titleInput;
    container.querySelector(".post-content").textContent = contentInput;

    console.log(container)

    postsSection.appendChild(container);

    defaultContent(title, content);

    document.getElementById("post_modal").close();
}

editPost = (title, content, id) => {
    titleInput = title.value;
    contentInput = content.value;

    const container = document.getElementById(id);

    container.querySelector(".post-title").textContent = titleInput;
    container.querySelector(".post-content").textContent = contentInput;

    defaultContent(titleInput, contentInput);
}

validator = (title, content) => {
    if(title.value.trim() !== "" && content.value.trim() !== ""){
        postForm.querySelector(".titleSpan").classList.add("hidden");
        postForm.querySelector(".contentSpan").classList.add("hidden");
        return true;
    } else{
        if (title.value.trim() === ""){
            postForm.querySelector(".titleSpan").classList.remove("hidden");
        } else{
            postForm.querySelector(".titleSpan").classList.add("hidden");
        }
        if (content.value.trim() === ""){
            postForm.querySelector(".contentSpan").classList.remove("hidden");
        } else{
            postForm.querySelector(".contentSpan").classList.add("hidden");
        }
        return false;
    }
}

postForm.querySelector("#postBtn").addEventListener("click", () => {
        if(validator(newPostTitle, newPostContent)){
            createPost(newPostTitle, newPostContent);
        }
});
