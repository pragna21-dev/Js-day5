// Demo task: Show a list of users on the page
const spinner = document.querySelector("#spinner");
const ul = document.querySelector("#userList");
let users;
async function getUserApi() {
  spinner.textContent = "Loading....";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Error to fetch users");
    }
    users = await response.json();
    spinner.textContent = "";
    displayUsers(users);
    displayUserName(users);
  } catch (err) {
    spinner.textContent = "Something wrong" + err.message;
  }
}
function displayUsers(usersData) {
  ul.innerHTML = ""; //issue when search list append searched user so clear first
  usersData.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.name} | ${user.email} |  ${user.address.city}`;
    ul.appendChild(li);
  });
}
getUserApi();
//task 1
//Use setTimeout to show "Welcome" on the page after 3 second

// setTimeout(() => {
//   console.log("Welcome");
// }, 3000);

//task2
//: Get users from JSONPlaceholder and show a list of names.

function displayUserName(usersData) {
  usersData.map((u) => {
    console.log(`Users Name: ${u.name}`);
  });
}

//task3
//Get posts ( /posts ) and show the first 10 titles. (Hint: data.slice(0, 10) )
async function getUsersPostApi() {
  spinner.textContent = "Loading Posts....";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error(" Error fetch to get user's post");
    }
    const posts = await response.json();
    spinner.textContent = "";
    console.log("Users Post ", posts.slice(0, 10));
  } catch (error) {
    console.log("error:", error.message);
    spinner.textContent = "Something wrong" + error.message;
  }
}
getUsersPostApi();
//task4
// Add a loading text/spinner and an error message. Test the error by using a
// wrong URL.

//task5 & 8
// : Build a search box: as you type, the user list filters by name. (Hint: filter +
// includes + toLowerCase() )

//task 8
// Task 8: Add debounce (500ms) to the search box.
let timer = 0;
const searchtxt = document.querySelector("#searchTxt");
searchtxt.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const searchedUser = users.filter((ele) => ele.name.toLowerCase().includes(searchtxt.value.toLowerCase()));
    console.log(searchedUser);
    displayUsers(searchedUser);
  }, 500);
});
//task6
// Joke app: click a button to get a new joke (setup and punchline).
const jokeBtn = document.querySelector("#jokeBtn");
const jokesPara = document.querySelector("#jokes");
let jokes;
jokeBtn.addEventListener("click", () => {
  try {
    getJokeApi();
  } catch (error) {
    console.error("error", error);
  }
});

async function getJokeApi() {
  spinner.textContent = "Loading joke";
  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    if (!response.ok) {
      throw new Error("issue fetch joke");
    }
    jokes = await response.json();
    spinner.textContent = "";
    jokesPara.innerHTML = `<strong> Setup:</strong>${jokes.setup} <br><strong>Punchline</strong>: ${jokes.punchline}`;
  } catch (error) {
    console.log("error:", error.message);
    spinner.textContent = `Error ${error.message}`;
  }
}

// ---------------------------------------------------------task 7 Weather app -------------------------------------------------------------------
//task 7 ask 7: Weather app: use latitude and longitude of a city and show the temperature from Open-Meteo.
const weatherBtn = document.querySelector("#weatherBtn");
const lattitudeTxt = document.querySelector("#lat");
const longitudeTxt = document.querySelector("#long");
const showWeatherP = document.querySelector("#showWeather");

weatherBtn.addEventListener("click", () => {
  getWeatherApi();
});
async function getWeatherApi() {
  const lattitude = lattitudeTxt.value;
  const longitude = longitudeTxt.value;
  //https://api.open-meteo.com/v1/forecast?latitude=21.17&longitude=72.83&current_weather=true
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lattitude}&longitude=${longitude}&current_weather=true`;
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) {
      throw new Error("issue fetch waether app");
    }
    const weatherData = await response.json();
    showWeatherP.textContent = weatherData.current_weather.temperature;
    console.log("weather", weatherData.current_weather.temperature);
  } catch (error) {
    console.log("Error:" + error.message);
  }
}
