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



{/* --------------------------------------------- */}
{/* <div class="p-0 m-0">
        <div class="row d-flex justify-content-center align-items-center h-100 p-0 m-0">
          <div class="col col-lg-6 mb-4 mb-lg-0  w-100 p-0">
            <div class="card mb-0  bg-transparent text-white" style="border-radius: .5rem;">
              <div class="row g-0  mb-0 pt-1">
                <div class="col-md-4 gradient-custom text-center  photo"
                  style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                  <img src="${user.photoURL} "
                    alt="Avatar" class="img-fluid my-5" style="width: 80px;" />
                  <h5 class="text-white">${user.displayName}</h5>
                </div>
                <div class="col-md-8">
                  <div class="card-body p-2">
                    <h6>Information</h6>
                    <hr class="mt-0 mb-4">
                    <div class="row pt-1">
                      <div class="col-6 mb-3">
                        <h6>Email</h6>
                        <p class="text-muted  text-white">${user.email}</p>
                         <p class="text-muted ">${user.newEmail}</p>
                      </div>
                      <div class="col-6 mb-3">
                        <h6>Phone</h6>
                        <p class="text-muted">123 456 789</p>
                      </div>
                      <div class="col-6 mb-3">
                        <h6>Email Verify</h6>
                        <p class="text-muted text-white">${user.emailVerified ? "Yes" : "No"
            }</p>
                      </div>
                    </div>
                    <h6>Projects</h6>
                    <hr class="mt-0 mb-4">
                    <div class="row pt-1">
                      <div class="col-6 mb-3">
                       <button type="button" class="button-85" id="verifyEmail">Verify your email</button>
                      </div>
                      <div class="col-6 mb-3">
                        <button type="button" class="button-85" id="updateProfile">Update profile</button>
                      </div>
                      <div class="col-6 mb-3">
                        <button type="button" class="button-85" id="updateEmail">Update Email</button>
                      </div>
                      <div class="col-6 mb-3">
                                <button type="button" class="button-85" id="deleteAccount">Delete Account</button>
                      </div>
                      <div class="col-6 mb-3">
                       <button type="button" class="button-85" id="signOut">Sign Out</button>
                      </div>
                    </div>
                    <div class="d-flex justify-content-evenly  w-50">
                      <a href="#!"><i class="fa-brands fa-facebook fa-lg" style="color: #ffffff;"></i></a>
                      <a href="#!"><i class="fa-brands fa-twitter fa-lg" style="color: #ffffff;"></i></a>
                      <a href="#!"><i class="fa-brands fa-instagram fa-lg" style="color: #ffffff;"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}