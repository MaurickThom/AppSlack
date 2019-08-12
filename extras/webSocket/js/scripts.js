let ws = null

const CONNECT = document.getElementById('connect'),
    DISCONNECT = document.getElementById('disconnect'),
    SEND = document.getElementById('send'),
    mainContainer = document.querySelector('#main-container'),
    message = document.getElementById('message'),
    chat = document.getElementById('chat')

const setText = message => (
    chat.insertAdjacentHTML('beforeend',`<div>${message}</div>`)
)

mainContainer.addEventListener('click', e => {
    e.preventDefault()
    let target = e.target
    switch (target) {
        case CONNECT:
            ws = new WebSocket('ws://demos.kaazing.com/echo')
            ws.onopen = () => setText('CONNECTED')
            ws.onclose = () => setText('DISCONNECTED')
            ws.onerror = err => setText(`ERROR ${err}`)
            ws.onmessage = message =>(
                setText(message.data)
            )
            break
        case DISCONNECT:
            ws.close()
            break
        case SEND:
            ws.send(message.value)
            break
        default:
            break
    }
})