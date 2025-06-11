function incarcaPersoane() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML;
            var persoane = xmlDoc.getElementsByTagName("persoana");
            var html =  `<table class="tabel-persoane">
                            <tr>
                                <th>ID</th>
                                <th>Nume</th>
                                <th>Prenume</th>
                                <th>Varsta</th>
                                <th>Adresa</th>
                            </tr>`;
            
            for (var i = 0; i < persoane.length; i++) {
                var p = persoane[i];
                var adresa = p.getElementsByTagName("adresa")[0];
                html += '<tr>';
                html += '<td>' + p.getAttribute("id") + '</td>';
                html += '<td>' + p.getElementsByTagName("nume")[0].textContent + '</td>';
                html += '<td>' + p.getElementsByTagName("prenume")[0].textContent + '</td>';
                html += '<td>' + p.getElementsByTagName("varsta")[0].textContent + '</td>';
                html += '<td>' + 
                    adresa.getElementsByTagName("strada")[0].textContent + ' ' +
                    adresa.getElementsByTagName("numar")[0].textContent + ', ' +
                    adresa.getElementsByTagName("localitate")[0].textContent + ', ' +
                    adresa.getElementsByTagName("judet")[0].textContent +
                    '</td>';
                html += '</tr>';
            }
            
            html += '</table>';
            document.getElementById("continut").innerHTML = html;
        }
    };
    xhttp.open("GET", "resurse/persoane1.2.xml", true);
    xhttp.send();
}