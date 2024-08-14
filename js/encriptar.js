let textoIngresado = "";
let textoEncriptado = "";
let textoDesencriptado = "";

/**
 * Cambia la visibilidad de un elemento HTML.
 * 
 * @param {string} elemento - El selector del elemento que se quiere cambiar (e.g. ".tablero-resultado-p").
 * @param {string} opcion - La opción de visibilidad (e.g. "block", "none", "inline", etc.).
 * @returns {void}
 */
function elementoHtmlDisplay(elemento, opcion) {
    return document.querySelector(elemento).style.display = opcion;
}

/**
 * Limpia el texto del elemento especificado.
 * 
 * @param {string} elemento - El selector del elemento que se quiere limpiar (e.g. ".tablero-resultado-p").
 * @returns {void}
 */
function limpiarTexto(elemento) {
    const borrar = document.querySelector(elemento);
    borrar.textContent = "";
    borrar.value = "";
}

/**
 * Revela el botón de copiar en la interfaz de usuario.
 * 
 * @returns {void}
 */
function revelarBotonCopiar() {
    elementoHtmlDisplay(".tablero-resultado-copiar-btn", "block");
}

/**
 * Muestra el mensaje ya encriptado en el resultado.
 * 
 * @param {string} textoEncriptado - El texto encriptado a mostrar.
 * @returns {void}
 */
function mostrarResultado(textoResultado) {
    elementoHtmlDisplay(".tablero-resultado-h2", "none");
    elementoHtmlDisplay(".tablero-resultado-img", "none");
    elementoHtmlDisplay(".tablero-resultado-p", "block");
    const resultado = document.querySelector(".tablero-resultado-p");
    resultado.textContent = textoResultado;
}


/**
 * Copia el texto del resultado al portapapeles del usuario.
 * 
 * @returns {void}
 */
function copiarTexto() {
    const texto = document.querySelector(".tablero-resultado-p").textContent;
    navigator.clipboard.writeText(texto);
    limpiarTexto(".tablero-resultado-p")
}

/**
 * Activa o desactiva los botones de encriptar y desencriptar según la condición proporcionada.
 * 
 * @param {boolean} cond - La condición para activar o desactivar los botones.
 * @returns {void}
 */
function activarBtn(cond) {
    if (cond == true) {
        document.getElementById("btn-desencriptar").removeAttribute("disabled");
        document.getElementById("btn-encriptar").setAttribute("disabled", "");
    }

    else {
        document.getElementById("btn-encriptar").removeAttribute("disabled");
        document.getElementById("btn-desencriptar").setAttribute("disabled", "");
    }
}


/**
 * Valida si el texto ingresado por el usuario es válido. Un texto es válido si solo contiene letras minúsculas y espacios.
 * Si el texto no es válido, muestra un mensaje de error y limpia el texto ingresado y el resultado.
 * 
 * @returns {boolean} - true si el texto es válido, false en caso contrario.
 */
function validarTexto() {
    const textoMinusculas = textoIngresado.toLowerCase();
    const soloLetras = /^[a-z ]+$/;

    if (textoIngresado !== textoMinusculas || !textoIngresado.match(soloLetras)) {
        document.getElementById('mensaje-error').style = 'color: red; font-size: 20px;';
        limpiarTexto(".tablero-resultado-p")
        limpiarTexto('.tablero-ingreso-texto')
        return false;
    }

    return true;
}

/**
 * Encripta el texto ingresado por el usuario y muestra el resultado.
 *
 * @function btnEncriptar
 * @description Encripta el texto ingresado por el usuario y muestra el resultado.
 *              Limpia el campo de texto de ingreso y activa el botón de copiar.
 */
function btnEncriptar() {
    textoIngresado = document.querySelector(".tablero-ingreso-texto").value;
    if (validarTexto()) {
        textoEncriptado = encriptarTexto(textoIngresado);
        mostrarResultado(textoEncriptado);
        revelarBotonCopiar();
        activarBtn(true);
        limpiarTexto(".tablero-ingreso-texto");
    }
}

/**
 * Desencripta el texto ingresado por el usuario y muestra el resultado.
 *
 * @function btnDesencriptar
 * @description Desencripta el texto ingresado por el usuario y muestra el resultado.
 *              Limpia el campo de texto de ingreso y desactiva el botón de copiar.
 */
function btnDesencriptar() {
    textoIngresado = document.querySelector(".tablero-ingreso-texto").value;
    if (validarTexto()) {
        textoDesencriptado = desencriptarTexto(textoIngresado);
        mostrarResultado(textoDesencriptado);
        activarBtn(false);
        limpiarTexto(".tablero-ingreso-texto");
    }
}

/**
 * Encripta un texto según un patrón específico.
 *
 * @function encriptarTexto
 * @description Encripta un texto reemplazando cada vocal por una cadena específica.
 *              Las vocales se reemplazan de la siguiente manera:
 *              - e -> enter
 *              - i -> imes
 *              - a -> ai
 *              - o -> ober
 *              - u -> ufat
 * @param {string} texto - El texto a encriptar
 * @returns {string} El texto encriptado
 */
function encriptarTexto(texto) {
    const textoEncriptado = texto
        .replaceAll("e", "enter")
        .replaceAll("i", "imes")
        .replaceAll("a", "ai")
        .replaceAll("o", "ober")
        .replaceAll("u", "ufat");
    return textoEncriptado;
}

/**
 * Desencripta un texto según un patrón específico.
 *
 * @function desencriptarTexto
 * @description Desencripta un texto reemplazando cada cadena encriptada por su vocal correspondiente.
 *              Las cadenas encriptadas se reemplazan de la siguiente manera:
 *              - enter -> e
 *              - imes -> i
 *              - ai -> a
 *              - ober -> o
 *              - ufat -> u
 * @param {string} texto - El texto a desencriptar
 * @returns {string} El texto desencriptado
 */
function desencriptarTexto(texto) {
    const textoDesencriptado = texto
        .replaceAll("enter", "e")
        .replaceAll("imes", "i")
        .replaceAll("ai", "a")
        .replaceAll("ober", "o")
        .replaceAll("ufat", "u");
    return textoDesencriptado;
}