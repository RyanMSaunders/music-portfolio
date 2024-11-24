
let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#navbar__dark-mode-toggle");

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled')
}


const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', null)
}

if (darkMode === 'enabled') {
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
})