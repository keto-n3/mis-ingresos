import { useState } from "react";

/**
 * Formulario para registrar ingresos y gastos.
 *
 * Props:
 * - type: tipo de movimiento ("income" o "expense").
 * - onAddTransaction: función que guarda el movimiento.
 * - onBack: función para regresar al panel principal.
 */
function TransactionForm({ type, onAddTransaction, onBack }) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  // Categorías disponibles para cada tipo de movimiento.
  const incomeCategories = [
    "Salario",
    "Freelance",
    "Inversiones",
    "Regalos",
    "Ventas",
    "Otros",
  ];

  const expenseCategories = [
    "Alimentación",
    "Transporte",
    "Entretenimiento",
    "Servicios",
    "Salud",
    "Educación",
    "Otros",
  ];

  const isIncome = type === "income";
  const isExpense = type === "expense";

  const categories = isIncome
    ? incomeCategories
    : expenseCategories;

  // Comprueba los datos antes de registrar el movimiento.
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!isIncome && !isExpense) {
      setError("El tipo de movimiento no es válido.");
      return;
    }

    if (
      !description.trim() ||
      !category ||
      !amount ||
      !date
    ) {
      setError("Completa todos los campos del formulario.");
      return;
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Ingresa un valor numérico mayor que cero.");
      return;
    }

    if (!categories.includes(category)) {
      setError("Selecciona una categoría válida.");
      return;
    }

    // Construye el objeto que utilizará el resto de la aplicación.
    const newTransaction = {
      id: crypto.randomUUID(),
      type,
      description: description.trim(),
      amount: numericAmount,
      category,
      date,
    };

    // Envía el movimiento al componente que administra los datos.
    onAddTransaction(newTransaction);

    // Limpia el formulario después del registro.
    setDescription("");
    setCategory("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h3
          className={`fw-bold mb-4 ${
            isIncome ? "text-success" : "text-danger"
          }`}
        >
          <i
            className={`fas ${
              isIncome ? "fa-plus-circle" : "fa-minus-circle"
            } me-2`}
            aria-hidden="true"
          />
          {isIncome ? "Registrar ingreso" : "Registrar gasto"}
        </h3>

        <form onSubmit={handleSubmit} noValidate>
          {/* Muestra los errores de validación. */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Descripción del movimiento. */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Descripción
            </label>

            <input
              id="description"
              type="text"
              className="form-control"
              placeholder={
                isIncome
                  ? "Ej.: Pago de salario"
                  : "Ej.: Compra de supermercado"
              }
              value={description}
              maxLength={100}
              autoComplete="off"
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>

          {/* Categoría del movimiento. */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-semibold">
              Categoría
            </label>

            <select
              id="category"
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Importe del ingreso o gasto. */}
          <div className="mb-3">
            <label htmlFor="amount" className="form-label fw-semibold">
              Valor (COP)
            </label>

            <div className="input-group">
              <span className="input-group-text">$</span>

              <input
                id="amount"
                type="number"
                className="form-control"
                placeholder="0"
                min="1"
                step="1"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </div>
          </div>

          {/* Fecha en la que ocurrió el movimiento. */}
          <div className="mb-4">
            <label htmlFor="date" className="form-label fw-semibold">
              Fecha
            </label>

            <input
              id="date"
              type="date"
              className="form-control"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          {/* Acciones disponibles para el usuario. */}
          <div className="d-flex flex-wrap gap-2">
            <button
              type="submit"
              className={`btn ${
                isIncome ? "btn-success" : "btn-danger"
              }`}
            >
              <i className="fas fa-save me-2" aria-hidden="true" />
              Guardar {isIncome ? "ingreso" : "gasto"}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onBack}
            >
              <i className="fas fa-arrow-left me-2" aria-hidden="true" />
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
