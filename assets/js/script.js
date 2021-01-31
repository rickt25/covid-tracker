const total = document.getElementById('total-cases')
const positive = document.getElementById('positive')
const recovered = document.getElementById('recovered')
const death = document.getElementById('death')
const date = document.getElementById('date')



window.addEventListener('load', () => {
    const preload = document.getElementById('preloader')
    setInterval(function(){
        preload.classList.add('load-finish')
    }, 1000)
})

async function getData() {
    let url = 'https://indonesia-covid-19.mathdro.id/api/'
    try {
        let res = await fetch(url)
        return await res.json()
    } catch (error) {
        console.log(error)
    }
}

async function renderData(){
    let data = await getData()
    
    if(data){
        total.innerHTML = data.jumlahKasus
        positive.innerHTML = data.perawatan
        recovered.innerHTML = data.sembuh
        death.innerHTML = data.meninggal
        date.innerHTML = "Last updated : " + formatDate(data.lastUpdate.toString())
    }
}



function formatDate(date){
    let day = date.substring(0,2)
    let month = date.substring(2,4)
    let year = "20" + date.substring(4,6)
    return day + "/" + month + "/" + year
}

renderData()

