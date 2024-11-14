// Selects all cards
const cards = document.querySelectorAll('.card');
let currentCardIndex = 0;

// Shows a specific card
function showCard(index) {
    cards.forEach((card, i) => {
        if (i === index) {
            card.style.transform = 'translateX(0)';
            card.style.opacity = '1';
            startTiming(card);
        } else if (i < index) {
            card.style.transform = 'translateX(-100%)';
            card.style.opacity = '0';
        } else {
            card.style.transform = 'translateX(100%)';
            card.style.opacity = '0';
        }
    });
    updateProgress();
}

// Starts timing for a card
function startTiming(card) {
    card.startTime = Date.now();
}

// Stops timing and updates display
function stopTiming(card) {
    const timeSpent = Math.round((Date.now() - card.startTime) / 1000);
    card.querySelector('.time-spent').textContent = timeSpent;
}

// Updates progress bar
function updateProgress() {
    const progress = (currentCardIndex / cards.length) * 100;
    document.querySelector('.progress').style.height = progress + '%';
}

// Handles emoji button clicks
function handleEmojiClick() {
    const currentCard = cards[currentCardIndex];
    stopTiming(currentCard);

    currentCard.style.transform = 'translateX(-100%)';
    currentCard.style.opacity = '0';

    setTimeout(() => {
        currentCardIndex++;
        if (currentCardIndex < cards.length) {
            showCard(currentCardIndex);
        } else {
            alert('Course completed!');
        }
    }, 500);
}

// Adds click handlers to emoji buttons
document.querySelectorAll('.emoji-button').forEach(button => {
    button.addEventListener('click', handleEmojiClick);
});

// Shows first card on load
showCard(currentCardIndex);
