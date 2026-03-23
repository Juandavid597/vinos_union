document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('miForm');
    if (!form) return;

    const campos = {
        userName:    { el: document.getElementById('userName'),    error: document.getElementById('error-nombre'),    min: 3 },
        email:       { el: document.getElementById('email'),       error: document.getElementById('error-email'),     min: 0 },
        userPhone:   { el: document.getElementById('userPhone'),   error: document.getElementById('error-telefono'),  min: 7 },
        userCity:    { el: document.getElementById('userCity'),    error: document.getElementById('error-ciudad'),    min: 2 },
    };

    function mostrarError(campo, mensaje) {
        campo.error.textContent = mensaje;
        campo.error.classList.add('visible');
        campo.el.style.borderColor = '#ff6b6b';
    }

    function limpiarError(campo) {
        campo.error.classList.remove('visible');
        campo.el.style.borderColor = '';
    }

    // Validación en tiempo real al salir de cada campo
    Object.values(campos).forEach(function (campo) {
        campo.el.addEventListener('blur', function () {
            validarCampo(campo);
        });
        campo.el.addEventListener('input', function () {
            limpiarError(campo);
        });
    });

    function validarCampo(campo) {
        const valor = campo.el.value.trim();
        if (!valor) {
            mostrarError(campo, 'Este campo es obligatorio.');
            return false;
        }
        if (campo.el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
            mostrarError(campo, 'Ingresa un correo electrónico válido.');
            return false;
        }
        if (campo.el.type === 'tel' && valor.replace(/\D/g, '').length < 7) {
            mostrarError(campo, 'Ingresa un número de teléfono válido.');
            return false;
        }
        if (valor.length < campo.min) {
            mostrarError(campo, 'Este campo es demasiado corto.');
            return false;
        }
        limpiarError(campo);
        return true;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validar todos los campos
        let valido = true;
        Object.values(campos).forEach(function (campo) {
            if (!validarCampo(campo)) valido = false;
        });

        if (!valido) return;

        const nombre   = campos.userName.el.value.trim();
        const email    = campos.email.el.value.trim();
        const telefono = campos.userPhone.el.value.trim();
        const ciudad   = campos.userCity.el.value.trim();
        const mensaje  = document.getElementById('userMessage').value.trim();

        // Armar mensaje para WhatsApp con los datos del formulario
        const texto = [
            '¡Hola Vinos Unión! Me interesa ser distribuidor.',
            '',
            'Nombre: ' + nombre,
            'Correo: ' + email,
            'Teléfono: ' + telefono,
            'Ciudad: ' + ciudad,
            mensaje ? 'Mensaje: ' + mensaje : ''
        ].filter(Boolean).join('\n');

        const urlWhatsApp = 'https://wa.me/573004941172?text=' + encodeURIComponent(texto);

        // Mostrar confirmación y abrir WhatsApp
        const exito = document.getElementById('form-exito');
        exito.classList.add('visible');
        form.reset();

        setTimeout(function () {
            window.open(urlWhatsApp, '_blank');
        }, 800);
    });
});