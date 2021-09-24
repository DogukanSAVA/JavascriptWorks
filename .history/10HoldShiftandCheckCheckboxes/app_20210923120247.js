//Select Element
const mailInputs = document.querySelectorAll(".mailInput");
const newMail = document.querySelector("#message");
const mailItems = document.querySelectorAll(".mailItem");
const mailBox = document.querySelector("#mailBox")
const deleteSelectedMails = document.querySelector(".btnDeleteSelected");
const deleteAllMails = document.querySelector(".btnDeleteAll")
const markAsRead = document.querySelector(".btnMarkAsRead");

//Add event listeners
mailInputs.forEach((mailInput) =>
  mailInput.addEventListener("click", selectInput)
);
mailItems.forEach((mailItem) =>
  mailItem.addEventListener("click", mailItemDeleteToUI)
);
deleteSelectedMails.addEventListener("click", deleteSelected);
deleteAllMails.addEventListener("click",deleteAll)
markAsRead.addEventListener("click",markRead)

//Hold Shift and Check Checkboxes
let lastCheck = false;
function selectInput(e) {
  let inBetween = false;
  if (this.checked === true && e.shiftKey === true) {
    mailInputs.forEach((mailInput) => {
      if (mailInput === this || mailInput === lastCheck) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        mailInput.checked = true;
      }
    });
  }
  lastCheck = this;
}

//Delete mail item
function mailItemDeleteToUI(e) {
  if (e.target.className === "fas fa-trash-alt") {
    e.target.parentElement.parentElement.remove();
  }
}

//Delete selected mails
function deleteSelected(e) {
  mailInputs.forEach((mailInput) => {
    if (mailInput.checked) {
      mailInput.parentElement.remove();
      
    }
  });
}


//Delete all mails
function deleteAll(){
  
  while(mailBox.firstElementChild != null){
    mailBox.firstElementChild.remove();
  }

}

//Mark as read
function markRead(e){

  mailInputs.forEach(mailInput =>{
    if(mailInput.checked === true){
      mailInput.nextElementSibling.style.backgroundColor = ' #2a87d3'
      mailInput.nextElementSibling.style.color = '#fff'
      mailInput.nextElementSibling.nextElementSibling.firstElementChild.style.color = '#fff'
      console.log(mailInput.nextElementSibling.nextElementSibling.firstElementChild.hover);
    }
    mailInput.checked = false;
  })
}

//How many new mail?
newMail.innerHTML = `
    <i class="fas fa-envelope"></i>
    <p>You have <span>${mailInputs.length}</span> new mail.</p>
`;
