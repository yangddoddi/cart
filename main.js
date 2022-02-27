"use strict";

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

// res를 빙글빙글 돌면서 제품명 브랜드 이미지 가격을 대입해주세요
