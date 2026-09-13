function ForgotPassword({ onBack }) {
  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>Recuperar Contraseña</h2>

        <p>Página de recuperación de contraseña</p>

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

export default ForgotPassword;