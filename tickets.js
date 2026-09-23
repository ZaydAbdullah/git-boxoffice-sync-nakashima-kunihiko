function isValidQuantity(quantity) {
  return quantity > 0 && quantity <= 20;
}

function calculateTicketPrice(quantity, basePrice) {
  let price = Math.floor(quantity * basePrice);
  if (quantity >= 5) {
    price = price * 0.9;
  }
  return price;
}

module.exports = { isValidQuantity, calculateTicketPrice };
