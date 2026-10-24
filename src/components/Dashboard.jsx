
import { useEffect, useState } from "react";

import TransactionForm from "./TransactionForm";
import History from "./History";
import Reports from "./Reports";

// Movimientos de ejemplo para la primera ejecución.
const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    type: "income",
    description: "Salario",
    amount: 2500000,
    category: "Salario",
    date: "2026-09-01",
  },
  {
    id: 2,
    type: "income",
    description: "Trabajo freelance",
    amount: 800000,
    category: "Freelance",
    date: "2026-09-05",
  },
  {
    id: 3,
    type: "expense",
    description: "Supermercado",
    amount: 350000,
    category: "Alimentación",
    date: "2026-09-03",
  },
];

const STORAGE_KEY = "misIngresosTransactions";

// Recupera los movimientos guardados en el navegador.
function loadTransactions() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData === null) {
      return INITIAL_TRANSACTIONS;
    }

    const parsedData = JSON.parse(savedData);

    if (!Array.isArray(parsedData)) {
      console.error("El historial guardado no tiene un formato válido.");
      return INITIAL_TRANSACTIONS;
    }

    return parsedData;
  } catch (error) {
    console.error("No se pudieron recuperar los movimientos:", error);
    return INITIAL_TRANSACTIONS;
  }
}

// Guarda el historial en el almacenamiento local.
function saveTransactions(transactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error("No se pudieron guardar los movimientos:", error);
  }
}

function Dashboard({ username, onLogout }) {
  const [activeSection, setActiveSection] = useState("inicio");
  const [transactions, setTransactions] = useState(loadTransactions);

  // Guarda los cambios del historial cuando se actualizan.
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // Añade un movimiento al historial.
  const addTransaction = (transaction) => {
    setTransactions((current) => [...current, transaction]);
    setActiveSection("inicio");
  };

  // Elimina un movimiento según su identificador.
  const deleteTransaction = (id) => {
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id)
    );
  };

  // Calcula el total de ingresos.
  const totalIngresos = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  // Calcula el total de gastos.
  const totalGastos = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  // Calcula el balance neto.
  const balance = totalIngresos - totalGastos;

  // Presenta los valores en pesos colombianos.
  const formatCurrency = (value) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);

  // Botón reutilizable para navegar por las secciones.
  const navigationButton = (section, label, icon, color) => (
    <div className="col" key={section}>
      <button
        type="button"
        className={`btn w-100 ${
          activeSection === section
            ? `btn-${color}`
            : `btn-outline-${color}`
        }`}
        onClick={() => setActiveSection(section)}
      >
        <i className={`fas ${icon} me-2`} />
        {label}
      </button>
    </div>
  );

  return (
    <div className="min-vh-100 bg-light">
      {/* Barra superior */}
      <nav className="navbar navbar-dark bg-primary shadow">
        <div className="container">
          <span className="navbar-brand fw-bold">
            <i className="fas fa-chart-line me-2" />
            Mis Ingresos
          </span>

          <div className="d-flex align-items-center gap-3">
            <span className="text-white">
              <i className="fas fa-user me-2" />
              {username}
            </span>

            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={onLogout}
            >
              <i className="fas fa-sign-out-alt me-1" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="container py-4">
        <div className="mb-4">
          <h2 className="fw-bold">¡Bienvenido, {username}! 👋</h2>
          <p className="text-muted mb-0">
            Administra y controla tus finanzas personales.
          </p>
        </div>

        {/* Menú de navegación */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-2">
              {navigationButton("inicio", "Inicio", "fa-home", "primary")}
              {navigationButton(
                "ingresos",
                "Registrar ingreso",
                "fa-plus-circle",
                "success"
              )}
              {navigationButton(
                "gastos",
                "Registrar gasto",
                "fa-minus-circle",
                "danger"
              )}
              {navigationButton(
                "historial",
                "Historial",
                "fa-history",
                "dark"
              )}
              {navigationButton(
                "reportes",
                "Reportes",
                "fa-chart-pie",
                "warning"
              )}
            </div>
          </div>
        </div>

        {/* Página de inicio */}
        {activeSection === "inicio" && (
          <>
            <div className="row g-4 mb-4">
              {/* Total de ingresos */}
              <div className="col-md-4">
                <div className="card h-100 border-start border-success border-5">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">Total ingresos</p>
                        <h3 className="fw-bold text-success">
                          {formatCurrency(totalIngresos)}
                        </h3>
                      </div>
                      <div className="fs-1 text-success">
                        <i className="fas fa-arrow-up" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total de gastos */}
              <div className="col-md-4">
                <div className="card h-100 border-start border-danger border-5">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">Total gastos</p>
                        <h3 className="fw-bold text-danger">
                          {formatCurrency(totalGastos)}
                        </h3>
                      </div>
                      <div className="fs-1 text-danger">
                        <i className="fas fa-arrow-down" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance neto */}
              <div className="col-md-4">
                <div className="card h-100 border-start border-primary border-5">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="text-muted mb-1">Balance neto</p>
                        <h3 className="fw-bold text-primary">
                          {formatCurrency(balance)}
                        </h3>
                      </div>
                      <div className="fs-1 text-primary">
                        <i className="fas fa-wallet" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div className="card">
              <div className="card-body">
                <h4 className="fw-bold mb-4">
                  <i className="fas fa-bolt me-2" />
                  Acciones rápidas
                </h4>

                <div className="row g-3">
                  <div className="col-md-4">
                    <button
                      type="button"
                      className="btn btn-success btn-lg w-100"
                      onClick={() => setActiveSection("ingresos")}
                    >
                      <i className="fas fa-money-bill-wave me-2" />
                      Registrar ingreso
                    </button>
                  </div>

                  <div className="col-md-4">
                    <button
                      type="button"
                      className="btn btn-danger btn-lg w-100"
                      onClick={() => setActiveSection("gastos")}
                    >
                      <i className="fas fa-shopping-cart me-2" />
                      Registrar gasto
                    </button>
                  </div>

                  <div className="col-md-4">
                    <button
                      type="button"
                      className="btn btn-dark btn-lg w-100"
                      onClick={() => setActiveSection("historial")}
                    >
                      <i className="fas fa-list me-2" />
                      Ver historial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Formulario para registrar ingresos */}
        {activeSection === "ingresos" && (
          <TransactionForm
            type="income"
            onAddTransaction={addTransaction}
            onBack={() => setActiveSection("inicio")}
          />
        )}

        {/* Formulario para registrar gastos */}
        {activeSection === "gastos" && (
          <TransactionForm
            type="expense"
            onAddTransaction={addTransaction}
            onBack={() => setActiveSection("inicio")}
          />
        )}

        {/* Historial de movimientos */}
        {activeSection === "historial" && (
          <History
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
            onBack={() => setActiveSection("inicio")}
          />
        )}

        {/* Reportes financieros */}
        {activeSection === "reportes" && (
          <Reports
            transactions={transactions}
            onBack={() => setActiveSection("inicio")}
          />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
