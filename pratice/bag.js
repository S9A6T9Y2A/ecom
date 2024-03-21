const CONVENIENCE_FEES = 99;
let bagItemObjects;
onLoad();

function onLoad(){
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary() {
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItem = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;
    
    bagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;
    });

    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

    bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
        <p>PRICE DETAILS (${totalItem} ITEMS)</p>
        <p><span>Total MRP</span> <span>Rs ${totalMRP}</span></p>
        <hr>
        <p><span>Discount on MRP</span> <span class="totaldiscount">-Rs ${totalDiscount}</span></p>
        <hr>
        <p><span>Convenience Fee</span> <span>Rs 99</span></p>
        <hr>
        <p><span>Total Amount</span> <span>Rs ${finalPayment}</span></p>
        <a href="">CHECKOUT</a>
    </div>`;

}

function loadBagItemObjects(){
    console.log(bagItems);

    bagItemObjects = bagItems.map(itemId => {
        for(let i = 0; i < items.length; i++){
            if(itemId == items[i].id){
                return items[i];
            }
        }

    });

}

function displayBagItems(){
    let containerElement = document.querySelector('.bag-item-container');
    let innerHTML = '';
    bagItemObjects.forEach(bagItem => {
        innerHTML += generateItemHTML(bagItem);    
    });
    containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagItems();
    displayBagIcon();
    displayBagSummary();

}


function generateItemHTML(item){
    return `<div class="item-left-part">
    <img class="bag-item-img" src="${item.image}" alt="item image">
    <div class="content">
        <h4 class="company">${item.company}</h4>
        <h4 class="item-name">${item.item_name}</h4>
        <h4 class="current-price">Rs ${item.current_price}</h4>
        <h4 class="original-price">Rs ${item.original_price}</h4>
        <h4 class="discount-percentage">(${item.discount_percentage}% OFF)</h4>
        <h4 class="return-period-days">${item.return_period}</h4>
        <h4 class="delivery-details-days">${item.delivery_date}</h4>
        <p class="btn-area">
            <i class="fa fa-trash" onclick="removeFromBag(${item.id})"></i>
            <span class="remove-from-cart" onclick="removeFromBag(${item.id})">Remove</span>

        </p>
    </div>
</div>`;
}