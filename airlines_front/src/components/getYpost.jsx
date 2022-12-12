import axios from 'axios'


// ITINERARIOS
axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/origen_destino', {params:{airportName:originAirportName}})
.then((res)=>{
    console.log(res.data)
}).catch((error)=>{
    console.log(error)
})

axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/origen_destino', {params:{airportName:destinyAirportName}})
.then((res)=>{
    console.log(res.data)
}).catch((error)=>{
    console.log(error)
})

axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/aiportCode_flightSegment', {params:{airporCode:originAirporCode}})
.then((res)=>{
    console.log(res.data)
}).catch((error)=>{
    console.log(error)
})

axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/aiportCodeIdVuelo_flightSegment', {params:{airporCode:originAirporCode, idTrayecto:idTrayecto}})
.then((res)=>{
    console.log(res.data)
}).catch((error)=>{
    console.log(error)
})

axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/IdVuelo_flightSegment', {params:{idTrayecto:idTrayecto}})
.then((res)=>{
    console.log(res.data)
}).catch((error)=>{
    console.log(error)
})

axios.get('http://localhost:8081/api/nuevoVuelo/aerolineas/conexiones', 
{params:{origenAirlineCode:origenAirlineCode,origenFlightNumber:origenFlightNumber,
    origenAirportCodeDestino:origenAirportCodeDestino,origenIdSegment:origenIdSegment}})
.then((res)=>{
    console.log(res.data)
}).catch((error)=>{
    console.log(error)
})
// ----------------------------------FIN ITINERARIOS-------------------------------



//--------------------------INSERT
axios.post('http://localhost:8081/api/insertFlight',{})
.then((res)=>{
    console.log(res.data)
}).catch((error)=>{
    console.log(error)
})

axios.post('http://localhost:8081/api/insertFilghtSegment',{})
.then((res)=>{
    console.log(res.data)
}).catch((error)=>{
    console.log(error)
})

axios.post('http://localhost:8081/api/insertConnection',{})
.then((res)=>{
    console.log(res.data)
}).catch((error)=>{
    console.log(error)
})