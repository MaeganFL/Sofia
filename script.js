/* Author: Maegan Marlow
Date: 09/08/2023   

Filename: script.js
*/

'use strict';



function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function setupLightbox() {
    document.querySelectorAll('.product-item img').forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src));
    });
}

function openLightbox(imageSrc) {
    const lightboxElement = document.createElement('div');
    lightboxElement.classList.add('lightbox');
    lightboxElement.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="Product Image">
            <button onclick="closeLightbox()">Close</button>
        </div>
    `;
    document.body.appendChild(lightboxElement);
}

function closeLightbox() {
    const lightboxElement = document.querySelector('.lightbox');
    document.body.removeChild(lightboxElement);
}

function setupCartFeature() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.product-item button').forEach((button, index) => {
        button.addEventListener('click', function() {
            const productName = document.querySelectorAll('.product-item p')[index * 2].innerText;
            cart.push(productName);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount(); // Calling the function here to update cart count when a new item is added
        });
    });
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = cart.map((item, index) => `<p>${item} <button onclick="removeCartItem(${index})">Remove</button></p>`).join('');
    }
}

function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function setupFormValidation() {
    const formElement = document.querySelector('form');
    if (formElement) {
        formElement.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                e.preventDefault();
                alert('All fields are required.');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    setupSmoothScroll();
    setupLightbox();
    setupCartFeature();
    setupFormValidation();
    displayCartItems();
    updateCartCount(); // Calling the function here to update cart count when the page loads
});