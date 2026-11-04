// Demo task: Show a list of users on the page
const spinner = document.querySelector("#spinner");
const ul = document.querySelector("#userList");

async function displayUsers() {
  spinner.textContent = "Loading....";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Error to fetch users");
    }
    const users = await response.json();
    spinner.textContent = "";
    console.log(users);
  } catch (err) {
    spinner.textContent = "Something wrong" + err.message;
  }
}
displayUsers();
