 let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    function isValidURL(url) {
  try {
    const parsedUrl = new URL(url);
    const validExtensions = [".com", ".net", ".org", ".edu", ".gov", ".io", ".co", ".dev", ".me"];
    return validExtensions.some(ext => parsedUrl.hostname.endsWith(ext));
  } catch (_) {
    return false;
  }
}

    function displayBookmarks() {
      const tableBody = document.querySelector("#bookmarkTable tbody");
      tableBody.innerHTML = "";
      bookmarks.forEach((bookmark, index) => {
        tableBody.innerHTML += `
          <tr>
            <td>${bookmark.name}</td>
            <td><a href="${bookmark.url}" target="_blank"><button>Visit</button></a></td>
            <td><button onclick="deleteBookmark(${index})">Delete</button></td>
          </tr>
        `;
      });
    }

function addBookmark() {
  const nameInput = document.getElementById("bookmarkName");
  const urlInput = document.getElementById("bookmarkURL");
  const errorDiv = document.getElementById("error");

  const name = nameInput.value.trim();
  let url = urlInput.value.trim();

  if (name.length < 3){
    errorDiv.textContent = "⚠️ The name must have at least 3 characters.";
    errorDiv.style.display = "block";
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  if (name === "" || url === "") {
    errorDiv.textContent = "⚠️ Please fill in both fields.";
    errorDiv.style.display = "block";
    return;
  }

  if (!isValidURL(url)) {
    errorDiv.textContent = "❌ Invalid URL. Make sure the link has a valid suffix like: example.com or example.net";
    errorDiv.style.display = "block";
    return;
  }

  errorDiv.textContent = "";
  errorDiv.style.display = "none";


  bookmarks.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks();

  nameInput.value = "";
  urlInput.value = "";
}


    function deleteBookmark(index) {
      bookmarks.splice(index, 1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      displayBookmarks();
    }

    displayBookmarks();