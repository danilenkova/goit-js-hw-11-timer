// Timer
class CountdownTimer {
    // Делаем конструктор таймер
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
    }
    // Запускаем таймер
    start() {
        let id = 0;
        const timer = document.querySelector(this.selector);
        const refs = {
            days: timer.querySelector('[data-value="days"]'),
            daysLabel: timer.querySelector('[data-value="days"]+.label'),
            hours: timer.querySelector('[data-value="hours"]'),
            mins: timer.querySelector('[data-value="mins"]'),
            secs: timer.querySelector('[data-value="secs"]'),
        }
        if (id) return;
        id = setInterval(() => {
            const currentDate = Date.now();
            const time = this.targetDate - currentDate;
            const days = Math.floor(time / (1000 * 60 * 60 * 24));
            const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((time % (1000 * 60)) / 1000);
            refs.days.textContent = String(days).padStart(3, "0");
            refs.hours.textContent = String(hours).padStart(2, "0");
            refs.mins.textContent = String(mins).padStart(2, "0");
            refs.secs.textContent = String(secs).padStart(2, "0");
        }, 1000);
    }
}

const myTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2022'),
});

myTimer.start();