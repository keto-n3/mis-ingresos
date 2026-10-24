import { useState } from "react";

function Login({ onLogin, onRegister, onForgot }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("⚠️ Por favor ingresa usuario y contraseña.");
      return;
    }

    const savedUsers = JSON.parse(
      localStorage.getItem("misIngresosUsers") || "[]"
    );

    const user = savedUsers.find(
      (user) =>
        user.username.toLowerCase() ===
          username.trim().toLowerCase() &&
        user.password === password
    );

    if (!user) {
      alert("❌ Usuario o contraseña incorrectos.");
      return;
    }

    onLogin(user.username);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card">

            <div className="card-header text-center">

              <i className="fas fa-chart-line logo-icon"></i>

              <h1 className="display-4 fw-bold">
                Mis Ingresos
              </h1>

              <p className="mb-0">
                Gestiona tus finanzas fácilmente
              </p>

            </div>

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Usuario
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu usuario"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                >
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Iniciar Sesión
                </button>

                <div className="text-center">

                  <button
                    type="button"
                    className="btn btn-link text-decoration-none me-2"
                    onClick={onForgot}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>

                  <button
                    type="button"
                    className="btn btn-link text-decoration-none"
                    onClick={onRegister}
                  >
                    Registrarse
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;