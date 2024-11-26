console.log('In main.js!')

var usernameInput = document.querySelector('#username');
var btnJoin = document.querySelector('#btn-join')

var username;

var webSocket;

function webSocketOnMessage(event){
    console.log("first")
    var parsedData = JSON.parse(event.data);
    var message = parsedData['message'];

    console.log("message: ", message);
}

btnJoin.addEventListener('click', ()=>{
    username = usernameInput.value;

    console.log("username: ", username);

    if(username == ''){
        return;
    }

    usernameInput.value = '';
    usernameInput.disabled = true;
    usernameInput.style.visibility = 'hidden';

    btnJoin.disabled = true;
    btnJoin.style.visibility = 'hidden';

    var labelUsername = document.querySelector('#label-username');
    labelUsername.innerHTML = username;


    // WebSocket
    var loc = window.location;
    var wsStart = 'ws://';

    if(loc.protocol == 'https:'){
        wsStart = 'wss://';
    }

    var endPoint = wsStart + loc.host + loc.pathname;

    console.log('endPoint: ', endPoint);

    webSocket = new WebSocket(endPoint);
    console.log(webSocket)


    webSocket.addEventListener('open', (e)=>{
        console.log("Connection Opened!")
    });

    webSocket.addEventListener('message', webSocketOnMessage);

    webSocket.addEventListener('close', (e)=>{
        console.log("Connection Closed!")
    });
    webSocket.addEventListener('error', (e)=>{
        console.log("Error Occurred!")
    });


})