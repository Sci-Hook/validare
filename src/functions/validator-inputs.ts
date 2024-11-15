import { validator } from "../validator";

async function validate_element(target) {
    if (!target) return
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

if (typeof document != 'undefined') {
    document.addEventListener("DOMContentLoaded", () => {
        var validate_inputs = document.querySelectorAll('[data-validate]');
        validate_inputs.forEach( function (validate_input) {
            validate_element(validate_input);
            validate_input?.addEventListener('keyup',async event => {
                var target = (<any>event.target);
                validate_element(target);
            });
        });
    });    
}
