
document.addEventListener('DOMContentLoaded', () => {

let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#navbar__dark-mode-toggle");

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled')
}


const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.removeItem('darkMode')
}

if (darkMode === 'enabled' || darkMode === null) {
  enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') {
    enableDarkMode();
    console.log(darkMode);
    
  } else {
    disableDarkMode();
    console.log(darkMode);

  }

  // Log the new value of darkMode after toggle
  console.log('Current darkMode value:', localStorage.getItem('darkMode'));
})

});
