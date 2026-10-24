import { useState } from "react";

function Register({ onBack, onRegistered }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("⚠️ Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 4) {
      alert("⚠️ La contraseña debe tener mínimo 4 caracteres.");
      return;
    }

    const savedUsers = JSON.parse(
      localStorage.getItem("misIngresosUsers") || "[]"
    );

    const userExists = savedUsers.some(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase()
    );

    if (userExists) {
      alert("⚠️ Ese usuario ya está registrado.");
      return;
    }

    const newUser = {
      id: Date.now(),
      username: username.trim(),
      password: password,
    };

    const updatedUsers = [...savedUsers, newUser];

    localStorage.setItem(
      "misIngresosUsers",
      JSON.stringify(updatedUsers)
    );

    alert("✅ Cuenta creada correctamente.");

    onRegistered(username.trim());
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header text-center">
              <i className="fas fa-user-plus logo-icon"></i>

              <h1 className="display-6 fw-bold">
                Crear Cuenta
              </h1>

              <p className="mb-0">
                Regístrate en Mis Ingresos
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
                    placeholder="Ingresa una contraseña"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Confirmar contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Repite la contraseña"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                >
                  <i className="fas fa-user-plus me-2"></i>
                  Crear Cuenta
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={onBack}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Volver al inicio de sesión
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;