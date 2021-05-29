const formulario=document.getElementById('formulario');

//trae un arreglo de todos los inputs que estan adentro del elemento con id formulario
const inputs=document.querySelectorAll('#formulario input')

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

//Verifica que todos los campos estén llenados para poder enviar el formulario. Al llenar 
//alguno pasa a ser true
const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}


//Esta función toma un elemento e=input y busca target.name (nombre del input)
const validarFormulario=(e)=>{
    switch (e.target.name){
        case "usuario":
            validarCampo(expresiones.usuario, e.target,'usuario');
            //break sirve para que no siva verificando los demás casos
        break

        case "nombre":
            validarCampo(expresiones.nombre, e.target,'nombre');
        break

        case "password":
            validarCampo(expresiones.password, e.target,'password');
            validarPassword2();
        break

        case "password2":
            validarPassword2();
        break

        case "correo":
            validarCampo(expresiones.correo, e.target,'correo');
        break

        case "telefono":
            validarCampo(expresiones.telefono, e.target,'telefono');
        break
    }
}


const validarCampo=(expresion,input,campo)=>{
    //Toma usuario de expresiones y con ella comprueba si el valor del input lo cumple
    if(expresion.test(input.value)){
        //elimina y agrega la clase para marcar correcto e incorrecto el input
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        //elimina y modifica el icono del input
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        //Sirve para decir que un campo se lleno correctamente
        campos[campo]=true;
    }else{
        //Agrega una clase al elemento grupo__usuario con el que se pinta de rojo el recuadro
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        //Sirve para decir que un campo no se lleno incorrectamente
        campos[campo]=false;
    }
}


const validarPassword2=()=>{
    const inputpassword1=document.getElementById('password');
    const inputpassword2=document.getElementById('password2');

    if (inputpassword1.value !== inputpassword2.value){
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        //Sirve para decir que el campo de password se lleno incorrectamente
        campos['password'] = false;
    } else{
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        //sirve para decir que el campo de password se lleno correctamente 
        campos['password'] = true;
    }
}


//Por cada input del arreglo de inputs se ejecuta algo
inputs.forEach((input)=>{
    //Cada que agrega una letra al input ejecuta la función validarFormulario
    //Keyup sirve para que al apretar una letra se valide
    input.addEventListener('keyup', validarFormulario);

    //cuando se teclee algo y se de click en otro lado tambien validará
    input.addEventListener('blur', validarFormulario);
})


//Evita que al hacer click en el botón enviar realice algo (solo para en este ejemplo) 
formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    //La constante terminos sirve para leer el check de terminos=> terminos.checked significa checado
    const terminos = document.getElementById('terminos');
    if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
        //resetea todos los datos cuando se envíen correctamente
		formulario.reset();

        //Si el formulario se envía correctamente aparece un mensaje de éxito
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

        //Es setTimeOut sirve para que el mensaje de exito de envio de formulario desaparezca después de 5 segundos
        setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

        //Toma todos los elementos .formulario__grupo-correcto y lo elimina
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
    } else {
        //Activa el mensaje de que llene correctamente el formulario
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }

});