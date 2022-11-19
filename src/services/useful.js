
export const errorCheck = ( value,type, password1) => {

    switch(type){

        case "text":

            if (! /[a-z]/gi.test(value)) {
                return "Formato no válido";
            } 

        break;
        case "name":

            if (value === "") {
                return "Este campo no puede estar vacío";
            } else if(! /[a-z]/gi.test(value)){
                return "Formato no válido";

            }

        break;

        case "email":

            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ) {
                return "Escriba un formato correcto de email";
            } 

        break;

        case "password":
            if (value.length < 8) {
                return"La contraseña debe contener al menos 8 carácteres";
              }
              // validate it has one lower case letter
              if (!value.match(/[a-z]/)) {
                return"La contraseña debe contener al menos una minúscula";
              }
              // validate it has one upper case letter
              if (!value.match(/[A-Z]/)) {
                return"La contraseña debe contener al menos una mayúscula";
              }
              // validate it has one number
              if (!value.match(/[0-9]/)) {
                return"La contraseña debe contener al menos un número";
              }

              break;

        case "password2":

            if(value !== password1){
                return "Las contraseñas no coinciden"
            }

        break;

        default:
            console.log("Error. Report it to someone");

        break;

    }


};

