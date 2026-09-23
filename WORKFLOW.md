\# Box Office Sync — Workflow



\## Final calculateTicketPrice



```js

function calculateTicketPrice(quantity, basePrice, vip) {

&#x20; let price = Math.round(quantity \* basePrice);

&#x20; if (quantity >= 5) {

&#x20;   price = price \* 0.9;

&#x20; }

&#x20; if (vip) {

&#x20;   price = price \* 1.5;

&#x20; }

&#x20; price = price - 10;

&#x20; return price;

}



Q1 — Walk through the final calculateTicketPrice

The final function contains four behaviors that each came from a different contributor and survived three rounds of reconciliation. Math.round(quantity \* basePrice) came from contributor B, who replaced the original Math.floor. The group discount if (quantity >= 5) price = price \* 0.9 came from contributor A. The VIP surcharge if (vip) price = price \* 1.5 came from contributor C. The flat discount price = price - 10 was added by A in Task 6, and placed after the VIP check so it acts as a final adjustment on the computed price.



Q2 — Two-way vs. three-way conflict

In Task 3, only two contributors touched the same function, so the conflict had two clear sides — B's rounding vs. A's group discount — and it was easy to keep both. In Task 5, three independent edits landed in overlapping lines of the same function. Keeping all three required deciding not just which lines to keep but how they should interact: the VIP surcharge had to apply after the group discount, and later the flat $10 discount had to apply last. The mechanical work is the same, but the reasoning load is higher because you're reconciling intent, not just text.



Q3 — Why the flat $10 discount broke unrelated tests

The tests assert exact output values of calculateTicketPrice. The flat discount changes the return value for every input, including inputs that only exercise the group-discount path or the VIP path. Even though the discount was added by one contributor and the other tests "belong" to other features, all of them observe the same shared function. Nothing in a shared codebase is truly isolated when it depends on a function's output.



Q4 — What one process change would prevent all rejected pushes?

Fetch first, before starting work or before pushing. If each contributor ran git fetch immediately before making their change and rebased or merged onto the latest remote branch, the divergence would be caught and reconciled locally, and every push would be a clean fast-forward.



