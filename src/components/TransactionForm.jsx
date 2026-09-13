import { useState } from "react";

function TransactionForm({ type, onAddTransaction, onBack }) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

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

  const categories =
    type === "income" ? incomeCategories : expenseCategories;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !category || !amount || !date) {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: type,
      description: description,
      amount: Number(amount),
      category: category,
      date: date,
    };

    onAddTransaction(newTransaction);

    setDescription("");
    setCategory("");
    setAmount("");
    setDate("");
  };

  const isIncome = type === "income";

  return (
    <div className="card">
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
          ></i>

          {isIncome ? "Registrar Ingreso" : "Registrar Gasto"}
        </h3>

        <form onSubmit={handleSubmit}>

          {/* Descripción */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Descripción
            </label>

            <input
              type="text"
              className="form-control"
              placeholder={
                isIncome
                  ? "Ej: Pago de salario"
                  : "Ej: Compra de supermercado"
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Categoría */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Categoría
            </label>

            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">
                Selecciona una categoría
              </option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Valor */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Valor
            </label>

            <div className="input-group">
              <span className="input-group-text">$</span>

              <input
                type="number"
                className="form-control"
                placeholder="0"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Fecha */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Fecha
            </label>

            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Botones */}
          <div className="d-flex gap-2">

            <button
              type="submit"
              className={`btn ${
                isIncome ? "btn-success" : "btn-danger"
              }`}
            >
              <i className="fas fa-save me-2"></i>
              Guardar {isIncome ? "Ingreso" : "Gasto"}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onBack}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Cancelar
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default TransactionForm;