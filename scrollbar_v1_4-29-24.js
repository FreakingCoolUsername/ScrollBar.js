// Custom element definition
class ScrollTimer extends HTMLElement {
    constructor() {
        super();
        if (!this.isMobileDevice()) { // Check if not on mobile device
            this.handleScrollStart = this.handleScrollStart.bind(this);
            this.handleScrollStop = this.handleScrollStop.bind(this);
            this.hideScrollbar = this.hideScrollbar.bind(this);
            this.showScrollbar = this.showScrollbar.bind(this);
            this.handleMouseMove = this.handleMouseMove.bind(this);
            this.scrollTimer = null;
            this.mouseMoveTimer = null;
            this.scrollStarted = false;
            this.mouseOverScrollbar = false; // Flag to track mouse over scrollbar
            
            // Add wheel event listener to detect scrolling
            window.addEventListener('wheel', this.handleScrollStart);
            
            // Inject CSS to hide scrollbar
            this.injectScrollbarCSS();

            // Add event listeners for arrow keys
            window.addEventListener('keydown', this.handleKeyDown.bind(this));

            // Add event listener to detect mouse movement for showing scrollbar
            window.addEventListener('mousemove', this.handleMouseMove);
            
            // Set timeout value based on sec attribute of scroll-timer element
            const sec = parseInt(this.getAttribute('sec'));
            this.timeout = !isNaN(sec) && sec > 0 ? sec * 1000 : 3000; // Default to 3 seconds if sec attribute is missing or invalid
        }
    }

    handleScrollStart() {
        // Check if scrolling has already started to prevent immediate hiding of the scrollbar
        if (!this.scrollStarted) {
            this.scrollStarted = true;
            console.log("Scrolling started");
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(this.handleScrollStop, this.timeout);
        } else {
            this.showScrollbar(); // Show scrollbar when scrolling resumes
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
        if (event.clientX >= window.innerWidth - 20) { // Adjust threshold as needed
            this.showScrollbar();
            this.mouseOverScrollbar = true;
        } else {
            this.mouseOverScrollbar = false;
            // Set timeout to hide scrollbar after a delay only if mouse is not over the scrollbar
            this.mouseMoveTimer = setTimeout(() => {
                if (!this.mouseOverScrollbar) {
                    this.hideScrollbar();
                }
            }, this.timeout);
        }
    }

    injectScrollbarCSS() {
        // Check if a <style> element exists in the <head>
        let styleElement = document.querySelector('head style');
        if (!styleElement) {
            // Create a <style> element if it doesn't exist
            styleElement = document.createElement('style');
            document.head.appendChild(styleElement);
        }
        // Check if the CSS rule for hiding the scrollbar already exists
        if (!styleElement.textContent.includes('.no-scrollbar')) {
            // Append the CSS rule to hide the scrollbar
            styleElement.textContent += '.no-scrollbar { overflow-y: hidden !important; }';
        }
    }

    disconnectedCallback() {
        // Remove wheel and keydown event listeners
        window.removeEventListener('wheel', this.handleScrollStart);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleKeyDown(event) {
        // Check if the pressed key is the up or down arrow key
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            // Prevent the default scroll behavior of the arrow keys
            event.preventDefault();
            // Perform custom scrolling action here
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

// Define the custom element
customElements.define('scroll-timer', ScrollTimer);
