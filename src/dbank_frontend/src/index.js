import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async function() {
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount*100)/100;
})

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("#submit-btn");

  const topUpAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawalAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if(document.getElementById("input-amount").value.length != 0) {
    await dbank_backend.topUp(topUpAmount);
  }

  if(document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank_backend.withdraw(withdrawalAmount);
  }

  await dbank_backend.compoundGain();

  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount*100)/100;

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");

});
