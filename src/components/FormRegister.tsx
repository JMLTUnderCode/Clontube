export function FormRegister() {
    return (
        <form action="./assets/php/RegistroUsuarioBD.php" method="POST" className="formulario-registro">
            <h2>Registrarse</h2>
            <input type="text" placeholder="Nombre Completo" name="nombre_completo" />
            <input type="text" placeholder="Nombre de Usuario" name="nuevo_usuario" />
            <input type="text" placeholder="Correo Electrónico" name="nuevo_correo_usuario" />
            <input type="text" placeholder="Confirmar Correo Electrónico" name="confir_nuevo_correo_usuario" />
            <input type="password" placeholder="Contraseña" name="nueva_contrasena_usuario" />
            <input type="password" placeholder="Confirmar Contraseña" name="confir_nueva_contrasena_usuario" />
            <button id="btn-registro" type="submit">Registro</button>
        </form>
    );
};