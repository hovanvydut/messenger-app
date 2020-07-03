async function getToken() {
  const token = window.localStorage.getItem('token');
  if (!token) return window.location.replace('/account/login');

  const data = parseToken(token);

  if (data.exp * 1000 < Date.now()) {
    try {
      const idToken = await firebase.auth().currentUser.getIdToken(true);
      window.localStorage.setItem('token', idToken);
    } catch (error) {
      window.localStorage.removeItem('token');
      return window.location.replace('/account/login');
    }
  }

  // if (!token) return window.location.replace('/account/login');
  return token;
}

function parseToken(token) {
  return JSON.parse(atob(token.split('.')[1]));
}

window.addEventListener('DOMContentLoaded', async (event) => {
  const token = await getToken();
  if (!token) return window.location.replace('/account/login');

  const userData = parseToken(token);

  //! update profile
  const editProfileModal = document.getElementById('editProfileModal');
  if (editProfileModal) {
    const emailEditProfile = document.getElementById('emailEditProfile');
    const phoneEditProfile = document.getElementById('phoneEditProfile');
    emailEditProfile.value = userData.email ? userData.email : '';
    phoneEditProfile.value = userData.phone_number ? userData.phone_number : '';
  }

  document
    .getElementById('saveBtnEditProfile')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const payload = {
        fullName: document.getElementById('fullNameEditProfile').value,
        city: document.getElementById('cityEditProfile').value,
        email: document.getElementById('emailEditProfile').value,
        phone: document.getElementById('phoneEditProfile').value,
        website: document.getElementById('websiteEditProfile').value,
      };
      axios({
        method: 'POST',
        url: '/profile/update',
        data: payload,
        headers: { Authorization: `Bearer ${token}` },
      });
    });

  //! Sign out when user click button
  document.getElementById('signOutBtn').addEventListener('click', (event) => {
    event.preventDefault();
    window.localStorage.removeItem('token');
    window.location.replace('/account/login');
  });

  //! Add Friend Modal
  document
    .getElementById('addFriendBtn')
    .addEventListener('click', async (event) => {
      event.preventDefault();
      const email = document.getElementById('emailAddFriend').value;
      const messageAddFriend = document.getElementById('messageAddFriend')
        .value;
      try {
        await axios({
          method: 'POST',
          url: '/friends/request',
          data: { emailReceiver: email, messageAddFriend },
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire({
          icon: 'success',
          text: 'Sended friend request successfully',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: error.response.data.message,
        });
      }
    });

  //! Add Friend Sidebar
  document
    .getElementById('getAllFriendRequestBtn')
    .addEventListener('click', getAllFriendRequest.bind(null, token));
  document
    .getElementById('addFriendNavigation')
    .addEventListener('click', getAllFriendRequest.bind(null, token));

  //! All Friends
  document
    .getElementById('allFriendsBtn')
    .addEventListener('click', async (event) => {
      event.preventDefault();
      try {
        const token = await getToken();
        const response = await axios({
          method: 'GET',
          url: '/friends/all',
          headers: { Authorization: `Bearer ${token}` },
        });
        let html = response.data
          .map((user) => genViewAllFriendSidebar(user))
          .join('');
        document.getElementById('allFriendsContainer').innerHTML = html;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: error.response.data.message,
        });
      }
    });
});

async function getAllFriendRequest(token) {
  try {
    const response = await axios({
      method: 'GET',
      url: '/friends/requests',
      headers: { Authorization: `Bearer ${token}` },
    });
    let html = response.data
      .map(
        (user) =>
          `<li id=${
            'invitation-friend-' + user.id
          } class="list-group-item"><div><figure class="avatar"><img class="rounded-circle" src=${
            user.avatar
          }></figure></div><div class="users-list-body"><h5>${
            user.username
          }</h5><p>${
            user.messageAddFriend
          }</p><div class="users-list-action action-toggle"><div class="dropdown"><a data-toggle="dropdown" href="#"><i class="ti-more"></i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-userid=${
            user.id
          } onClick="acceptRequestFriend.call(this, event)">Accept</a><a class="dropdown-item" href="#" data-navigation-target="contact-information">Profile</a><a class="dropdown-item" href="#" onClick="deleteFriendRequest.call(this, event)" data-userid=${
            user.id
          }>Delete</a></div></div></div></div></li>`
      )
      .join('');
    document.getElementById('listFriendRequestContainer').innerHTML = html;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      text: error.response.data.message,
    });
  }
}

async function acceptRequestFriend(event) {
  event.preventDefault();

  try {
    const token = await getToken();
    await axios({
      method: 'PATCH',
      url: '/friends/accept',
      data: { senderId: this.dataset.userid },
      headers: { Authorization: `Bearer ${token}` },
    });
    const elm = document.getElementById(
      'invitation-friend-' + this.dataset.userid
    );
    elm.parentNode.removeChild(elm);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      text: error.response.data.message,
    });
  }
}

async function deleteFriendRequest(event) {
  event.preventDefault();
  try {
    const token = await getToken();
    await axios({
      method: 'DELETE',
      url: `/friends/${this.dataset.userid}/request`,
      headers: { Authorization: `Bearer ${token}` },
    });
    const elm = document.getElementById(
      'invitation-friend-' + this.dataset.userid
    );
    elm.parentNode.removeChild(elm);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      text: error.response.data.message,
    });
  }
}

function genViewAllFriendSidebar(user) {
  return `<li id=${
    'allFriend-' + user.id
  } class="list-group-item"><div><figure class="avatar"><img class="rounded-circle" src="dist/images/man_avatar2.jpg"></figure></div><div class="users-list-body"><h5>${
    user.username
  }</h5><p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p><div class="users-list-action action-toggle"><div class="dropdown"><a data-toggle="dropdown" href="#"><i class="ti-more"></i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" onClick="deleteFriendRelationship.call(this, event)" data-deletinguserid=${
    user.id
  }>Delete</a></div></div></div></div></li>`;
}

async function deleteFriendRelationship(event) {
  event.preventDefault();

  try {
    const token = await getToken();
    await axios({
      method: 'PATCH',
      url: '/friends/accept',
      data: { senderId: this.dataset.userid },
      headers: { Authorization: `Bearer ${token}` },
    });
    const elm = document.getElementById(
      'invitation-friend-' + this.dataset.userid
    );
    elm.parentNode.removeChild(elm);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      text: error.response.data.message,
    });
  }
}

async function deleteFriendRelationship(event) {
  event.preventDefault();

  try {
    const token = await getToken();
    const deletingUserId = this.dataset.deletinguserid;
    await axios({
      method: 'DELETE',
      url: `/friends/${deletingUserId}/delete`,
      data: { deletingUserId: deletingUserId },
      headers: { Authorization: `Bearer ${token}` },
    });
    const elm = document.getElementById('allFriend-' + deletingUserId);
    elm.parentNode.removeChild(elm);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      text: error.response.data.message,
    });
  }
}
