class ProgressBar extends HTMLElement {

    constructor() {
        super();

        this.shadow = this.createShadowRoot();
        this._complete = 0;
    }

    get complete() {
        return this._complete;
    }

    set complete(complete) {
        this.setAttribute('complete', complete);
    }

    static get observedAttributes() {
        return [ 'complete' ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const innerBar = this.shadow.querySelector('.progress-bar-inner');
        
        switch(name) {
            case 'complete':
                this._complete = parseInt(newValue, 10) || 0;

                innerBar.style.width = this.complete + '%';
                innerBar.innerHTML = this.complete + '%';
                break;
        }
    }

    connectedCallback() {
        const template = `
            <style>
                .progress-bar {
                    width: 50%,
                    height: 30px;
                    background-color: #EDF2F4;
                    border-radius: 5px;
                    color: #FFF;
                }

                .progress-bar-inner {
                    heigth: 100%;
                    line-height: 30px;
                    background: #2B2D42;
                    text-align: center;
                    border-radius: 5px;
                    transition: width 0.25s;
                }
            </style>
            <div class="progress-bar">
                <div class="progress-bar-inner" style="">${this.complete}%</div>
            </div>
        `
        this.shadow.innerHTML = template;
    }


}

window.customElements.define('progress-bar', ProgressBar);