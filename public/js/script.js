console.log("Client side js online");

const weatherBtn = document.getElementById("btn-search");
const searchText = document.getElementById("search");
const listWeather = document.getElementById("list");

function renderWeather({ forecast, location } = {}) {
  const weatherHTML = `
    <li>${forecast}</li>
    <li>${location}</li>
    `;
  listWeather.insertAdjacentHTML("afterbegin", weatherHTML);
}

function renderMessage(message) {
  const messageHTML = `<p>${message}</p>`;
  listWeather.insertAdjacentHTML("afterbegin", messageHTML);
}
weatherBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const location = search.value;
  if (!location) {
    return;
  }
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        renderMessage("Something went wrong");
      }

      renderWeather(data);
    });
  });
});
