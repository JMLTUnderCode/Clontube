export function FormLogin() {
    return (
        <form action="./assets/php/LoginUsuarioBD.php" method="POST" className="login-form">
            <h2>Iniciar Sesión</h2>
            <input type="text" placeholder="Usuario / Correo Electrónico" name="correo_usuario" />
            <input type="password" placeholder="Contraseña" name="contrasena_usuario" />
            <button className="btn" type="submit">Entrar</button>
        </form>
    );
};