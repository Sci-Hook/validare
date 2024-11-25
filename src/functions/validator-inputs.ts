import { validator } from "../validator";

export async function validate_element(selector_or_element) {
    
    var target;

    if (typeof target == 'string'){
        target =  document.querySelector(selector_or_element);
    }else{
        target = selector_or_element;
    }

    var value = target.value;
    var schema;

    if (target.getAttribute('data-validate') != '') {
        schema = target.getAttribute('data-validate');
    }else{
        schema =target.getAttribute('name')
    }
    
    var result = await validator(schema,value);

    target.setAttribute('data-validation-status',result.status ? 'true' : 'false');
    target.setAttribute('data-validation-full-result',JSON.stringify(result)); 
}

function validate_element_event_function(event) {
    var target = (<any>event.target);
    validate_element(target);
}

if (typeof document != 'undefined') {
    document.addEventListener("DOMContentLoaded", () => {
        var validate_inputs = document.querySelectorAll('[data-validate]');
        validate_inputs.forEach( function (validate_input) {
            validate_element(validate_input);
            validate_input?.addEventListener('change',validate_element_event_function);
            validate_input?.addEventListener('keyup',validate_element_event_function);
        });
    });    
}
