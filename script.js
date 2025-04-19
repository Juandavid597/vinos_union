document.getElementById('miForm').addEventListener('submit', function(event) {
    event.preventDefault()

    const userName = document.getElementById('userName').value.trim()
    const email = document.getElementById ('email').value.trim()
    const userPhone = document.getElementById ('userPhone').value.trim()

    if (!userName || !email || !userPhone) {
        console.log('Todos los campos son obligatorios')
        return
    }

    if (userName.length < 8) {
        console.log('El usuario debe tener más de 8 caracteres')
        return
    }
    if (userName && email) {
        console.log(`usuario: ${userName}`)
        console.log(`email: ${email}`)
        console.log(`Télefono: ${userPhone}`)
        console.log ('Todo correcto')
    } else {
        console.log ('Algunos campos estan vacios')
    }
    // Guardar en LocalStorage
    localStorage.setItem('registroUsuario', JSON.stringify(userData))

    console.log('Datos guardados en localStorage:', userData)
})