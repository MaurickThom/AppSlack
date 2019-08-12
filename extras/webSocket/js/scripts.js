let ws = null

const CONNECT = document.getElementById('connect'),
    DISCONNECT = document.getElementById('disconnect'),
    SEND = document.getElementById('send'),
    mainContainer = document.querySelector('#main-container'),
    name = document.getElementById('name'),
    msg = document.getElementById('message'),
    chat = document.getElementById('chat')

const setText = message => (
    chat.insertAdjacentHTML('beforeend',`<div>${message}</div>`)
)

const setMessage = message => (
    chat.insertAdjacentHTML('beforeend',`
        <div>${message.name} : ${message.msg}</div>
    `)
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
                setMessage(JSON.parse(message.data))
            )
            break
        case DISCONNECT:
            ws.close()
            break
        case SEND:
            let message = {
                name :name.value,
                msg : msg.value
            }
            ws.send(JSON.stringify(message))
            break
        default:
            break
    }
})