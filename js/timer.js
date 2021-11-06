// Timer
class CountdownTimer {
  // Ссылки на элементы разметки
  constructor({ selector }) {
    this.timer = selector;
    this.refs = {
      timerId: 0,
      targetDate: new Date(),
      input: document.querySelector(`${this.timer} [type="datetime-local"]`),
      days: document.querySelector(`${this.timer} [data-value="days"]`),
      hours: document.querySelector(`${this.timer} [data-value="hours"]`),
      mins: document.querySelector(`${this.timer} [data-value="mins"]`),
      secs: document.querySelector(`${this.timer} [data-value="secs"]`),
      startBtn: document.querySelector(`${this.timer} [data-action="start"]`),
      stopBtn: document.querySelector(`${this.timer} [data-action="stop"]`),
      resetBtn: document.querySelector(`${this.timer} [data-action="reset"]`),
    };
    this.refs.startBtn.addEventListener('click', () => this.startTimer());
    this.refs.stopBtn.addEventListener('click', () => this.stopTimer(this.refs.timerId));
    this.refs.resetBtn.addEventListener('click', () => this.reset(this.refs.timerId));
    this.refs.stopBtn.setAttribute('disabled', true);
    this.refs.resetBtn.setAttribute('disabled', true);
    this.reset();
  }
  // Исходные данные таймера
  timerData(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    if (days > 99) {
      this.refs.days.textContent = String(days).padStart(3, '0');
    }
    this.refs.days.textContent = String(days).padStart(2, '0');
    this.refs.hours.textContent = String(hours).padStart(2, '0');
    this.refs.mins.textContent = String(mins).padStart(2, '0');
    this.refs.secs.textContent = String(secs).padStart(2, '0');
  }
  // Запускаем таймер
  startTimer() {
    if (this.refs.timerId) return;
    this.refs.targetDate = new Date(this.refs.input.value);
    if (Date.now() > this.refs.targetDate) {
      clearInterval(this.refs.timerId);
      return confirm('Please enter the correct date in the future');
    }
    if (!this.refs.input.value) {
      alert('Enter a date');
      return;
    }
    this.refs.startBtn.setAttribute('disabled', true);
    this.refs.stopBtn.removeAttribute('disabled');
    this.refs.resetBtn.removeAttribute('disabled');
    this.refs.timerId = setInterval(() => {
      const time = this.refs.targetDate - Date.now();
      this.timerData(time);
      if (time < 0) {
        this.stopTimer(this.refs.timerId);
      }
    }, 1000);
  }
  // Останавливаем таймер
  stopTimer(id) {
    clearInterval(this.refs.timerId);
    this.refs.timerId = 0;
    alert('Timer Stop');
    this.refs.startBtn.removeAttribute('disabled');
    this.refs.stopBtn.setAttribute('disabled', true);
    this.refs.resetBtn.removeAttribute('disabled');
  }
  // Очистить таймер
  reset(id) {
    clearInterval(this.refs.timerId);
    this.refs.timerId = 0;
    this.refs.input.value = '';
    this.refs.startBtn.removeAttribute('disabled');
    this.refs.resetBtn.setAttribute('disabled', true);
    this.refs.days.textContent = '00';
    this.refs.hours.textContent = '00';
    this.refs.mins.textContent = '00';
    this.refs.secs.textContent = '00';
  }
}

const myTimer = new CountdownTimer({
  selector: '#timer-1',
});
