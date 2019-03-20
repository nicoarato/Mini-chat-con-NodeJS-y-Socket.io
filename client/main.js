var socket = io.connect('192.168.0.5:6677',{'forceNew':true});

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message, index){
        return (` 
            <div class="message">
                <strong>${message.nickname}</strong> dice: 
                <p>${message.text}</p>
            </div>
        `);

    }).join(' ');

    var div_msgs= document.getElementById('messages');
    div_msgs.innerHTML= html;
    div_msgs.scrollTop = div_msgs.scrollHeight; //MAntiene el foco de los mensajes a la vista

}


function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none'; //para no cambiar el nick una vez que se escribe uno
    
    socket.emit('add-message', message);
    return false;
}