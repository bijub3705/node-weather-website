
fetch('http://puzzle.mead.io/puzzle').then((response) =>{
    response.json().then((data) => {
        console.log(data)
    })
})
const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const successMessage = document.querySelector('#message-1')
const errorMessage = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // this will prevent the browser to refresh the page

    const location = input.value
    const url = '/weather?address=' + location
    fetch(url).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                errorMessage.textContent = data.error
                successMessage.textContent = ''
            }else{
                errorMessage.textContent = ''
                successMessage.textContent = 'Weather forecast for '+data.Address+ ' is ' +data.forecast+ ' and it feels like '+data.feelslike +' with humidity '+data.humidity
            }
        })
    })
})


