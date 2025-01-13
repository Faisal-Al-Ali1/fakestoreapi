const apiUrl = "https://6784b24f1ec630ca33a5366f.mockapi.io/users";
const cardsContainer = document.querySelector(".cardsContainer");

function Product(title, price, description, image) {
  this.title = title;
  this.price = price;
  this.description = description;
  this.image = image;
}

function fetchData() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.map((element) => {
        const product = new Product(
          element.title,
          element.price,
          element.description,
          element.image
        );
        render(product);
      });
    })
    .catch((error) => console.log("error fetching data", error));
}

fetchData();

function createProduct(newProduct) {
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => response.json())
    .then((createdProduct) => {
      render(createdProduct);
      alert("Product created successfully!");
    })
    .catch((error) => console.log("Error creating product", error));
}

// create
const newProduct = new Product(
  "New Title",
  99.99,
  "New Description",
  "image-url.jpg"
);
//   createProduct(newProduct);

function render(input) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
      <img src="${input.image}" alt="${input.title}">
      <h2>${input.title}</h2>
      <p>${input.description}</p>
      <p>Price: $${input.price}</p>
      <button class="update-btn">Update Title</button>
      <button class="delete-btn">Delete Product</button>
    `;

  card.querySelector(".update-btn").addEventListener("click", () => {
    const newTitle = prompt("Enter new title:");
    if (newTitle) {
      fetch(`${apiUrl}/${input.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      })
        .then((response) => response.json())
        .then(() => {
          card.querySelector("h2").textContent = newTitle;
          alert("Title updated successfully!");
        })
        .catch((error) => console.log("Error updating title:", error));
    }
  });

  card.querySelector(".delete-btn").addEventListener("click", () => {
    fetch(`${apiUrl}/${input.id}`, { method: "DELETE" })
      .then(() => {
        card.remove();
        alert("Product deleted successfully!");
      })
      .catch((error) => console.log("Error deleting product:", error));
  });

  cardsContainer.appendChild(card);
}
