const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const forecastPara = document.querySelector('#forecastMsg')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    forecastPara.textContent = "Loading results..."
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
                return forecastPara.textContent = data.error
            forecastPara.textContent = data.forecast
        })
    })
})