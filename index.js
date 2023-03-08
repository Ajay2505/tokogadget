const body = document.querySelector("body");
const topNavbar = document.getElementById("topNavbar");
const bars = document.getElementById("bars");
const mobileNavItems = document.getElementById("mobileNavItems");
const leftNavbar = document.getElementById("leftNavbar");
const filtersBtn = document.getElementById("filtersBtn");
const mobileCardsDiv = document.getElementById("mobileCardsDiv");

const inputLeft = document.getElementById("input-left");
const inputRight = document.getElementById("input-right");
const thumbLeft = document.querySelector(".slider > .thumb.left");
const thumbRight = document.querySelector(".slider > .thumb.right");
const range = document.querySelector(".slider > .range");
const ratingStars = document.querySelectorAll("#ratingStars div");

body.addEventListener("click", () => {
  leftNavbar.classList.remove("active");
  bars.classList.remove("fa-xmark");
  filtersBtn.classList.remove("fa-xmark");
  mobileNavItems.classList.remove("active");
});

bars.addEventListener("click", (evt) => {
  evt.stopPropagation();
  bars.classList.toggle("fa-xmark");
  mobileNavItems.classList.toggle("active");
  leftNavbar.classList.remove("active");
});

filtersBtn.addEventListener("click", (evt) => {
  evt.stopPropagation();
  filtersBtn.classList.toggle("fa-xmark");
  leftNavbar.classList.toggle("active");
});

topNavbar.addEventListener("click", (evt) => evt.stopPropagation());

leftNavbar.addEventListener("click", (evt) => evt.stopPropagation());

const setLeftRatingValue = (perRating) => {
  let rating;
  switch (perRating) {
    case "25%":
      rating = 1;
      break;
    case "50%":
      rating = 2;
      break;
    case "75%":
      rating = 3;
      break;
    case "100%":
      rating = 4;
      break;
    default:
      rating = 0;
      break;
  }

  ratingStars[rating].children[0].style.color = "#ffe51d";
  ratingStars[rating].children[1].style.color = "#000";
  removeRating();
};

const setRightRatingValue = (perRating) => {
  let rating;
  switch (perRating) {
    case "75%":
      rating = 1;
      break;
    case "50%":
      rating = 2;
      break;
    case "25%":
      rating = 3;
      break;
    case "0%":
      rating = 4;
      break;
    default:
      rating = 0;
      break;
  }
  ratingStars[rating].children[0].style.color = "#ffe51d";
  ratingStars[rating].children[1].style.color = "#000";
  removeRating();
};

const removeRating = () => {
  for (let idx = 0; idx < ratingStars.length; idx++) {
    if (inputLeft.value - 1 === idx || inputRight.value - 1 === idx) {
      continue;
    }
    ratingStars[idx].children[0].style.color = "#fff6af";
    ratingStars[idx].children[1].style.color = "gray";
  }
};

const setLeftValue = () => {
  const _this = inputLeft,
    min = parseInt(_this.min),
    max = parseInt(_this.max);
  const prevLeftRange = range.style.left;

  _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

  var percent = ((_this.value - min) / (max - min)) * 100;

  thumbLeft.style.left = percent + "%";
  range.style.left = percent + "%";
  const currRange = range.style.left;

  if (prevLeftRange === currRange) {
    return;
  }
  setLeftRatingValue(currRange);
};

const setRightValue = () => {
  const _this = inputRight,
    min = parseInt(_this.min),
    max = parseInt(_this.max);
  const prevRightRange = range.style.right;

  _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

  let percent = ((_this.value - min) / (max - min)) * 100;

  thumbRight.style.right = 100 - percent + "%";
  range.style.right = 100 - percent + "%";
  const currRange = range.style.right;

  if (prevRightRange === currRange) {
    return;
  }
  setRightRatingValue(currRange);
};

setRightValue();
setLeftValue();

inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);

const data = [
  {
    name: "Xiaomi 12 pro",
    image: "https://cdn1.smartprix.com/rx-ijrFgC4BZ-w1200-h1200/jrFgC4BZ.jpg",
    spec: "Snapdragon 8 Gen 1",
    price: "12.599.000",
    hasOffer: false,
  },
  {
    name: "Poco F4 GT",
    image:
      "https://xiaomiui.net/wp-content/themes/xiaomiuiwp/assets/phones/devicephotos/poco_f4_gt_ingres_global_3.png",
    spec: "Snapdragon 8 Gen 1",
    price: "8.599.000",
    hasOffer: false,
  },
  {
    name: "Xiaomi 12T 5G",
    image:
      "https://www.kibotek.com/wp-content/uploads/2022/10/kiboTEK_xiaomi_12T_013.png",
    spec: "Snapdragon 8 Gen 1",
    price: "6.699.000",
    hasOffer: true,
    newPrice: "6.299.000",
  },
];

const setMobileCards = () => {
  data.forEach((mobile) => {
    mobileCardsDiv.innerHTML += `
    <div class="w-full h-fit flex flex-col justify-between gap-3 pt-7 pb-4 pl-4 p-2 rounded-md border border-gray-200 boxShadow">
      <div class="self-start w-full">
        <img class="h-36 mb-4 mx-auto" src=${mobile.image} alt=${mobile.name}>
        <h1 class="font-semibold m-0 p-0">${mobile.name}</h1>
         <p class="text-gray-500 m-0">${mobile.spec}</p>
         <p class="${mobile.hasOffer && "text-red-400 "} p-0 m-0">Rp
            ${mobile.hasOffer ? mobile.newPrice : mobile.price}
         </p>
         <p class="${mobile.hasOffer && "line-through "} p-0 m-0">
            ${mobile.hasOffer ? "Rp " + mobile.price : " "}
         </p>
      </div>
      <div class="w-full flex flex-row gap-1 items-center self-end">
        <i class="fa-solid fa-circle text-gray-400 rounded-full"></i>
        <i class="fa-solid fa-circle text-blue-500 rounded-full"></i>
        <i class="fa-solid fa-circle text-pink-500 rounded-full"></i> 
      </div>
    </div> `;
  });
};

setMobileCards();
setMobileCards();
setMobileCards();
setMobileCards();
