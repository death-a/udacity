const api = "https://reactnd-books-api.udacity.com";

export const createUser = (username, name, password) => {
  let users = (localStorage.getItem("users") === null) ? [] : JSON.parse(localStorage.getItem("users"));
  let userObj = {}
  const tokn = Math.random().toString(36).substr(-8);
  
  userObj["username"] = username;
  userObj["name"] = name;
  userObj["password"] = password;
  userObj["token"] = tokn;
  users.push(userObj);

  localStorage.removeItem("temp_token");
  
  localStorage.setItem("current_username", JSON.stringify(name));
  localStorage.setItem("current_usertoken", JSON.stringify(tokn));
  
  localStorage.setItem("users", JSON.stringify(users));
  return tokn;
}

export const getToken = () => {
  let tokn; 
  if(localStorage.getItem("current_usertoken") !== null) {
    tokn = JSON.parse(localStorage.getItem("current_usertoken"))
  } 
  else if(localStorage.getItem("temp_token") !== null) {
    tokn = JSON.parse(localStorage.getItem("temp_token"))
  } else {
    tokn = Math.random().toString(36).substr(-8);
    localStorage.setItem("temp_token", JSON.stringify(tokn));
  }
  return tokn;
}

export const updateToken = (tokn, name) => {
  localStorage.setItem("current_usertoken", JSON.stringify(tokn));
  localStorage.setItem("current_username", JSON.stringify(name));
  localStorage.removeItem("temp_token");
}

export const logoutUser = () => {
  localStorage.removeItem("current_username");
  localStorage.removeItem("current_usertoken");
  const tempTokn = Math.random().toString(36).substr(-8);
  localStorage.setItem("temp_token", JSON.stringify(tempTokn));
  return tempTokn;
}

export const get = (bookId, header) =>
  fetch(`${api}/books/${bookId}`, { headers: header })
    .then((res) => res.json())
    .then((data) => data.book);

export const getAll = (header) => 
  fetch(`${api}/books`, { headers: header })
    .then((res) => res.json())
    .then((data) => data.books);

export const update = (book, shelf, header) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...header,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = (query, maxResults, header) =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...header,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data.books);