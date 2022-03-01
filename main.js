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

// 상품을 장바구니에 드래그&드롭하면 장바구니에 추가됨.
const cartBox = document.querySelector(".shop__cart__card--box");
const cartList = document.querySelector(".shop__cart__card--cartlist");
const cartListContainer = document.querySelector(".cartlist__product");
const cartListItem = `<div class="cartlist__product">
<img src="/pr1.JPG" alt="shopitem" class="cartlist__product__img">
<div class="cartlist__product__option">
    <p class="cartlist__product__title">식기세척기</p>
    <p class="cartlist__product__brand">세척나라</p>
    <p class="cartlist__product__price">100000</p>
    <span>수량<input type="text" class="cartlist__product__quantity"></span>
</div>
</div>`;
let cartCount = 0;

for (let i = 0; i < shopLsItem.length; i++) {
  shopLsItem[i].addEventListener("dragstart", function (e) {
    e.target.classList.add("dragging");
    e.dataTransfer.setData("data", e.target.innerHTML);
    e.dataTransfer.setData("title", shopItemtitle[i].innerHTML);
    e.dataTransfer.setData("brand", shopItemBrand[i].innerHTML);
    e.dataTransfer.setData("price", shopItemPrice[i].innerHTML);
    e.dataTransfer.setData("img", shopItemImg[i].src);
    // e.dataTransfer.setData("text", shopItemPrice[i].innerHTML);
  });

  shopLsItem[i].addEventListener("dragend", function (e) {
    e.target.classList.remove("dragging");
  });
}

cartBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

cartBox.addEventListener("drop", function (e) {
  e.preventDefault();

  let cartItemBox = document.querySelectorAll(".cartlist__product");
  let cartItemTitle = document.querySelectorAll(".cartlist__product__title");
  let cartItemBrand = document.querySelectorAll(".cartlist__product__brand");
  let cartItemPrice = document.querySelectorAll(".cartlist__product__price");
  let cartItemImg = document.querySelectorAll(".cartlist__product__img");

  //  1. 첫번째 요소 생성시 innerHTML이 작동하지 않는다.
  cartListContainer.insertAdjacentHTML("beforeend", cartListItem);
  cartItemBrand[cartCount].innerHTML = e.dataTransfer.getData("brand");
  cartItemPrice[cartCount].innerHTML = e.dataTransfer.getData("price");
  cartItemImg[cartCount].src = e.dataTransfer.getData("img");
  cartItemTitle[cartCount].innerHTML = e.dataTransfer.getData("title");
  cartCount++;
});
