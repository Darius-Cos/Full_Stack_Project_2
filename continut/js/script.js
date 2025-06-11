
// Funcții pentru Secțiunea 1
function afiseazaInformatii() {
    let dataOra = new Date();
    let dataOraFormatata = dataOra.toLocaleDateString('ro-RO') + ' ' + dataOra.toLocaleTimeString('ro-RO');
    document.getElementById('data-ora').innerHTML = dataOraFormatata;
    
    document.getElementById('url').innerHTML = window.location.href;
    
    function afiseazaLocatie(position) {
        let coordonate = "Latitudine: " + position.coords.latitude + 
                        ", Longitudine: " + position.coords.longitude;
        document.getElementById('locatie').textContent = coordonate;
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(afiseazaLocatie);
    } else {
        document.getElementById('locatie').textContent = "Geolocation nu este suportat de acest browser";
    }
    
 
    document.getElementById('browser').innerHTML = navigator.userAgent;
    document.getElementById('sistem').innerHTML = navigator.platform;
}

// Funcții pentru Secțiunea 2
function initializeazaCanvas() {
    const canvas = document.getElementById('canvas-desen');
    // Obține contextul de desenare 2D al canvas-ului (ne permite să desenăm)
    const context = canvas.getContext('2d');
    let clickCount = 0;
    let startX, startY;
    
    // Desenează conținut inițial pe canvas
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, 600, 500);

    function handleCanvasClick(event) {
        const rect = canvas.getBoundingClientRect(); // imi da distanța dintre marginea stângă a viewport și marginea stângă a canvas   
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
       
        
        if (clickCount === 0) {
            startX = x;
            startY = y;
            clickCount = 1;
        } else {
            const culoareContur = document.getElementById('culoare-contur').value;
            const culoareUmplere = document.getElementById('culoare-umplere').value;
            

            context.beginPath();
            context.rect(startX, startY, x - startX, y - startY);
  
            context.fillStyle = culoareUmplere;
            context.fill();
            
            context.strokeStyle = culoareContur;
            context.stroke();
            
            clickCount = 0;
        }
    }
    
    canvas.addEventListener('click', handleCanvasClick);
}

// Funcții pentru Secțiunea 3
function initializeazaTabel() {

    let tabel = document.getElementById('tabel-dinamic');
    if (!tabel.rows.length) {
        for (let i = 0; i < 3; i++) {
            let rand = tabel.insertRow();
            for (let j = 0; j < 3; j++) {
                let celula = rand.insertCell();
                celula.textContent = `Celula ${i+1}-${j+1}`;
            }
        }
    }
    

    document.getElementById('adauga-rand').addEventListener('click', adaugaRand);
    document.getElementById('adauga-coloana').addEventListener('click', adaugaColoana);
}
let retine_rand=0;
let retine_coloana=0;
function adaugaRand() {
    const tabel = document.getElementById('tabel-dinamic');
    const pozitie = parseInt(document.getElementById('pozitie').value);
    const culoare = document.getElementById('culoare-tabel').value;
    
    // Verifică dacă poziția este validă
    if (isNaN(pozitie) || pozitie < 0 || pozitie > tabel.rows.length) {
        alert('Poziție invalidă! Introduceți un număr între 0 și ' + tabel.rows.length);
        return;
    }
    
    const randNou = tabel.insertRow(pozitie);

    for (let i = 0; i < tabel.rows[0].cells.length; i++) {
        const celulaNou = randNou.insertCell();
        celulaNou.textContent = `Rând nou ${retine_rand++}`;
        celulaNou.style.backgroundColor = culoare;
    }
}

function adaugaColoana() {
    const tabel = document.getElementById('tabel-dinamic');
    const pozitie = parseInt(document.getElementById('pozitie').value);
    const culoare = document.getElementById('culoare-tabel').value;
    

    if (isNaN(pozitie) || pozitie < 0 || pozitie > tabel.rows[0].cells.length) {
        alert('Poziție invalidă! Introduceți un număr între 0 și ' + tabel.rows[0].cells.length);
        return;
    }
    
    for (let i = 0; i < tabel.rows.length; i++) {
        const celulaNou = tabel.rows[i].insertCell(pozitie);
        celulaNou.textContent = `Coloană nouă ${retine_coloana++}`;
        celulaNou.style.backgroundColor = culoare;
    }
}

function inregistreazaUtilizator(event) {
    event.preventDefault(); 
    let info = {
        username: document.getElementById('username').value,
        parola: document.getElementById('parola').value
    };

    fetch('http://localhost:5678/api/utilizatori', {  // Asigură-te că acest URL este corect
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
    })
    .then(raspuns => {
        if (raspuns.ok) {
            alert("Înregistrare realizată cu succes!");
        } else {
            alert("Eroare la înregistrare!");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Eroare la conectare!");
    });
}




function initInvata() {
    afiseazaInformatii();
    initializeazaCanvas();
    initializeazaTabel();
    
}