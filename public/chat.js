const socket = io()

// DOM elements
let message = document.getElementById("message")
let username = document.getElementById("username")
let btn = document.getElementById("send")
let output = document.getElementById("output")
let actions = document.getElementById("actions")

btn.addEventListener("click", () => {
    let msg = {
        username: username.value,
        message: message.value,
    }
    socket.emit("chat:message", msg)
    console.log()
})

message.addEventListener("keypress", () => {
    socket.emit("chat:typing", username.value)
})

socket.on("chat:message", (data) => {
    if(data.username == username.value) {
        output.innerHTML += `<p class="message_burble own">
        <strong>${data.username}</strong>: ${data.message}
    </p>`;
    } else {
        output.innerHTML += `<p class="message_burble">
        <strong>${data.username}</strong>: ${data.message}
    </p>`;
    }
    
    actions.innerHTML = ""
})

socket.on("chat:typing", (data) => {
    actions.innerHTML = `<p><em>${data}</em> is typing</p>`
})