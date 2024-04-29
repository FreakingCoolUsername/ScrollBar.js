// Created By ChatGPT and Chandler Sulffridge
class ScrollTimer extends HTMLElement {
    constructor() {
        super();
        if (!this.isMobileDevice()) { 
            this.handleScrollStart = this.handleScrollStart.bind(this);
            this.handleScrollStop = this.handleScrollStop.bind(this);
            this.hideScrollbar = this.hideScrollbar.bind(this);
            this.showScrollbar = this.showScrollbar.bind(this);
            this.handleMouseMove = this.handleMouseMove.bind(this);
            this.scrollTimer = null;
            this.mouseMoveTimer = null;
            this.scrollStarted = false;
            this.mouseOverScrollbar = false; 
            
           
            window.addEventListener('wheel', this.handleScrollStart);
            
            
            this.injectScrollbarCSS();

           
            window.addEventListener('keydown', this.handleKeyDown.bind(this));

            
            window.addEventListener('mousemove', this.handleMouseMove);
            
            
            const sec = parseInt(this.getAttribute('sec'));
            this.timeout = !isNaN(sec) && sec > 0 ? sec * 1000 : 3000; 
        }
    }

    handleScrollStart() {
        
        if (!this.scrollStarted) {
            this.scrollStarted = true;
            console.log("Scrolling started");
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(this.handleScrollStop, this.timeout);
        } else {
            this.showScrollbar(); 
        }
    }

    handleScrollStop() {
        console.log("Scrolling stopped");
        this.scrollStarted = false;
        this.hideScrollbar();
    }

    hideScrollbar() {
        document.documentElement.style.overflowY = 'hidden';
    }

    showScrollbar() {
        document.documentElement.style.overflowY = 'auto';
    }

    handleMouseMove(event) {
        clearTimeout(this.mouseMoveTimer);
        if (event.clientX >= window.innerWidth - 20) { 
            this.showScrollbar();
            this.mouseOverScrollbar = true;
        } else {
            this.mouseOverScrollbar = false;
            
            this.mouseMoveTimer = setTimeout(() => {
                if (!this.mouseOverScrollbar) {
                    this.hideScrollbar();
                }
            }, this.timeout);
        }
    }

    injectScrollbarCSS() {
        
        let styleElement = document.querySelector('head style');
        if (!styleElement) {
            
            styleElement = document.createElement('style');
            document.head.appendChild(styleElement);
        }
        // Check if the CSS rule for hiding the scrollbar already exists
        if (!styleElement.textContent.includes('.no-scrollbar')) {
            
            styleElement.textContent += '.no-scrollbar { overflow-y: hidden !important; }';
        }
    }

    disconnectedCallback() {
        
        window.removeEventListener('wheel', this.handleScrollStart);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleKeyDown(event) {
        
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            
            event.preventDefault();
            
            const scrollAmount = 100; // Adjust this value as needed
            if (event.key === 'ArrowUp') {
                window.scrollBy(0, -scrollAmount); // Scroll up
            } else {
                window.scrollBy(0, scrollAmount); // Scroll down
            }
        }
    }

    isMobileDevice() {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
        console.log("Mobile device detected.");
    } else {
        console.log("Not a mobile device.");
    }
    return isMobile;
}
}


customElements.define('scroll-timer', ScrollTimer);
