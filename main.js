"use strict";

// 데이터 바인딩

const shopLs = document.querySelector(".shop__list");
const shopLsItem = document.querySelectorAll(".shop__list__item");
const shopItemImg = document.querySelectorAll(".shop__list__item--img");
const shopItemtitle = document.querySelectorAll(".shop__list__item--title");
const shopItemBrand = document.querySelectorAll(".shop__list__item--brand");
const shopItemPrice = document.querySelectorAll(".shop__list__item--price");

const shopData = new XMLHttpRequest();

fetch("/store.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let shopData = data.products;
    for (let i = 0; i < shopData.length; i++) {
      shopItemImg[i].src = shopData[i].photo;
      shopItemtitle[i].innerHTML = shopData[i].product_name;
      shopItemBrand[i].innerHTML = shopData[i].brand_name;
      shopItemPrice[i].innerHTML = shopData[i].price;
    }
  });

// 검색하면 원하는 상품만 보이게

const searchBox = document.querySelector(".searchBox");

searchBox.addEventListener("input", () => {
  for (let i = 0; i < shopItemtitle.length; i++) {
    if (shopItemtitle[i].innerHTML.includes(searchBox.value)) {
      shopLsItem[i].classList.remove("hide");
    } else {
      shopLsItem[i].classList.add("hide");
    }
  }
});

// 서치박스에 메뉴 아이템의 제목에 들어가는 글자가 포함되는 것만 보여주십시오.
