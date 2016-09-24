var mainSearch;
var exclude;
var domain;
var definition;

var canExclude;
var canDomain;
var canDefintion;
var canGlossary;

function build(){
    mainSearch = document.getElementById('search');
	exclude = document.getElementById('exclude');
	domain = document.getElementById('domain');
    definition = document.getElementById('definition');
    canExclude = document.getElementById('canExclude');
	canDomain = document.getElementById('canDomain');
    canDefinition = document.getElementById('canDefinition');
    canGlossary = document.getElementById('canGlossary');
    
	var _excludeData = exclude.value;
	var _excludeArray = _excludeData.split(",");
	
	//http://www.google.com/search?q=<SEARCH TERM>&tbm=isch
    
	var search = "http://www.google.com/search?q=" + mainSearch.value;
    if(canDomain.checked) search += "+site:" + domain.value;
    
    if(canDefinition.checked) search += "+define:" + definition.value;
    
    if(canGlossary.checked) search += "~glossary";
    
    for(var e in _excludeArray){
       if(canExclude.checked) search += " -" + _excludeArray[e]; 
    }
    
    return search;
}

function searchWithSettings(){    
    window.open(build());
}

function buildAndPrint(){
    document.getElementById('output').innerHTML = build();
}