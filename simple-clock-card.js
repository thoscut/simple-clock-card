class SimpleClockCard extends Polymer.Element {

  setConfig(config) {
    const cardConfig = Object.assign({}, config);

    if (cardConfig.use_military === null) cardConfig.use_military = true;
    if (cardConfig.hide_seconds === null) cardConfig.hide_seconds = false;
    if (!cardConfig.fontSize)             cardConfig.fontSize     = '7rem';
    if (!cardConfig.padding)              cardConfig.padding      = '44px';
    if (!cardConfig.textAlign)            cardConfig.textAlign    = 'center';

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
	const config = this._config;

    if (!this.content) {
      const card = document.createElement('ha-card');
      this.content = document.createElement('div');
      this.content.style.padding = config.padding;
      this.content.style.fontSize = config.fontSize;
      this.style.textAlign = config.textAlign;
      this.content.style.display = 'block';
      
      card.appendChild(this.content);
      this.appendChild(card);
    }
    this.startTime();
	
    var interval = 250
    if (config.hide_seconds) 
	    interval = 1000      
    setInterval(this.startTime.bind(this), interval);
  }

}

customElements.define('simple-clock-card', SimpleClockCard);
