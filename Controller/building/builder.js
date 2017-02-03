var Builder = {};

var labelBuilder = function(scope, element, labelName){
    scope[element].push(scope[labelName]);
}

var comboBuilder = function(scope, element, labelName){
    scope[element].push(scope[labelName]);
}

Builder = {
    buildLabel: labelBuilder,
    buildCombo: comboBuilder
};

