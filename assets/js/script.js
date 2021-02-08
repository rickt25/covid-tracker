const total = document.getElementById('total-cases')
const positive = document.getElementById('positive')
const recover = document.getElementById('recover')
const death = document.getElementById('death')
const date = document.getElementById('date')

window.addEventListener('load', () => {
    const preload = document.getElementById('preloader')
    setInterval(function(){
        preload.classList.add('load-finish')
    }, 1000)
})

async function getData() {
    let url = 'https://covid19.mathdro.id/api/countries/IDN'
    try {
        let res = await fetch(url)
        return await res.json()
    } catch (error) {
        console.log(error)
    }
}

async function renderData(){
    let { confirmed, recovered, deaths, lastUpdate } = await getData()
    
    if(confirmed.value){
        total.innerHTML = confirmed.value + recovered.value + deaths.value
        positive.innerHTML = confirmed.value
        recover.innerHTML = recovered.value
        death.innerHTML = deaths.value
        date.innerHTML = "Last updated : " + formatDate(lastUpdate.toString())
    }
}



function formatDate(date){
    let day = date.substring(0,2)
    let month = date.substring(2,4)
    let year = "20" + date.substring(4,6)
    return day + "/" + month + "/" + year
}

renderData()

