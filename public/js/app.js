const form = document.querySelector('form');
const messageOne = document.querySelector('#p1');
const messageTwo = document.querySelector('#p2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.querySelector('input').value;
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = 'location: ' + data.location;
                messageTwo.textContent = 'forecast: ' + data.forecast;
            }
        }).catch(err => {
            messageOne.textContent = err;
        });
    }).catch(err => {
        messageOne.textContent = err;
    });
});
