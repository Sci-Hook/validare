document.addEventListener("DOMContentLoaded", function () {
    var validate_inputs = document.querySelectorAll('[data-validate]');
    validate_inputs.forEach(function (validate_input) {
        validate_input === null || validate_input === void 0 ? void 0 : validate_input.addEventListener('focusout', function (event) {
            var target = event.target;
            if (!target)
                return;
            var value = target.value;
            var name = target.getAttribute('name');
            get_remote_laded_schemas();
        });
    });
});
