export function FormLogin() {
    return (
        <form action="./assets/php/LoginUsuarioBD.php" method="POST" className="formulario-login">
            <h2>Iniciar Sesión</h2>
            <input type="text" placeholder="Correo Electrónico" name="correo_usuario" />
            <input type="password" placeholder="Contraseña" name="contrasena_usuario" />
            <button id="btn-entrar" type="submit">Entrar</button>
        </form>
    );
};