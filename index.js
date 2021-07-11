class CountdownTimer {
    constructor({ selector, targetDate }) {
      this.intervalId = null;
      this.selector = selector;
      this.targetDate = targetDate;
      this.init();
    }
  
    init() {
      let prevTime = this.getTimeComponents(this.targetDate - new Date());
      this.creatEl(prevTime);
      this.intervalId = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = this.targetDate - currentTime;
        const time = this.getTimeComponents(deltaTime);
        for (const key in time) {
          const valueEl = document.querySelector(`[data-value="${key}"]`);
          const valueOldEl = document.querySelector(`[data-value="${key}Old"]`);
          const newValue = time[key];
          const currentValue = prevTime[key];
          const parent = valueEl.parentNode;
          if (newValue !== currentValue) {
            parent.classList.remove('anim');
            valueEl.textContent = newValue;
            valueOldEl.textContent = currentValue;
            const foo = parent.offsetWidth; // reflow hack
            parent.classList.add('anim');
          }
        }
        prevTime = { ...time };
        if (deltaTime < 1000) {
          clearInterval(this.intervalId);
        }
      }, 1000);
    }
  
    getTimeComponents(time) {
      const days = Math.floor(time / (1000 * 60 * 60 * 24));

      const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((time % (1000 * 60)) / 1000);
  
      return { days, hours, minutes, seconds };
    }
  
    pad(value) {
      return String(value).padStart(2, '0');
    }
  
    creatEl(time = {}) {
      const timer1 = document.querySelector(this.selector);
      const timeEl = [];
      for (const key in time) {
        timeEl.push(`<div class="field">
          <div class="values">
            <span class="value" data-value="${key}">${time[key]}</span>
            <span class="valueOld" data-value="${key}Old">${time[key]}</span>
          </div>
          <span class="label">${key[0].toUpperCase() + key.slice(1)}</span>
        </div>`);
        timer1.innerHTML = timeEl.join('');
      }
    }
  }
  
  const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Apr 21, 2022'),
  
  });