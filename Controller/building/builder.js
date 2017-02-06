var Builder = {};

var labelBuilder = function(scope, element, labelName){
    scope[element].push(scope[labelName]);
}

var comboBuilder = function(scope, element, comboName){
    scope[element].push(scope[comboName]);
}

var buttonBuilder = function(scope, element, buttonName){
    scope[element].push(scope[buttonName]);
}

Builder = {
    buildLabel: labelBuilder,
    buildCombo: comboBuilder,
    buildButton: buttonBuilder
};

