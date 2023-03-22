export default () => {
  const viewLogin = `
    <div class = "container">
       <h1>Hola!</h1>
    </div>
  `;

  const sectionElement = document.createElement('section');
  sectionElement.innerHTML = viewLogin;

  return sectionElement;
};