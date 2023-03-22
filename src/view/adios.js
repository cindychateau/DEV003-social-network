export default () => {
    const viewLogin = `
      <div class = "container">
         <h1>Adiós!</h1>
      </div>
    `;
  
    const sectionElement = document.createElement('section');
    sectionElement.innerHTML = viewLogin;
  
    return sectionElement;
  };