document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");
  if (query) {
    document.getElementById(
      "search-query"
    ).innerText = `You searched for: ${query}`;
    fetchSearchResults(query);
  } else {
    document.getElementById("search-query").innerText =
      "No search query provided.";
  }
});

function fetchSearchResults(query) {
  const products = [
    {
      name: "Crack Pals V2 board GOLD EDITION",
      price: "549,00 kr",
      image: "img/skateboard.webp",
    },
    {
      name: "Crack Pals board",
      price: "549,00 kr",
      image: "img/skateboard2.webp",
    },
    {
      name: "Crack Pals V2 board",
      price: "549,00 kr",
      image: "img/skateboard3.webp",
    },
    {
      name: "CP Development board",
      price: "549,00 kr",
      image: "img/skateboard4.webp",
    },
    {
      name: "Planet logo 6 Panel cap / OAK / NEON RED",
      price: "299,00 kr",
      image: "img/cap1.webp",
    },
    {
      name: "6 Panel cap / BLACK / ELEPHANT",
      price: "299,00 kr",
      image: "img/cap2.webp",
    },
    {
      name: "Planet logo 6 Panel cap / GREY / NAVY",
      price: "299,00 kr",
      image: "img/cap3.webp",
    },
    {
      name: "Planet logo 6 Panel cap / BLACK / PALE YELLOW",
      price: "299,00 kr",
      image: "img/cap4.webp",
    },
    {
      name: "CP logo T-shirt / MINT",
      price: "299,00 kr",
      image: "img/shirt1.webp",
    },
    {
      name: "Multico logo T-shirt / WHITE",
      price: "299,00 kr",
      image: "img/shirt2.webp",
    },
    {
      name: "Multico logo T-shirt / CORAL",
      price: "299,00 kr",
      image: "img/shirt3.webp",
    },
    {
      name: "Multico logo T-shirt / HEATHER",
      price: "299,00 kr",
      image: "img/shirt4.webp",
    },
  ];

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (results.length > 0) {
    results.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");

      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.name;

      const productName = document.createElement("h3");
      productName.textContent = product.name;

      const productPrice = document.createElement("p");
      productPrice.textContent = product.price;

      productDiv.appendChild(productImage);
      productDiv.appendChild(productName);
      productDiv.appendChild(productPrice);

      resultsContainer.appendChild(productDiv);
    });
  } else {
    resultsContainer.innerHTML = "<p>No products found.</p>";
  }
}

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
