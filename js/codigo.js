//PROMISE

let promesa = new Promise((resolve,reject)=>{ // RECIBE DOS VARIABLES UNA POSITIVA Y OTRA NEGATIVA
    console.log("Estamos haciendo algo")
    var x = 1
    if (x < 10) {
        throw new Error ("El numero es pequeño")
    }
    resolve()
})

promesa.then(()=>{ // La promesa es positiva se pone THEN
    console.log("Lo hiciste!!")
}).catch ((rta)=>{
    console.log(rta)
})


// EJEMPLO 2

function activar() {
    return new Promise((resolve,reject)=>{
        var xhr = new XMLHttpRequest()
        xhr.open("get","https://jsonplaceholder.typicode.com/posts") 
        xhr.addEventListener("load",()=>{
            if (xhr.status == 200)   {
                resolve(JSON.parse(xhr.response))
            } else {
                reject()
            }
        })
        xhr.send()
    })
}
activar().then((r)=>{ // Imprimite la url
    console.log(r)
}).catch(()=>{
    console.log("Algo salió mal")
})


// EJEMPLO 3

let promesa2 = new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest()
    xhr.open("get","archivo.txt")
    xhr.addEventListener("load",()=>{
        if (xhr.status == 200) {
            resolve(xhr.response)
        }
        
    })
    xhr.send()
})
promesa2.then((valor)=>{ // Imprime archivo .txt
    console.log(valor) 
    return new Promise ((resolve,reject)=>{
        let xhr = new XMLHttpRequest()
        xhr.open("get","archivo2.txt")
        xhr.addEventListener("load",()=>{
            if (xhr.status == 200) {
                resolve(xhr.response + valor)
            }
            
        })
        xhr.send()
    })
}).then((valor)=>{
    console.log("Promesa 2 resuelta" + valor)
}).catch(()=>{
    console.log("Error!")
})



var boton = document.getElementById("boton")
boton.addEventListener("click",()=>{
    fetch("archivo.txt").then((response)=>{ // COMO AJAX, YA LEYÓ Y CARGÓ TODO
        console.log("respuesta" + response.ok) // ESTE METODO DEVUELVE UN V O F 
        if (response.ok) {
            response.text().then((datos)=>{
                console.log("Muestro la respuesta: " + datos)
            })
        } else {
            mostrarError("Status: " + response.status)
        }
    }).catch(mostrarError)
})
function mostrarError(x) {
    console.log("Error" + x)
}

// EJEMPLO 5

fetch("https://jsonplaceholder.typicode.com/users").then((response)=>{
    console.log(response) // TE TRAE TODO EL CONTENIDO DEL URL
    return response.json()
}).then((usuarios)=>{
    console.log(usuarios)
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usuarios[0].id}`).then((response)=>{
        console.log(response)
        return response.json()
    }).then((posts)=>{
        console.log(posts)
        console.log(posts[0].title)
    })
})