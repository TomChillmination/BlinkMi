// script.js
window.onload = function() {
    const blinkButton = document.getElementById('blink-button');
    const textArea = document.getElementById('textArea');
    const maxCharsInput = document.getElementById('maxcharsSelect');
    const intervalInput = document.getElementById('intervalSelect');
    const ignoreNewlinesCheckbox = document.getElementById('ignoreNewlinesCheckbox');

    function splitText(text, maxChars) {
        const regex = new RegExp(`(.{1,${maxChars}})|(\\S+)|(\\s+)|$`, 'g');
        return text.match(regex).filter(Boolean);
    }    

    blinkButton.addEventListener('click', function() {
        const maxChars = maxCharsInput.value || "1";  // Default to "1" if maxChars is 0 or falsy
        const interval = intervalInput.value * 1000;  // Convert to milliseconds
        let text = textArea.value;
        if (ignoreNewlinesCheckbox.checked) {
            text = text.replace(/\n/g, '');  // Remove newlines if checkbox is checked
        }
        const chunks = splitText(text, maxChars);
        sessionStorage.setItem('text', text);  // ここで text 項目を sessionStorage に保存
        sessionStorage.setItem('chunks', JSON.stringify(chunks));
        sessionStorage.setItem('maxChars', maxChars);  // Save maxChars to sessionStorage
        sessionStorage.setItem('interval', interval);
        window.location.href = 'blinking.html';  // Corrected path
    });
}
