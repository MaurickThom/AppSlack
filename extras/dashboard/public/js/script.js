let myData = []
const updateData = (index, value) => (
    myData[index] += value
)

const contextCanvas = document.getElementById("myChart").getContext('2d')
const product = document.getElementById('product')
const quantity = document.getElementById('quantity')
const btnSend = document.getElementById('send')

const myChart = new Chart(contextCanvas, {
    type: 'doughnut',
    data: {
        labels: ["Pants", "Shirts", "Shoes", "Dresses", "Accesories"],
        datasets: [{
            label: '# Sales',
            data: myData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes:[]
        },
        responsive: true,
        maintainAspectRatio: false
    }
})

const ws = new WebSocket('ws://localhost:1700')

ws.onopen = () => (
    console.log('CONNECTED')
)

ws.onerror = e => (
    console.log('CONNECTION ERROR', e)
)

ws.onmessage = e => {
    console.log(e.data)
    // console.log(e.data)
    // const msg = JSON.parse(e.data)
    // updateData(msg.product, msg.quantity)
    // myChart.update()
}

btnSend.addEventListener('click', e => {
    e.preventDefault()
    const msg = {
        product: parseInt(product.value, 10),
        quantity: parseInt(quantity.value, 10)
    }
    ws.send(JSON.stringify(msg))
})