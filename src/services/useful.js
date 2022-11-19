
export const errorCheck = (value,type, password1) => {

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

