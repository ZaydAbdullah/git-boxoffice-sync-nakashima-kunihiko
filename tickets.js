function isValidQuantity(quantity) {
  return quantity > 0 && quantity <= 20;
}

function calculateTicketPrice(quantity, basePrice, vip) {
  let total = Math.floor(quantity * basePrice);
  if (vip) {
    total = total * 1.5;
  }
  return total;
}

module.exports = { isValidQuantity, calculateTicketPrice };
