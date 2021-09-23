const input = document.querySelectorAll(".controls input"); //select input elements...

function handleUpdate(e) {
  const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix)
    console.log(this.dataset)
  
}

//EventListeners
input.forEach((input) => input.addEventListener("change", handleUpdate));
input.forEach((input) => input.addEventListener("mousemove", handleUpdate));