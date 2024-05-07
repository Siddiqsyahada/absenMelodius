        
const formLogin = document.getElementById('loginForm');
const dashboard = document.getElementById('dashboard');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signInButton = document.getElementById('signIn');
const errorMessage = document.getElementById('errorMessage');

dashboard.style.display = 'none'
formLogin.style.display = 'none'

if(localStorage.getItem('email')){
    formLogin.style.display = 'none';
    dashboard.style.display = 'block';
}else{
    dashboard.style.display = 'none'
    formLogin.style.display = ''
}

function onLogin() {
    if (!emailInput.value || !passwordInput.value) {
        errorMessage.textContent = 'Email dan password harus diisi';
        errorMessage.classList.remove('hidden');
    } else {
        if (emailInput.value === 'admin@gmail.com' && passwordInput.value === '123') {
            localStorage.setItem('email',emailInput.value)
            formLogin.style.display = 'none';
            dashboard.style.display = 'block';
            swal("Succes", "Login Berhasil", "success");
        } else {
            errorMessage.textContent = 'Email atau password salah';
            errorMessage.classList.remove('hidden');
        }
    }
}

function onLogout(){
    localStorage.removeItem('email')
    window.location.reload()
}

// start: Sidebar
const sidebarToggle = document.querySelector('.sidebar-toggle')
const sidebarOverlay = document.querySelector('.sidebar-overlay')
const sidebarMenu = document.querySelector('.sidebar-menu')
const main = document.querySelector('.main')
sidebarToggle.addEventListener('click', function (e) {
    e.preventDefault()
    main.classList.toggle('active')
    sidebarOverlay.classList.toggle('hidden')
    sidebarMenu.classList.toggle('-translate-x-full')
})
sidebarOverlay.addEventListener('click', function (e) {
    e.preventDefault()
    main.classList.add('active')
    sidebarOverlay.classList.add('hidden')
    sidebarMenu.classList.add('-translate-x-full')
})
document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault()
        const parent = item.closest('.group')
        if (parent.classList.contains('selected')) {
            parent.classList.remove('selected')
        } else {
            document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (i) {
                i.closest('.group').classList.remove('selected')
            })
            parent.classList.add('selected')
        }
    })
})
// end: Sidebar



// start: Popper
const popperInstance = {}
document.querySelectorAll('.dropdown').forEach(function (item, index) {
    const popperId = 'popper-' + index
    const toggle = item.querySelector('.dropdown-toggle')
    const menu = item.querySelector('.dropdown-menu')
    menu.dataset.popperId = popperId
    popperInstance[popperId] = Popper.createPopper(toggle, menu, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    padding: 24,
                },
            },
        ],
        placement: 'bottom-end'
    });
})
document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.dropdown-toggle')
    const menu = e.target.closest('.dropdown-menu')
    if (toggle) {
        const menuEl = toggle.closest('.dropdown').querySelector('.dropdown-menu')
        const popperId = menuEl.dataset.popperId
        if (menuEl.classList.contains('hidden')) {
            hideDropdown()
            menuEl.classList.remove('hidden')
            showPopper(popperId)
        } else {
            menuEl.classList.add('hidden')
            hidePopper(popperId)
        }
    } else if (!menu) {
        hideDropdown()
    }
})

function hideDropdown() {
    document.querySelectorAll('.dropdown-menu').forEach(function (item) {
        item.classList.add('hidden')
    })
}
function showPopper(popperId) {
    popperInstance[popperId].setOptions(function (options) {
        return {
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: true },
            ],
        }
    });
    popperInstance[popperId].update();
}
function hidePopper(popperId) {
    popperInstance[popperId].setOptions(function (options) {
        return {
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: 'eventListeners', enabled: false },
            ],
        }
    });
}
// end: Popper



// start: Tab
document.querySelectorAll('[data-tab]').forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault()
        const tab = item.dataset.tab
        const page = item.dataset.tabPage
        const target = document.querySelector('[data-tab-for="' + tab + '"][data-page="' + page + '"]')
        document.querySelectorAll('[data-tab="' + tab + '"]').forEach(function (i) {
            i.classList.remove('active')
        })
        document.querySelectorAll('[data-tab-for="' + tab + '"]').forEach(function (i) {
            i.classList.add('hidden')
        })
        item.classList.add('active')
        target.classList.remove('hidden')
    })
})
// end: Tab





function generateNDays(n) {
    const data = []
    for(let i=0; i<n; i++) {
        const date = new Date()
        date.setDate(date.getDate()-i)
        data.push(date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric'
        }))
    }
    return data
}
function generateRandomData(n) {
    const data = []
    for(let i=0; i<n; i++) {
        data.push(Math.round(Math.random() * 10))
    }
    return data
}

let namaAnggota = []
let totalHadir = [];
let totalSakit = [];
let totalIzin = [];
let totalAlfa = [];
let labelTanggal = []
let kehadiranPerOrg = []
let topHadir = []
let topSakit = []
let topIzin = []
let topAlfa = []
let chartSemuaBulan = []


function findTopLeaderboard(data, find) {
    const counts = data.map((str, index) => {
        const count = (str.match(new RegExp(find, 'g')) || []).length;
        return { index: index, countA: count, total: str.length };
    });

    counts.sort((a, b) => b.countA - a.countA);

    const top = counts.slice(0, 5).map(item => ({
        index: item.index,
        count: item.countA,
        total: item.total
    }));

    if (find === "A") {
        topAlfa = top;
    } else if (find === "✔️") {
        topHadir = top;
    } else if (find === "S") {
        topSakit = top;
    } else if (find === "I") {
        topIzin = top;
    } else {
        char = find;
    }
}
let dataTersimpan =  ""


function formatTanggal(data){
    for (let k = 0; k < data.length - 1; k++) {
        const dateString = data[k][0]['tanggal'];
        const date = new Date(dateString);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        labelTanggal.push(`${month} ${day}`);
    }
}

document.getElementById("loading").classList.remove("hidden");
let fetchSucces = false

fetch('https://script.google.com/macros/s/AKfycbyap6NPMSjH6FI2R-Genpx83fzNDenULA8FOXmaK1texVt32npRw4sHhfUunbeTMCqp/exec', {
redirect: "follow",
method: 'GET',
headers: {
    "Content-Type": "text/plain;charset=utf-8",
},
}).then(response => response.json()).then(data => {
    dataTersimpan = data
    console.log("fetching data Succes")
    fetchSucces = true
    namaAnggota = data['Apr'][0][0]['nama']
    document.getElementById("loading").classList.add("hidden");
    tampilkanSemuaData()
    localStorage.setItem("namaAnggota",namaAnggota)
})
.catch(error => {
    console.error('Error:', error);
});

let value = ''

const dropdown = document.getElementById("pilihan");
dropdown.addEventListener("change", function() {
    value = dropdown.value;
    if(value === "semua"){
        totalHadir = [];
        totalSakit = [];
        totalIzin = [];
        totalAlfa = [];
        labelTanggal = []
        topAlfa = []
        kehadiranPerOrg = []
        tampilkanSemuaData()
    }else{
        totalHadir = [];
        totalSakit = [];
        totalIzin = [];
        totalAlfa = [];
        labelTanggal = []
        topAlfa = []
        kehadiranPerOrg = []
        tampilkanData(value)
    }
});

function tampilkanSemuaData(){
    const labelBulan = []
    const totalSemuaHadir = []
    const totalSemuaSakit = []
    const totalSemuaIzin = []
    const totalSemuaAlfa = []
    for (const bulanKey in dataTersimpan) {
       tampilkanData(bulanKey)
       const dataSatuBulan = dataTersimpan[bulanKey]
       labelBulan.push(bulanKey)
       

       for(let i = 0; i< dataTersimpan[bulanKey].length; i ++){
            if(dataSatuBulan[i]['rekapBulanan'] !== undefined){
                const rekap = dataSatuBulan[i]['rekapBulanan'][0]
                totalSemuaHadir.push(rekap.hadir)
                totalSemuaSakit.push(rekap.sakit)
                totalSemuaIzin.push(rekap.izin)
                totalSemuaAlfa.push(rekap.alfa)
            }
       }
    }
    myChart.data.labels = labelBulan;
    myChart.data.datasets[0].data = totalSemuaHadir;
    myChart.data.datasets[1].data = totalSemuaSakit;
    myChart.data.datasets[2].data = totalSemuaIzin;
    myChart.data.datasets[3].data = totalSemuaAlfa;

    myChart.update();
}

function tampilkanData(bulanYangDipilih){
    if(fetchSucces){
        document.getElementById("loading").classList.remove("hidden");
    }
    if(fetchSucces){
        document.getElementById("loading").classList.add("hidden");
    }
        const bulan = bulanYangDipilih
        const dataSatuBulan = dataTersimpan[bulan];
        if (dataTersimpan && dataTersimpan[bulan]) {

            for (let i = 0; i < dataSatuBulan.length; i++) {
                const rekap = dataSatuBulan[i][0];
                if (rekap && rekap.kehadiran) {
                    const rekapPerTgl = rekap.kehadiran;
                    const gabungan = rekapPerTgl.map((elemA, index) => {
                        if (elemA !== undefined && kehadiranPerOrg[index] !== undefined) {
                            return elemA + kehadiranPerOrg[index];
                        } else {
                            return elemA; // Atau return elemA + 0; jika Anda ingin menambahkan 0 pada elemen yang tidak terdefinisi
                    }});
                    
                    kehadiranPerOrg = gabungan;
                    
                    let countHadir = 0;
                    let countSakit = 0;
                    let countIzin = 0;
                    let countAlfa = 0;

                    for (let j = 0; j < rekapPerTgl.length; j++) {

                        if (rekapPerTgl[j] === "✔️") {
                            countHadir += 1
                        } else if (rekapPerTgl[j] === "S") {
                            countSakit += 1
                        } else if (rekapPerTgl[j] === "I") {
                            countIzin += 1
                        } else if (rekapPerTgl[j] === "A") {
                            countAlfa += 1
                        } else {

                        }
                    }
                    totalHadir.push(countHadir)
                    totalSakit.push(countSakit)
                    totalIzin.push(countIzin)
                    totalAlfa.push(countAlfa)
                }
            }
            const hadir = document.getElementById('hadir')
            const sakit = document.getElementById('sakit')
            const izin = document.getElementById('izin')
            const alfa = document.getElementById('alfa')
            hadir.textContent = totalHadir.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            sakit.textContent = totalSakit.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            izin.textContent = totalIzin.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            alfa.textContent = totalAlfa.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        } else {
            console.error(`Data bulan ${bulanYangDipilih} tidak tersedia.`);
        }
        // menambahkan tanggal ke char sekaligus format
        formatTanggal(dataTersimpan[bulan])
        // menambahkan jumlah latihabn
        const jumlahLatihan = document.getElementById('jumlahLatihan')
        jumlahLatihan.textContent = labelTanggal.length

        // mencari top Leaderboard Alfa

        findTopLeaderboard(kehadiranPerOrg,"A")
        const topAlfaIndex = topAlfa.map(item => item.index)
        const topAlfaCount = topAlfa.map(item => item.count)
        for (let i = 1; i <= 5; i++) {
            const persentase = 100 - Math.round(topAlfaCount[i-1] / labelTanggal.length * 100)
            const topAlfa = document.getElementById(`topAlfa${i}`).getElementsByTagName("th")[0];
            const totalAlfa = document.getElementById(`totalTopAlfa${i}`)
            const textPersentaseTopAlfa = document.getElementById(`textPersentaseTopAlfa${i}`)
            const persentaseTopAlfa = document.getElementById(`persentaseTopAlfa${i}`)     
            function generateColor(percent) {
                let color = ''
                if(percent < 30){
                    color = "rgb(255, 0, 0)"
                }else if(percent >= 30 && percent < 50){
                    color = "rgb(255, 255, 0)"
                }else if(percent >= 50 && percent < 85){
                    color = "rgb(59, 130, 246)"
                }else{
                    color = "rgb(16, 185, 129)"
                }
                return color;
            }
            
            if(isNaN(persentase)){
                topAlfa.textContent = namaAnggota[i - 1];
                totalAlfa.textContent = 0
                textPersentaseTopAlfa.textContent = "0%"
                persentaseTopAlfa.style = `width : 0%`
            }else{
                topAlfa.textContent = namaAnggota[topAlfaIndex[i - 1]];
                totalAlfa.textContent = topAlfaCount[i - 1]
                textPersentaseTopAlfa.textContent = persentase + "%"
                persentaseTopAlfa.style = `width : ${persentase}%`
                persentaseTopAlfa.style.backgroundColor = generateColor(persentase)
            }

        }

        myChart.data.labels = labelTanggal.reverse();
        myChart.data.datasets[0].data = totalHadir.reverse();
        myChart.data.datasets[1].data = totalSakit.reverse();
        myChart.data.datasets[2].data = totalIzin.reverse();
        myChart.data.datasets[3].data = totalAlfa.reverse();

        myChart.update();
}



// start: Chart
const myChart = new Chart(document.getElementById('order-chart'), {
    type: 'line',
    data: {
        labels: labelTanggal.reverse(),
        datasets: [
            {
                label: 'Hadir',
                data: totalHadir.reverse(),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgb(59 130 246 / .05)',
                tension: .2
            },
            {
                label: 'Sakit',
                data: totalSakit.reverse(),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(255, 255, 0)',
                borderColor: 'rgb(255, 255, 0)',
                backgroundColor: 'rgb(59 130 246 / .05)',
                tension: .2
            },
            {
                label: 'Izin',
                data: totalIzin.reverse(),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(16, 185, 129)',
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgb(16 185 129 / .05)',
                tension: .2
            },
            {
                label: 'Alfa',
                data: totalAlfa.reverse(),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(244, 63, 94)',
                borderColor: 'rgb(244, 63, 94)',
                backgroundColor: 'rgb(244 63 94 / .05)',
                tension: .2
            },
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})
// end: Chart


// fetch('https://script.google.com/macros/s/AKfycbyap6NPMSjH6FI2R-Genpx83fzNDenULA8FOXmaK1texVt32npRw4sHhfUunbeTMCqp/exec', {
//     redirect: "follow",
//     method: 'POST',
//     headers: {
//       "Content-Type": "text/plain;charset=utf-8",
//     },
//     mode:"no-cors",
//     body: JSON.stringify({ "sheetName":sheetName,"tanggal": tanggal, "nama": nama, "kehadiran": kehadiran })
//   }).then(response => response.json()).then(data => {
//     console.log('Data komentar terbaru:', data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   })

