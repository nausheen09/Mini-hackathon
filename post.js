import{collection, addDoc, db, 
    // doc, setDoc, updateDoc, 
    // arrayUnion, 
    // arrayRemove,
//    limit, 
    // getDocs, getDoc, serverTimestamp, orderBy,  
    //getDoc, 
    query, where,   onSnapshot, 
  } from "./firebase.js";


// // Track the selected category
let selectedCategory = ""; // Default value

// Add event listener for dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        selectedCategory = this.textContent; // Get the text of the selected item
        document.getElementById('dropdown').textContent = this.textContent; // Update button text
        console.log("Selected Category:", selectedCategory);
        filterPosts(selectedCategory); // Automatically filter posts after selecting a category
    });
});

// Search button functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('btnNavbarSearch');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase(); // Get the search term
    console.log("Searching for:", searchTerm);
    filterPosts(searchTerm); // Filter posts based on the search term
});

// Function to filter posts based on the search term (category)
function filterPosts(searchTerm) {
    const usersRef = collection(db, "users");
    let q = query(usersRef);

    // Check if searchTerm is provided and filter by category
    if (searchTerm) {
        q = query(usersRef, where("category", "==", searchTerm)); // Filter by category if search term exists
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let posts = document.getElementById("posts");
        posts.innerHTML = ""; // Clear existing posts before rendering new ones

        querySnapshot.forEach((doc) => {
            const data = doc.data(); // Fetch document data

            // Check if required fields exist
            if (data.postTitle && data.postDescription && data.category) {
                posts.innerHTML += `
                    <div class="card mb-3">
                        <div class="card-header fontStyle">@Posts</div>
                        <div class="card-body">
                            <h5 class="card-title fontStyle">${data.category}</h5>
                            <h5 class="card-title fontStyle">${data.postTitle}</h5>
                            <p class="card-text fontStyle">${data.postDescription}</p>
                        </div>
                        <div class="button p-4">
                            <button type="button" class="btn btn-primary color-blue" onclick="edit(event)">Edit</button>
                            <button type="button" class="btn btn-primary color-red" onclick="remove(event)">Delete</button>
                        </div>
                    </div>`;
            }
        });
    });
}

// Submit post functionality
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", async () => {
    console.log("working");
    let postTitle = document.getElementById('post-title');
    let postDescription = document.getElementById('post-description');

    // Check if category is selected
    if (!selectedCategory) {
        alert("Please select a category!");
        return;
    }

    // Add data with selected category
    try {
        const docRef = await addDoc(collection(db, "users"), {
            postTitle: postTitle.value,
            postDescription: postDescription.value,
            category: selectedCategory, // Add the selected category
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// Initially, load all posts (without filtering)
filterPosts(""); // Empty search term loads all posts







