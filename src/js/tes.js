var data = {
    "mei": [
      { "izin": 2.0, "alfa": 1.0, "sakit": 0.0, "kehadiran": 5.0, "tanggal": "Kamis/4-4-2024", "nama": "Siddiq" },
      { "kehadiran": 3.0, "nama": "Anna", "sakit": 2.0, "izin": 2.0, "tanggal": "Kamis/4-4-2024", "alfa": 1.0 },
      { "alfa": 1.0, "nama": "Siddiq", "tanggal": "Sabtu/6-4-2024", "izin": 2.0, "kehadiran": 5.0, "sakit": 0.0 },
      { "kehadiran": 3.0, "tanggal": "Sabtu/6-4-2024", "alfa": 1.0, "nama": "Anna", "sakit": 2.0, "izin": 2.0 },
      // Data lainnya...
    ],
    "april": [
      { "izin": 2.0, "nama": "Siddiq", "alfa": 1.0, "tanggal": "Kamis/4-4-2024", "sakit": 0.0, "kehadiran": 5.0 },
      { "tanggal": "Kamis/4-4-2024", "kehadiran": 3.0, "alfa": 1.0, "sakit": 2.0, "izin": 2.0, "nama": "Anna" },
      { "kehadiran": 5.0, "sakit": 0.0, "nama": "Siddiq", "alfa": 1.0, "izin": 2.0, "tanggal": "Sabtu/6-4-2024" },
      { "kehadiran": 3.0, "sakit": 2.0, "nama": "Anna", "alfa": 1.0, "tanggal": "Sabtu/6-4-2024", "izin": 2.0 },
      // Data lainnya...
    ]
  };
  
  function kelompokkanDataBerdasarkanTanggal(data) {
    var hasil = {};
    
    // Iterasi setiap bulan
    for (var bulan in data) {
      // Iterasi setiap entri data pada bulan tersebut
      data[bulan].forEach(function(entry) {
        var tanggal = entry.tanggal;
        
        // Jika tanggal belum ada dalam hasil, buat entri baru
        if (!(tanggal in hasil)) {
          hasil[tanggal] = [];
        }
        
        // Masukkan entri ke dalam kelompok tanggal yang sesuai
        hasil[tanggal].push(entry);
      });
    }
    
    return hasil;
  }
  
  // var dataKelompok = kelompokkanDataBerdasarkanTanggal(data);
  // console.log(dataKelompok)

const sheetName = 'oktober'
const tanggal = 'Kamis/3-4-2024'
const nama = "Siddiiq"
function generateKehadiran() {
  const options = ["I", "S", "✔️", "A"]; // Pilihan kehadiran yang mungkin
  const kehadiran = [];
  
  for (let i = 0; i < 41; i++) {
    const randomIndex = Math.floor(Math.random() * options.length); // Menghasilkan indeks acak
    const randomKehadiran = options[randomIndex]; // Memilih kehadiran secara acak dari opsi
    kehadiran.push(randomKehadiran); // Menambahkan kehadiran ke array
  }
  
  return kehadiran;
}


const kehadiran = generateKehadiran()

fetch('https://script.google.com/macros/s/AKfycbyap6NPMSjH6FI2R-Genpx83fzNDenULA8FOXmaK1texVt32npRw4sHhfUunbeTMCqp/exec', {
    redirect: "follow",
    method: 'POST',
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    mode:"no-cors",
    body: JSON.stringify({ "sheetName":sheetName,"tanggal": tanggal, "nama": nama, "kehadiran": kehadiran })
  }).then(response => response.json()).then(data => {
    console.log('Data komentar terbaru:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  })