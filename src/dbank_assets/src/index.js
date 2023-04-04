import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function() {
  console.log("event loaded successfully");

update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const  button = event.target.querySelector("#submit-btn");
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawalAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  
  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank.topUp(inputAmount);

  };

  if(document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank.withdraw(withdrawalAmount);
  };

  await dbank.compound();

  update();
  
  document.querySelector("#input-amount").value = "";
  document.querySelector("#withdrawal-amount").value = "";
  button.removeAttribute("disabled", "");

  console.log(currentAmount);
});

async function update() {
  const currentAmount = await dbank.checkbalance();
  document.getElementById("value").innerText = Math.round((currentAmount + Number.EPSILON) * 100) / 100;
}