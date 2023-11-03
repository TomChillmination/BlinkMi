window.onload = function() {
    const displayArea = document.getElementById('display-area');
    const stopButton = document.getElementById('stop-button');
    const startButton = document.getElementById('start-button');
    const backButton = document.getElementById('back-button');
    const nextButton = document.getElementById('next-button');
    const backBrowseButton = document.getElementById('back-browse-button');

    let text = sessionStorage.getItem('text');
    console.log(text);
    const maxChars = Number(sessionStorage.getItem('maxChars'));
    let interval = Number(sessionStorage.getItem('interval')) ;
    let chunks = splitText(text, maxChars);
    let currentIndex = 0;

    function splitText(text, maxChars) {
        maxChars = maxChars || "1";  // Default to "1" if maxChars is 0 or falsy
        const regex = new RegExp(`(.{1,${maxChars}})|(\\S+)|(\\s+)|$`, 'g');
        return text.match(regex).filter(Boolean);
    }
    

    function updateBlinkingText() {
        if (currentIndex < chunks.length) {
            displayArea.textContent = chunks[currentIndex];
            currentIndex++;
        } else {
            clearInterval(intervalId);
        }
    }

    startButton.addEventListener('click', function() {
        if (!intervalId) {
            intervalId = setInterval(updateBlinkingText, interval);
        }
    });

    stopButton.addEventListener('click', function() {
        clearInterval(intervalId);
        intervalId = null;
    });

    backButton.addEventListener('click', function() {
        currentIndex = Math.max(0, currentIndex - 2);
        updateBlinkingText();
    });

    nextButton.addEventListener('click', function() {
        updateBlinkingText();
    });

    backBrowseButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    updateBlinkingText();
    intervalId = setInterval(updateBlinkingText, interval);
};
