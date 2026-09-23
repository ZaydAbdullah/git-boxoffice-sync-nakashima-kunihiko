# Box Office Sync - Workflow

## Final calculateTicketPrice

```js
function calculateTicketPrice(quantity, basePrice, vip) {
  let price = Math.round(quantity * basePrice);
  if (quantity >= 5) {
    price = price * 0.9;
  }
  if (vip) {
    price = price * 1.5;
  }
  price = price - 10;
  return price;
}Q1 - Walk through the final calculateTicketPrice
The final function contains four behaviors that each came from a different contributor and survived three rounds of reconciliation. Math.round(quantity * basePrice) came from contributor B, who replaced the original Math.floor. The group discount (quantity >= 5, price *= 0.9) came from contributor A. The VIP surcharge (vip, price *= 1.5) came from contributor C. The flat discount (price -= 10) was added by A in Task 6 and placed after the VIP check so it acts as a final adjustment.

Q2 - Two-way vs. three-way conflict
In Task 3, only two contributors touched the same function, so the conflict had two clear sides - B's rounding vs. A's group discount - and it was easy to keep both. In Task 5, three independent edits landed in overlapping lines of the same function. Keeping all three required deciding not just which lines to keep but how they should interact: the VIP surcharge had to apply after the group discount, and the flat discount had to apply last. The mechanical work is the same, but the reasoning load is higher because you are reconciling intent, not just text.

Q3 - Why the flat discount broke unrelated tests
The tests assert exact output values of calculateTicketPrice. The flat discount changes the return value for every input, including inputs that only exercise the group-discount path or the VIP path. Even though the discount was added by one contributor and the other tests belong to other features, all of them observe the same shared function. Nothing in a shared codebase is truly isolated when it depends on a function's output.

Q4 - What one process change would prevent all rejected pushes?
Fetch first, before starting work or before pushing. If each contributor ran git fetch immediately before making their change and rebased or merged onto the latest remote branch, the divergence would be caught and reconciled locally, and every push would be a clean fast-forward.

Screenshots
Task 1 - Clone A adds group discount
https://screenshots/task-01-group-discount.png

Task 2 - Clone B push rejected
https://screenshots/task-02-rejected-push.png

Task 3 - Clone B merge resolved
https://screenshots/task-03-merge-resolved.png

Task 4 - Clone C push rejected
https://screenshots/task-04-rejected-push.png

Task 5 - Clone C three-way merge
https://screenshots/task-05-three-way-merge.png

Task 6 - Clone A rebase resolved
https://screenshots/task-06-rebase-resolved.png

Task 7 - Merge to main, tagged
https://screenshots/task-07-tag-and-main.png
