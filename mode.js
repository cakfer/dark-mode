var themeColors = {
  'light':'#F4F0EB',
  'dark':'#444',
  'blue':'#ACCBE1',
  'red':'#fdb1b8',
  'high-contrast':'#000'
}

var lightThemeMetaTag = document.getElementById('light-theme-meta-tag')
var darkThemeMetaTag = document.getElementById('dark-theme-meta-tag')
var body = document.body

var selectedTheme = 'light'


function updateTheme(theme) {

	var color = themeColors[theme]
	
	lightThemeMetaTag.setAttribute("content", color);
	darkThemeMetaTag.setAttribute("content", color);
	body.style.backgroundColor = color;
	
	selectedTheme = theme

	saveThemeToLocalStorage(theme)
	
}

function swapLightAndDark(){

	var light = themeColors.light
	var dark = themeColors.dark
	themeColors.dark = light
	themeColors.light = dark

}

function saveThemeToLocalStorage(theme){

	if(localStorage){
		localStorage.setItem('color-scheme', theme);
	}

}

function getThemeFromLocalStorage(){

	if(localStorage){
	
		var savedColorScheme = localStorage.getItem('color-scheme');
	
		if(savedColorScheme){
			var radioButton = document.getElementById(savedColorScheme);
			radioButton.checked = true;
			updateTheme(savedColorScheme)
		}
	}  
}


var preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
var dark = preferedColorScheme.matches
  

if(dark){
	swapLightAndDark()
}

preferedColorScheme.addEventListener('change', () => {
	swapLightAndDark()
	setTheme(selectedTheme)
});


var radios = document.querySelectorAll('input[type=radio][name="color-scheme"]');

radios.forEach(radio => radio.addEventListener('change', (event) => {

	var theme = event.target.id
	updateTheme(theme)
	
}));



// This must be called after the check for dark mode
getThemeFromLocalStorage()
