import axios from "axios";

export const errorCheck = ( value,type, password1) => {


    switch(type){

        case "text":

            if (! /[a-z]/gi.test(value)) {
                return "Formato no válido";
            } else{
                return ""
            }

        break;
        case "name":

            if (value === "") {
                return "Este campo no puede estar vacío";
            } else if(! /[a-z]/gi.test(value)){
                return "Formato no válido";
            }else{
                return ""
            }

        break;


        case "email":

            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ) {
                return "Escriba un formato correcto de email";
            }else{
                return ""
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
              }else{
                return ""
            }

              break;

        case "password2":

            if(value !== password1){
                return "Las contraseñas no coinciden"
            }else{
                return ""
            }

        break;

        default:
            console.log("Error. Report it to someone");

        break;

    }


};

