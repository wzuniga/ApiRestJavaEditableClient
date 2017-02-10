var Builder = {};

/**
 *   - scope: Variable general angularjs.
 *   - element: Nombre de la variable en scope donde se guarda los componentes.
 *   - ***Name: Nombre de la variable del componente.
 */
var labelBuilder = function(scope, element, labelName){
    scope[element].push(scope[labelName]);
}

var comboBuilder = function(scope, element, comboName){
    scope[element].push(scope[comboName]);
}

var buttonBuilder = function(scope, element, buttonName){
    scope[element].push(scope[buttonName]);
}

var grillBuilder = function(scope, element, grillName){
    scope[element].push(scope[grillName]);
}

Builder = {
    buildLabel: labelBuilder,
    buildCombo: comboBuilder,
    buildButton: buttonBuilder,
    buildGrill: grillBuilder
};
