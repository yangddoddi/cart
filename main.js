"use strict";

const shopItemList = document.querySelector(".shop__itemList");
const searchBox = document.querySelector("#searchBox");

function loadItems() {
  return fetch("./store.json")
    .then((res) => res.json())
    .then((json) => json.products);
}

function displayShopItems(products) {
  shopItemList.innerHTML = products
    .map((product) => creatShopItem(product))
    .join("");
}

function creatShopItem(product) {
  return `<div data-id=${product.id} class="shop__itemList__item" draggable="true">
  <img src=${product.photo} alt="shopItemImg" class="shop__itemList__img" draggable="false">
  <h3 class="shop__itemList__item--productName">
      ${product.product_name}
  </h3>
  <span class="shop__itemList__item--branName">
      ${product.brand_name}
  </span>
  <span class="shop__itemList__item--price">
      ${product.price}
  </span>
</div>`;
}

function searchFilter() {
  const value = searchBox.value;
  const shopItemName = document.querySelectorAll(
    ".shop__itemList__item--productName"
  );
  shopItemName.forEach((e) => {
    if (e.innerText.search(value) > -1) {
      showOrHideItem(e.parentElement, "flex");
    } else {
      showOrHideItem(e.parentElement, "none");
    }
  });
}

function showOrHideItem(target, showOrHide) {
  target.style.display = `${showOrHide}`;
}

// 드래그 이벤트 모음
function dragEvent() {
  const shopItem = document.querySelectorAll(".shop__itemList__item");
  const dropArea = document.querySelector(".cart__cartBox__dropArea");

  for (let i = 0; i < shopItem.length; i++) {
    shopItem[i].addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.dataset.id);
    });
  }

  dropArea.addEventListener("dragover", dragOverHandler);
  dropArea.addEventListener("drop", dropHandler);
}

function creatCartITem(i) {
  const shopItem = document.querySelectorAll(".shop__itemList__item");
  const shopItemImg = document.querySelectorAll(".shop__itemList__img");
  const shopItemName = document.querySelectorAll(
    ".shop__itemList__item--productName"
  );
  const shopItemBrand = document.querySelectorAll(
    ".shop__itemList__item--branName"
  );
  const shopItemPrice = document.querySelectorAll(
    ".shop__itemList__item--price"
  );
  return `<div class="cart__cartBox__itemList--item" data-id='${shopItem[i].dataset.id}'>
  <img src="${shopItemImg[i].src}" alt="cartItemImg">
  <h3 class="cartItem__productName">
      ${shopItemName[i].innerText}
  </h3>
  <span class="cartItem__brandName">
  ${shopItemBrand[i].innerText}
  </span>
  <form>
      <label class="cartItemQuantity">수량</label>
      <input type="number" class="cartItemInput" data-id-input='${shopItem[i].dataset.id}' value=0>
      <input type="text" style="display:none">
  </form>
  <span class="cartItem__price" data-price='${shopItemPrice[i].innerText}'>${shopItemPrice[i].innerText}</span>
</div>
</div>`;
}

function dropHandler(e) {
  const cartItemList = document.querySelector(".cart__cartBox__itemList");
  const dataId = e.dataTransfer.getData("text");
  const exists = document.querySelectorAll(`[data-id='${dataId}']`);

  if (exists.length < 2) {
    cartItemList.insertAdjacentHTML("beforeend", creatCartITem(dataId));
    increaseQuantity(dataId);
    updateCart();
  } else {
    increaseQuantity(dataId);
    updateCart();
  }

  writeInputBox();
}

function dragOverHandler(e) {
  e.preventDefault();
}

function increaseQuantity(id) {
  const cartItemInput = document.querySelector(`[data-id-input='${id}']`);
  cartItemInput.value = Number(cartItemInput.value) + 1;
}

function updateCart() {
  const cartItemQuantity = document.querySelectorAll(".cartItemInput");
  const cartItemPrice = document.querySelectorAll(".cartItem__price");
  const totalPrice = document.querySelector(".cart__cartBox__totalPrice");

  for (let i = 0; i < cartItemPrice.length; i++) {
    cartItemPrice[i].innerText = `${
      cartItemPrice[i].dataset.price * Number(cartItemQuantity[i].value)
    }`;
  }

  let total = 0;
  cartItemPrice.forEach(function (e) {
    total = total + Number(e.innerText);
  });

  totalPrice.innerText = total;
}

function writeInputBox() {
  const cartItemQuantity = document.querySelectorAll(".cartItemInput");
  cartItemQuantity.forEach((e) => {
    e.addEventListener("keyup", (event) => {
      updateCart();
    });
  });
}

function clickPurchaseBtn() {
  const cartItemList = document.querySelector(".cart__cartBox__itemList");
  const container = document.querySelector(".cart");
  const purchaseBtn = document.querySelector(".cart__cartBox__purchaseBtn");
  const blackBackground = document.querySelector(".blackBackground");
  const modal = document.querySelector(".purchase__modal");
  const modalSubmitBtn = document.querySelector(".purchase__modal__submitBtn");
  const cancelPurchaseBtn = document.querySelector(
    ".purchase__modal__cancelBtn"
  );
  const receipt = document.querySelector(".receiptContainer");
  const receiptBtn = document.querySelector(".receiptBtn");

  container.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON" && e.target.tagName !== "INPUT") {
      return;
    }
    if (e.target == purchaseBtn) {
      if (!cartItemList.hasChildNodes()) {
        alert("상품을 담아주세요.");
      } else {
        showOrHideItem(blackBackground, "block");
        showOrHideItem(modal, "block");
      }
    }
    if (e.target == cancelPurchaseBtn) {
      showOrHideItem(blackBackground, "none");
      showOrHideItem(modal, "none");
    }
    if (e.target == modalSubmitBtn) {
      updateReceipt();
      showOrHideItem(modal, "none");
      showOrHideItem(receipt, "block");
    }
    if (e.target == receiptBtn) {
      showOrHideItem(receipt, "none");
      showOrHideItem(blackBackground, "none");
    }
  });
}

function updateReceipt() {
  const today = new Date();
  const cartItemName = document.querySelectorAll(".cartItem__productName");
  const cartItemBrand = document.querySelectorAll(".cartItem__brandName");
  const cartItemQuantity = document.querySelectorAll(".cartItemInput");
  const cartItemPrice = document.querySelectorAll(".cartItem__price");
  const totalPrice = document.querySelector(".cart__cartBox__totalPrice");
  const receipt = document.querySelector("#receipt");
  const ctx = receipt.getContext("2d");
  ctx.font = "20px serif";
  ctx.fillText("영수증", 30, 50);
  ctx.font = "12px serif";
  ctx.fillText(today.toLocaleDateString(), 30, 70);
  ctx.fillText(today.toLocaleTimeString(), 120, 70);
  for (let i = 0; i < cartItemName.length; i++) {
    ctx.font = "16px serif";
    ctx.fillText(` 제품명 : ${cartItemName[i].innerText}`, 30, 100 * (i + 1));
    ctx.fillText(
      ` 브랜드 : ${cartItemBrand[i].innerText}`,
      30,
      100 * (i + 1) + 20
    );
    ctx.fillText(
      ` 수량 : ${cartItemQuantity[i].value}개`,
      30,
      100 * (i + 1) + 40
    );
    ctx.fillText(
      ` 금액 : ${cartItemPrice[i].innerText}원`,
      30,
      100 * (i + 1) + 60
    );
  }
  ctx.fillText(` 총액 : ${totalPrice.innerText}원`, 400, 500);
}

loadItems()
  .then((products) => {
    displayShopItems(products);
  })
  .then(() => {
    dragEvent();
    clickPurchaseBtn();
    searchBox.addEventListener("keyup", searchFilter);
  });
