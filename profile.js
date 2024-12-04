import {
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    updateProfile,
    signOut,
    updateEmail,
    deleteUser,
} from "./firebase.js";

const auth = getAuth();

// -----------cloudinay----------
// const cloudName = "dgtsbc43h";
// const unsignedUploadPreset = "mclp2wp0";

// let fileInput = document.getElementById("fileInput");
// console.log(fileInput + "ok mil gai")
// let gallery = document.getElementById("gallery");


// fileInput.addEventListener("change", () => {
//   let files = fileInput.files; // This will be a FileList object
//   if (files.length > 0) {
//     // Using for...of loop to iterate over files
//     for (let file of files) {
//       let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

//       let fd = new FormData();
//       fd.append("upload_preset", unsignedUploadPreset);
//       fd.append("file", file);

//       fetch(url, {
//         method: "POST",
//         body: fd,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           let resourceURl = data.secure_url;
          
//           // Fix: Correct URL transformation for cropping and face detection
//           let transformedUrl = resourceURl.replace(
//             "upload/",
//             "upload/c_thumb,g_auto,h_200,w_200/r_max/"
//           );

//           console.log("Uploaded successfully", resourceURl);

          
        
//           // Handle different file types (image, video, pdf)
//           if (data.format == "pdf" || data.format == "mp4" || data.format == "jpeg") {
//             let iframe = document.createElement("iframe");
//             iframe.src = resourceURl;
//             iframe.width = "500px";
//             iframe.height = "500px";
//             gallery.appendChild(iframe);
//             console.log(iframe);
//           } else {
//             let img = new Image();
//             img.src = transformedUrl;
//             console.log(transformedUrl)

//             // Event listeners for loading and error
//             // img.onload = () => {
//             //   gallery.appendChild(img);//error da rha hai
//             // };

//             img.onerror = (error) => {
//               console.error("Error loading image: ", error);
//             };
//           }
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     }
//   }
// });





// let dropArea = document.getElementById("dropArea");

// dropArea.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   console.log("Dragging over");
// });

// dropArea.addEventListener("drop", (event) => {
//   event.stopPropagation();
//   event.preventDefault();
//   console.log("Dropped");

//   let files = event.dataTransfer.files;
//   console.log(files);

//   // Using for...of loop to iterate over files dropped in the drop area
//   for (let file of files) {
//     let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

//     let fd = new FormData();
//     fd.append("upload_preset", unsignedUploadPreset);
//     fd.append("file", file);

//     fetch(url, {
//       method: "POST",
//       body: fd,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         let resourceURl = data.secure_url;
        
//         // Fix: Correct URL transformation for cropping and face detection
//         let transformedUrl = resourceURl.replace(
//           "upload/",
//           "upload/c_thumb,g_auto,h_200,w_200/r_max/"
//         );

//         console.log("Uploaded successfully", resourceURl);

//         // Handle different file types (image, video, pdf)
//         if (data.format == "pdf" || data.format == "mp4") {
//           let iframe = document.createElement("iframe");
//           iframe.src = resourceURl;
//           iframe.width = "500px";
//           iframe.height = "500px";
//           gallery.appendChild(iframe);
//           console.log(iframe);
//         } else {
//           let img = new Image();
//           img.src = transformedUrl;

//           // Event listeners for loading and error
//           img.onload = () => {
//             gallery.appendChild(img);
//           };

//           img.onerror = (error) => {
//             console.error("Error loading image: ", error);
//           };
//         }
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }
// });



let profilePage = document.getElementById("profile-page");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user);

        profilePage.innerHTML =
            `<div class="row gap-2 py-5 row-cols-1 row-cols-lg-3 justify-content-around">
                        <div class="col">
                            <div class="custom-card">
                                <div class="user-image">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="User-Profile-Image">
                                </div>
                                <p class="heading">${user.displayName}</p>
                                <p>${user.email}</p>
                                <p>${user.newEmail}</p>
                                
                                <div class="activity-level">
                                    <ul class="list-unstyled">
                                        <li class="active"></li>
                                        <li class="active"></li>
                                        <li class="active"></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                </div>
                                <div class="d-flex justify-content-around">
                                    <p>${user.emailVerified ? "Yes" : "No"}</p>
                                    <p>Uiverse</p>
                                    <p>Uiverse</p>
                                </div>
                                <div class="d-flex justify-content-around">
                                    <p>Powered By</p>
                                    <p>Uiverse</p>
                                    <p>Uiverse</p>
                                </div>
                                
                                <div class="user-social-link px-6">
                                    <a href="#" class="mx-2"><i class="fa-brands fa-square-facebook fa-lg"
                                            style="color: #ffffff;"></i></a>
                                    <a href="#" class="mx-2"><i class="fa-brands fa-instagram fa-lg"
                                            style="color: #ffffff;"></i></a>
                                    <a href="#" class="mx-2"><i class="fa-brands fa-linkedin fa-lg"
                                            style="color: #ffffff;"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="custom-card">
                                <div class="row gap-2 py-2 row-cols-1 row-cols-lg-1 justify-content-around pt-1">
                                    <div class="col mb-3">
                                     <button type="button" class="button-85" id="verifyEmail">Verify your email</button>
                                    </div>
                                    <div class="col mb-3">
                                      <button type="button" class="button-85" id="updateProfile">Update profile</button>
                                    </div>
                                    <div class="col mb-3">
                                      <button type="button" class="button-85" id="updateEmail">Update Email</button>
                                    </div>
                                    <div class="col mb-3">
                                              <button type="button" class="button-85" id="deleteAccount">Delete Account</button>
                                    </div>
                                    <div class="col mb-3">
                                     <button type="button" class="button-85" id="signOut">Sign Out</button>
                                    </div>
                                  </div>
                            </div>
                        </div>
                    </div>`

        //   verifyEmail
        document.getElementById("verifyEmail").addEventListener("click", () => {
            sendEmailVerification(auth.currentUser).then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Email Has Been Sent!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                console.log("email has been sent");
            });
        });

  
      // update name and photo----------         
      document.getElementById("updateProfile").addEventListener("click", () => {
        Swal.fire({
            title: 'Update Profile',
            html: `
                <input type="text" id="swal-input-name" class="swal2-input" placeholder="Enter your name">
                <input type="text" id="swal-input-photoURL" class="swal2-input" placeholder="Enter photo URL">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save',
            preConfirm: () => {
                const name = document.getElementById('swal-input-name').value;
                const photoURL = document.getElementById('swal-input-photoURL').value;
    
                if (!name || !photoURL) {
                    Swal.showValidationMessage(`Please enter both name and photo URL`);
                    return;
                }
                return { name, photoURL };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, photoURL } = result.value;
    
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoURL
                }).then(() => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Profile updated successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log("Profile updated");
                }).catch((error) => {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "Error updating profile",
                        text: error.message
                    });
                });
            }
        });
    });

    
      // updateEmail========
      document.getElementById("updateEmail").addEventListener("click", () => {
        Swal.fire({
            title: 'Update Email',
            input: 'email',
            inputPlaceholder: 'Enter your new email',
            showCancelButton: true,
            confirmButtonText: 'Update',
            preConfirm: (email) => {
                if (!email) {
                    Swal.showValidationMessage(`Please enter a valid email`);
                    return;
                }
                return email;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newEmail = result.value;
    
                updateEmail(auth.currentUser, newEmail)
                    .then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Email updated successfully!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        console.log("Email updated to:", newEmail);
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            icon: "error",
                            title: "Error updating email",
                            text: error.message
                        });
                    });
            }
        });
    });


         //Delete a user
         document.getElementById("deleteAccount").addEventListener("click", () => {
          Swal.fire({
              title: 'Are you sure?',
              text: "This action cannot be undone!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'No, keep it'
          }).then((result) => {
              if (result.isConfirmed) {
                  const user = auth.currentUser;
      
                  deleteUser(user).then(() => {
                      Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Your account has been deleted!",
                          showConfirmButton: false,
                          timer: 1500
                      });
                      console.log("User deleted.");
                      // Redirect or perform any other necessary action
                      location.href = "index.html"; // Redirect to login page or another page
                  }).catch((error) => {
                      console.log(error);
                      Swal.fire({
                          icon: "error",
                          title: "Error deleting account",
                          text: error.message
                      });
                  });
              }
          });
      });








        // sigh out 
      document.getElementById("signOut").addEventListener("click", () => {
            signOut(auth).then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User has been signed outt!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                console.log("user has been signed out");


            }).catch((error) => {
                console.log(error);

            });
        });

    } 

    else {
        Swal.fire("User is logout out");
        console.log("user is logout out");
    }

});
