
window.addEventListener('load', () => {
    const preload = document.getElementById('preloader')
    setInterval(function () {
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

async function getProvince() {
    let url = 'https://indonesia-covid-19.mathdro.id/api/provinsi'
    try {
        let res = await fetch(url)
        const { data } = await res.json()
        localStorage.setItem("provinces", JSON.stringify(data))
        return data;
    } catch (error) {
        console.log(error)
    }
}

// let datas =  // data dummy karena api sedang down
// {
//     "data": [
//         {
//             "fid": 11,
//             "kodeProvi": 31,
//             "provinsi": "DKI Jakarta",
//             "kasusPosi": 123,
//             "kasusSemb": 321,
//             "kasusMeni": 312,
//         },
//         {
//             "fid": 12,
//             "kodeProvi": 32,
//             "provinsi": "Jawa Barat",
//             "kasusPosi": 123,
//             "kasusSemb": 321,
//             "kasusMeni": 312,
//         }
//     ]
// }

async function renderProvince(key = "") {
    const provinces = document.querySelector('#provinces');
    let overview = await getData()
    const datas = localStorage.getItem("provinces") === undefined
        ? await getProvince()
        : JSON.parse(localStorage.getItem("provinces"))

    datas.filter(province => province.provinsi.toLowerCase().match(key.toLowerCase())).forEach(data => {
        if(data.provinsi === "Indonesia"){
            data.kasusPosi = overview.confirmed.value
            data.kasusSemb = overview.recovered.value
            data.kasusMeni = overview.deaths.value
        }
        const element = `
                <div class="box-wrapper shadow">
                     <div class="city">${data.provinsi}</div>
                     <div class="positive">
                         <p class="description">Positive</p>
                         <p class="number">${data.kasusPosi}</p>
                     </div>
                     <div class="recovered">
                         <p class="description">Recovered</p>
                         <p class="number">${data.kasusSemb}</p>
                     </div>
                     <div class="death">
                         <p class="description">Death</p>
                         <p class="number">${data.kasusMeni}</p>
                     </div>
                 </div>
                 `;
        provinces.innerHTML += element
    })
}

function clearProvince() {
    document.querySelectorAll('.box-wrapper').forEach(e => e.remove());
}


function filterProvince() {
    const searchInput = document.querySelector('#searchInput');
    const key = searchInput.value;

    if (!key) return renderProvince();

    clearProvince();
    renderProvince(key)
}

renderProvince()