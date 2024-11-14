// Selects all the cards
const cards = document.querySelectorAll('.card');

// Starts with the first card
let currentCardIndex = 0;

// Function to show a specific card
function showCard(index) {
    // Hides all cards
    cards.forEach((card, i) => {
        card.classList.remove('active', 'swipe-left');
        if (i < index) {
            // For cards that have been swiped left
            card.classList.add('swipe-left');
        } else if (i === index) {
            // Shows the current card
            card.classList.add('active');
            // Starts timing on the new card
            startTiming(card);
        } else {
            // Ensures upcoming cards are hidden and reset
            card.style.transform = 'translateX(100%)';
            card.style.opacity = 0;
            card.style.visibility = 'hidden';
        }
    });
    // Updates the progress bar
    updateProgress();
}

// Function to start timing
function startTiming(card) {
    // Records the start time
    card.startTime = Date.now();
}

// Function to stop timing
function stopTiming(card) {
    // Calculates time spent
    const timeSpent = Math.round((Date.now() - card.startTime) / 1000);
    // Updates the display
    card.querySelector('.time-spent').textContent = timeSpent;
}

// Function to update the progress bar
function updateProgress() {
    // Calculates progress percentage
    const progressPercent = ((currentCardIndex) / cards.length) * 100;
    // Updates the progress bar height
    document.querySelector('.progress').style.height = progressPercent + '%';
}

// Function to handle emoji button clicks
function handleEmojiClick() {
    // Gets the current card
    const currentCard = cards[currentCardIndex];
    // Stops timing
    stopTiming(currentCard);
    // Moves to the next card
    currentCardIndex++;
    if (currentCardIndex < cards.length) {
        showCard(currentCardIndex);
    } else {
        // If no more cards, display a completion message
        alert('You have completed the course!');
    }
}

// Adds event listeners to emoji buttons
document.querySelectorAll('.emoji-button').forEach(button => {
    button.addEventListener('click', handleEmojiClick);
});

// Shows the first card when the page loads
showCard(currentCardIndex);
