
const incarcaProduse = () => JSON.parse(localStorage.getItem('listaCumparaturi') || '[]');


const salveazaProduse = (produse) => localStorage.setItem('listaCumparaturi', JSON.stringify(produse));


const adaugaProdus = (nume, cantitate, unitate) => {
    const produse = incarcaProduse();
    const id = produse.length ? produse[produse.length - 1].id + 1 : 1; 
    produse.push({ id, nume, cantitate, unitate });
    salveazaProduse(produse);
};


const stergeProdus = (id) => {
    const produse = incarcaProduse();
    const produseActualizate = produse.filter(p => p.id !== id);
    salveazaProduse(produseActualizate);
    afiseazaProduse(); 
};


const afiseazaProduse = () => {
    const produse = incarcaProduse();
    const listaProduse = document.getElementById('lista-produse');
    listaProduse.innerHTML = produse.map(produs => `
        <li>
            ${produs.nume} - ${produs.cantitate} ${produs.unitate}
            <button onclick="stergeProdus(${produs.id})">Șterge</button>
        </li>
    `).join('');
};


const handleSubmit = (event) => {
    event.preventDefault();
    const nume = document.getElementById('nume').value;
    const cantitate = parseInt(document.getElementById('cantitate').value);
    const unitate = document.getElementById('unitate').value;

    if (!nume || !cantitate) {
        alert('Completează toate câmpurile!');
        return;
    }

    adaugaProdus(nume, cantitate, unitate);
    document.getElementById('formular-produs').reset();
    afiseazaProduse();
};


const initCumparaturi = () => {
    document.getElementById('formular-produs').addEventListener('submit', handleSubmit);
    afiseazaProduse();
};


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCumparaturi);
} else {
    initCumparaturi();
}
