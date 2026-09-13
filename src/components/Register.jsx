function Register({ onBack }) {
  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>Crear Cuenta</h2>

        <p>Página de registro</p>

        <button
          className="btn btn-secondary"
          onClick={onBack}
        >
          Volver
        </button>
      </div>
    </div>
  );
}

export default Register;