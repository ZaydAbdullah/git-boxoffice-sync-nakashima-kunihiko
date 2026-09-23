function isValidQuantity(quantity) {
  return quantity > 0 && quantity <= 20;
}

function calculateTicketPrice(quantity, basePrice, vip) {
  let price = Math.round(quantity * basePrice);
  if (quantity >= 5) {
    price = price * 0.9;
  }
  if (vip) {
    price = price * 1.5;
  }
  return price;
}

module.exports = { isValidQuantity, calculateTicketPrice };
