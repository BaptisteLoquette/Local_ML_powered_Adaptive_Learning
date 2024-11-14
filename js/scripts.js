// Selects all cards
const cards = document.querySelectorAll('.card');
let currentCardIndex = 0;

// Shows a specific card
function showCard(index) {
    cards.forEach((card, i) => {
        if (i === index) {
            // Show current card
            card.style.visibility = 'visible';
            card.style.transform = 'translateX(0)';
            card.style.opacity = '1';
            startTiming(card);
        } else if (i < index) {
            // Move previous cards to the left
            card.style.visibility = 'hidden';
            card.style.transform = 'translateX(-100%)';
            card.style.opacity = '0';
        } else {
            // Position upcoming cards to the right
            card.style.visibility = 'hidden';
            card.style.transform = 'translateX(100%)';
            card.style.opacity = '0';
        }
    });
    updateProgress();
}

// Starts timing for a card
function startTiming(card) {
    const cardIndex = card.dataset.cardIndex;
    card.startTime = Date.now();

    // Update active state of time bars
    document.querySelectorAll('.time-bar').forEach(bar => {
        bar.classList.remove('active');
        if (bar.dataset.card === cardIndex) {
            bar.classList.add('active');
        }
    });

    // Start progress for current card
    const timeBar = document.querySelector(`.time-bar[data-card="${cardIndex}"]`);
    const timeProgress = timeBar.querySelector('.time-progress');
    timeProgress.style.height = '0%';

    // Reset the time display to 0.00s
    timeBar.querySelector('.time-spent').textContent = '0.00s';

    updateTimeProgress(card, timeBar);
}

function updateTimeProgress(card, timeBar) {
    const timeProgress = timeBar.querySelector('.time-progress');
    const updateProgress = () => {
        const elapsed = Date.now() - card.startTime;
        const progress = Math.min((elapsed / 30000) * 100, 100); // 30 seconds total
        timeProgress.style.height = progress + '%';

        if (progress < 100 && !card.stopped) {
            requestAnimationFrame(() => updateProgress());
        }
    };
    requestAnimationFrame(updateProgress);
}

// Stops timing and updates display
function stopTiming(card) {
    card.stopped = true;
    const timeSpent = (Date.now() - card.startTime) / 1000; // Convert to seconds
    const cardIndex = card.dataset.cardIndex;

    // Update time spent with 2 decimal places
    const timeBar = document.querySelector(`.time-bar[data-card="${cardIndex}"]`);
    timeBar.querySelector('.time-spent').textContent = timeSpent.toFixed(2) + 's';
    timeBar.querySelector('.time-progress').style.height = '100%';
}

// Updates progress bar
function updateProgress() {
    const progress = (currentCardIndex / cards.length) * 100;
    document.querySelector('.progress').style.height = progress + '%';
}

// Handles emoji button clicks
function handleEmojiClick(event) {
    event.preventDefault();

    const currentCard = cards[currentCardIndex];
    stopTiming(currentCard);

    if (currentCardIndex + 1 < cards.length) {
        const nextCard = cards[currentCardIndex + 1];

        // 1. Prepare the next card on the right
        nextCard.style.transform = 'translateX(100%)';
        nextCard.style.opacity = '0';
        nextCard.style.visibility = 'visible';

        // 2. Animate current card to the left
        currentCard.style.transform = 'translateX(-100%)';
        currentCard.style.opacity = '0';

        // 3. Animate next card from right to center
        setTimeout(() => {
            nextCard.style.transform = 'translateX(0)';
            nextCard.style.opacity = '1';

            // 4. Update index and start timing
            currentCardIndex++;
            startTiming(nextCard);
            updateProgress();
        }, 50);

    } else {
        alert('You have completed the course!');
        return;
    }
}

// Adds click handlers to emoji buttons
document.querySelectorAll('.emoji-button').forEach(button => {
    button.addEventListener('click', handleEmojiClick, true);
});

// Shows first card on load
showCard(currentCardIndex);
