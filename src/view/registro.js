import { createUserEmail, signIn } from '../lib/firebase';

export default () => {
    const vistaRegistro = `
    <div class = "container">
        <div class="row">
            <h1>Club de Lectoras Ocupadas</h1>
            <div class="col-6">
                <h2>Regístrate</h2>
                <form>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" class="form-control" />
                    </div>
                    <input id="btn-registro" type="submit" value="Registrarme" class="btn btn-primary" />
                </form>
            </div>
            <div class="col-6">
                <h2>Inicia Sesión</h2>
                <form>
                    <div class="form-group">
                        <label for="email_login">E-mail</label>
                        <input type="email" id="email_login" name="email" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="password_login">Password</label>
                        <input type="password" id="password_login" name="password" class="form-control" />
                    </div>
                    <input id="btn-login" type="submit" value="Inicia Sesión" class="btn btn-info" />
                </form>
            </div>
        </div>
    </div>
  `;

    const sectionElement = document.createElement('section');
    sectionElement.innerHTML = vistaRegistro;

    //Registro
    const registrarCuenta = sectionElement.querySelector('#btn-registro');
    registrarCuenta.addEventListener('click', (e) => {
        e.preventDefault();
        const emailUser = document.getElementById('email').value;
        const passwordUser = document.getElementById('password').value;
        createUserEmail(emailUser, passwordUser);
    });

    //Inicio de Sesión
    const iniciarSesion = sectionElement.querySelector('#btn-login');
    iniciarSesion.addEventListener('click', (e) => {
        e.preventDefault();
        const emailUser = document.getElementById('email_login').value;
        const passwordUser = document.getElementById('password_login').value;
        signIn(emailUser, passwordUser);
    });

  return sectionElement;
};