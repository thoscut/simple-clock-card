class SimpleClockCard extends Polymer.Element {

  setConfig(config) {
    const cardConfig = Object.assign({}, config);

    if (cardConfig.use_military === null) cardConfig.use_military = true;
    if (cardConfig.hide_seconds === null) cardConfig.hide_seconds = false;

    this._config = cardConfig;
  }
  
  getCardSize() {
    return 1;
  }

  addZero(i){
    if (i < 10){
      i = "0" + i;
    }
    return i;
  }

  startTime() {
	const config = this._config;

    var today = new Date(),
        h = today.getHours(),
        m = today.getMinutes(),
        s = today.getSeconds(),
        p = ( h < 12 ) ? "AM" : "PM";

    m = this.addZero(m);
    s = this.addZero(s);

    let time_str =  (config.use_military ? h % 12 : h ) +
                    ":" +
                    m +
                    (config.hide_seconds ? "" : ":" + s ) +
                    (config.use_military ? " " + p : " ");

    this.content.innerHTML = time_str;

  }

  set hass(hass) {

    if (!this.content) {
      const card = document.createElement('HA-card');
      this.content = document.createElement('div');
      this.content.style.padding = '16px';
      this.content.style.fontSize = '4rem';
      this.style.textAlign = 'center';
      this.content.style.display = 'inline-block';
      
      card.appendChild(this.content);
      this.appendChild(card);
    }
    this.startTime();
    setInterval(this.startTime.bind(this), 250);
  }

}

customElements.define('simple-clock-card', SimpleClockCard);
