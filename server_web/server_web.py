import socket
import os  # pentru dimensiunea fisierului

def get_mime_type(filename):
    ext = filename.split('.')[-1]
    return {
        'html': 'text/html; charset=utf-8',
        'css': 'text/css; charset=utf-8',
        'js': 'text/javascript; charset=utf-8',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'ico': 'image/x-icon',
        'xml': 'application/xml; charset=utf-8',
        'json': 'application/json; charset=utf-8'
    }.get(ext, 'text/plain; charset=utf-8')

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.bind(('', 5678))  
serversocket.listen(5)  

while True:
    print('Serverul așteaptă conexiuni...')
    (clientsocket, address) = serversocket.accept()
    print(f'Client conectat: {address}')
    
    cerere = ''
    linieDeStart = ''
    
    while True:
        buf = clientsocket.recv(1024)
        if not buf:
            break
        cerere += buf.decode()
        if '\r\n' in cerere and not linieDeStart:
            linieDeStart = cerere.split('\r\n')[0]
            break
    
    if not linieDeStart:
        clientsocket.close()
        continue
    
    elementeLinieStart = linieDeStart.split()
    numeResursaCeruta = elementeLinieStart[1] 
    if numeResursaCeruta == '/':
        numeResursaCeruta = '/index.html'
    
    numeResursaCeruta = numeResursaCeruta.lstrip('/')
    base_dir = os.path.dirname(os.path.abspath(__file__))  
    numeFisier = os.path.join(base_dir, '..', 'continut', numeResursaCeruta)
 
    print("CERERE:", linieDeStart)
    print("Resursă cerută:", numeResursaCeruta)
    print("Fișier pe disc:", numeFisier)

   
    try:
        with open(numeFisier, 'rb') as fisier:
            continut = fisier.read()
            tipMedia = get_mime_type(numeFisier)
            
            # Trimite răspuns HTTP 200 OK
            clientsocket.sendall(b'HTTP/1.1 200 OK\r\n')
            clientsocket.sendall(f'Content-Length: {len(continut)}\r\n'.encode())
            clientsocket.sendall(f'Content-Type: {tipMedia}\r\n'.encode())
            clientsocket.sendall(b'Server: My PW Server\r\n')
            clientsocket.sendall(b'Access-Control-Allow-Origin: *\r\n')  
            clientsocket.sendall(b'\r\n')
            clientsocket.sendall(continut)
    except IOError:
        msg = f'Eroare 404! Resursa {numeResursaCeruta} nu a fost găsită.'
        clientsocket.sendall(b'HTTP/1.1 404 Not Found\r\n')
        clientsocket.sendall(f'Content-Length: {len(msg.encode())}\r\n'.encode())
        clientsocket.sendall(b'Content-Type: text/plain; charset=utf-8\r\n')
        clientsocket.sendall(b'Server: My PW Server\r\n')
        clientsocket.sendall(b'\r\n')
        clientsocket.sendall(msg.encode())
    
    clientsocket.close()
    print('Conexiunea cu clientul a fost închisă.')
