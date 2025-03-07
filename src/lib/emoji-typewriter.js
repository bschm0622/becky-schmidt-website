/**
 * EmojiTypewriter - A typing effect that properly handles emojis
 */
export default class EmojiTypewriter {
  constructor(options) {
    this.options = {
      words: [],
      typeSpeed: 50,
      deleteSpeed: 30,
      delaySpeed: 2000,
      loop: true,
      cursor: true,
      cursorChar: '_',
      cursorBlinkSpeed: 500,
      ...options
    };
    
    this.currentWordIndex = 0;
    this.currentText = '';
    this.isDeleting = false;
    this.element = null;
    this.cursorElement = null;
  }

  // Initialize the typewriter on a DOM element
  init(element) {
    if (!element) return;
    this.element = element;
    
    // Create text span and cursor span
    element.innerHTML = '';
    
    // Create text element
    const textSpan = document.createElement('span');
    textSpan.className = 'typewriter-text';
    element.appendChild(textSpan);
    
    // Create cursor element if cursor is enabled
    if (this.options.cursor) {
      this.cursorElement = document.createElement('span');
      this.cursorElement.className = 'typewriter-cursor';
      this.cursorElement.textContent = this.options.cursorChar;
      this.cursorElement.style.display = 'inline-block';
      element.appendChild(this.cursorElement);
      
      // Start cursor blinking
      this.blinkCursor();
    }
    
    // Start typing
    this.type();
  }
  
  // Blink the cursor
  blinkCursor() {
    if (!this.cursorElement || !this.options.cursor) return;
    
    setInterval(() => {
      this.cursorElement.style.opacity = 
        this.cursorElement.style.opacity === '0' ? '1' : '0';
    }, this.options.cursorBlinkSpeed);
  }

  // Main typing function
  type() {
    // Get current word as array of characters (preserving emoji surrogate pairs)
    const currentWord = this.options.words[this.currentWordIndex];
    const fullTextArray = [...currentWord];
    
    // Calculate typing speed
    let typeSpeed = this.options.typeSpeed;
    
    if (this.isDeleting) {
      // Handle deletion
      typeSpeed = this.options.deleteSpeed;
      this.currentText = fullTextArray.slice(0, [...this.currentText].length - 1).join('');
    } else {
      // Handle typing
      this.currentText = fullTextArray.slice(0, [...this.currentText].length + 1).join('');
    }
    
    // Update the DOM
    if (this.element) {
      const textElement = this.element.querySelector('.typewriter-text');
      if (textElement) {
        textElement.textContent = this.currentText;
      }
    }
    
    // Handle word completion or deletion
    if (!this.isDeleting && this.currentText === currentWord) {
      // Word completed, prepare to delete after delay
      typeSpeed = this.options.delaySpeed;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === '') {
      // Word deleted, move to next word
      this.isDeleting = false;
      this.currentWordIndex = (this.currentWordIndex + 1) % this.options.words.length;
      
      // Stop if not looping and we've gone through all words
      if (!this.options.loop && this.currentWordIndex === 0) {
        return;
      }
      
      // Small pause before typing next word
      typeSpeed = 500;
    }
    
    // Schedule next update
    setTimeout(() => this.type(), typeSpeed);
  }
} 