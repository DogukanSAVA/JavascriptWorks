//Elementleri Seçme
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    clearInterval(countdown);

    const now = Date.now(); // 1 ocak 1970 00:00 dan bu yana gecen milisaniye sayisini dondurur.
    const then = now + seconds * 1000;

    displayTimeLeft(seconds); // kalan sure
    displayEndTime(then); //bitis zamani

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)

        if(secondsLeft < 0){
            //durdurulmasi gerektigini kontrol eder
            clearInterval(countdown)
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000)
}

function displayTimeLeft(seconds) {
    //Gelen kalan saniyeyi dakikaya ceviriyoruz.
    const minutes = Math.floor(seconds / 60);
    //dakika donusumunden arta kalan saniyeleri aliyoruz.
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    //geri sayimi title da gosteriyoruz.
    document.title = display;
    //geri sayimi ekranda yazdiriyoruz.
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
    // 1 ocak 1970 00:00 dan bu yana gecen milisaniyeye geri sayim olarak verdigimiz zaman ekleniyor
    const end = new Date(timestamp);
    //saat olarak alma
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    //dakika olarak alma
    const minutes = end.getMinutes();
    //ekranda gosterme
    endTime.textContent = `Saat ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}'de zaman dolacak.`;
}

function startTimer(){
    //butonlar ile geri sayim baslatma
    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}
//butonlara click eventi atama
buttons.forEach(button => button.addEventListener('click',startTimer));

document.customForm.addEventListener('submit',function(e){
    //inputa girilen deger ile geri sayim baslatma
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins*60);
    this.reset();
})

