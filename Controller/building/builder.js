var Builder = {};

var labelBuilder = function(scope, element, labelName){
    scope[element].push(scope[labelName]);
}

Builder = {
    buildLabel: labelBuilder
};

