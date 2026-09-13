import { useState } from "react";

import TransactionForm from "./TransactionForm";
import History from "./History";
import Reports from "./Reports";

function Dashboard({ username, onLogout }) {
  const [activeSection, setActiveSection] = useState("inicio");

  // ==========================================
  // TRANSACCIONES
  // ==========================================

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(
      "misIngresosTransactions"
    );

    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }

    return [
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
  });

  // ==========================================
  // AGREGAR TRANSACCIÓN
  // ==========================================

  const addTransaction = (transaction) => {
    setTransactions((current) => {
      const updatedTransactions = [
        ...current,
        transaction,
      ];

      localStorage.setItem(
        "misIngresosTransactions",
        JSON.stringify(updatedTransactions)
      );

      return updatedTransactions;
    });

    setActiveSection("inicio");
  };

  // ==========================================
  // ELIMINAR TRANSACCIÓN
  // ==========================================

  const deleteTransaction = (id) => {
    setTransactions((current) => {
      const updatedTransactions = current.filter(
        (transaction) => transaction.id !== id
      );

      localStorage.setItem(
        "misIngresosTransactions",
        JSON.stringify(updatedTransactions)
      );

      return updatedTransactions;
    });
  };

  // ==========================================
  // TOTAL INGRESOS
  // ==========================================

  const totalIngresos = transactions
    .filter(
      (transaction) =>
        transaction.type === "income"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  // ==========================================
  // TOTAL GASTOS
  // ==========================================

  const totalGastos = transactions
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  // ==========================================
  // BALANCE
  // ==========================================

  const balance = totalIngresos - totalGastos;

  // ==========================================
  // FORMATO DE MONEDA
  // ==========================================

  const formatCurrency = (value) => {
    return `$${value.toLocaleString("es-CO")}`;
  };

  // ==========================================
  // INTERFAZ
  // ==========================================

  return (
    <div className="min-vh-100 bg-light">

      {/* ======================================
          BARRA SUPERIOR
      ====================================== */}

      <nav className="navbar navbar-dark bg-primary shadow">

        <div className="container">

          <span className="navbar-brand fw-bold">

            <i className="fas fa-chart-line me-2"></i>

            Mis Ingresos

          </span>

          <div className="d-flex align-items-center gap-3">

            <span className="text-white">

              <i className="fas fa-user me-2"></i>

              {username}

            </span>

            <button
              className="btn btn-outline-light btn-sm"
              onClick={onLogout}
            >

              <i className="fas fa-sign-out-alt me-1"></i>

              Cerrar Sesión

            </button>

          </div>

        </div>

      </nav>

      {/* ======================================
          CONTENIDO PRINCIPAL
      ====================================== */}

      <main className="container py-4">

        {/* BIENVENIDA */}

        <div className="mb-4">

          <h2 className="fw-bold">

            ¡Bienvenido, {username}! 👋

          </h2>

          <p className="text-muted mb-0">

            Administra y controla tus finanzas personales.

          </p>

        </div>

        {/* ======================================
            MENÚ PRINCIPAL
        ====================================== */}

        <div className="card mb-4">

          <div className="card-body">

            <div className="row g-2">

              {/* INICIO */}

              <div className="col">

                <button
                  className={`btn w-100 ${
                    activeSection === "inicio"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() =>
                    setActiveSection("inicio")
                  }
                >

                  <i className="fas fa-home me-2"></i>

                  Inicio

                </button>

              </div>

              {/* INGRESOS */}

              <div className="col">

                <button
                  className={`btn w-100 ${
                    activeSection === "ingresos"
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() =>
                    setActiveSection("ingresos")
                  }
                >

                  <i className="fas fa-plus-circle me-2"></i>

                  Registrar Ingreso

                </button>

              </div>

              {/* GASTOS */}

              <div className="col">

                <button
                  className={`btn w-100 ${
                    activeSection === "gastos"
                      ? "btn-danger"
                      : "btn-outline-danger"
                  }`}
                  onClick={() =>
                    setActiveSection("gastos")
                  }
                >

                  <i className="fas fa-minus-circle me-2"></i>

                  Registrar Gasto

                </button>

              </div>

              {/* HISTORIAL */}

              <div className="col">

                <button
                  className={`btn w-100 ${
                    activeSection === "historial"
                      ? "btn-dark"
                      : "btn-outline-dark"
                  }`}
                  onClick={() =>
                    setActiveSection("historial")
                  }
                >

                  <i className="fas fa-history me-2"></i>

                  Historial

                </button>

              </div>

              {/* REPORTES */}

              <div className="col">

                <button
                  className={`btn w-100 ${
                    activeSection === "reportes"
                      ? "btn-warning"
                      : "btn-outline-warning"
                  }`}
                  onClick={() =>
                    setActiveSection("reportes")
                  }
                >

                  <i className="fas fa-chart-pie me-2"></i>

                  Reportes

                </button>

              </div>

            </div>

          </div>

        </div>

        {/* ======================================
            INICIO
        ====================================== */}

        {activeSection === "inicio" && (
          <>

            {/* TARJETAS */}

            <div className="row g-4 mb-4">

              {/* INGRESOS */}

              <div className="col-md-4">

                <div className="card h-100 border-start border-success border-5">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>

                        <p className="text-muted mb-1">
                          Total Ingresos
                        </p>

                        <h3 className="fw-bold text-success">

                          {formatCurrency(
                            totalIngresos
                          )}

                        </h3>

                      </div>

                      <div className="fs-1 text-success">

                        <i className="fas fa-arrow-up"></i>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* GASTOS */}

              <div className="col-md-4">

                <div className="card h-100 border-start border-danger border-5">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>

                        <p className="text-muted mb-1">
                          Total Gastos
                        </p>

                        <h3 className="fw-bold text-danger">

                          {formatCurrency(
                            totalGastos
                          )}

                        </h3>

                      </div>

                      <div className="fs-1 text-danger">

                        <i className="fas fa-arrow-down"></i>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* BALANCE */}

              <div className="col-md-4">

                <div className="card h-100 border-start border-primary border-5">

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <div>

                        <p className="text-muted mb-1">
                          Balance Neto
                        </p>

                        <h3 className="fw-bold text-primary">

                          {formatCurrency(
                            balance
                          )}

                        </h3>

                      </div>

                      <div className="fs-1 text-primary">

                        <i className="fas fa-wallet"></i>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* ACCIONES RÁPIDAS */}

            <div className="card">

              <div className="card-body">

                <h4 className="fw-bold mb-4">

                  <i className="fas fa-bolt me-2"></i>

                  Acciones rápidas

                </h4>

                <div className="row g-3">

                  <div className="col-md-4">

                    <button
                      className="btn btn-success btn-lg w-100"
                      onClick={() =>
                        setActiveSection("ingresos")
                      }
                    >

                      <i className="fas fa-money-bill-wave me-2"></i>

                      Registrar Ingreso

                    </button>

                  </div>

                  <div className="col-md-4">

                    <button
                      className="btn btn-danger btn-lg w-100"
                      onClick={() =>
                        setActiveSection("gastos")
                      }
                    >

                      <i className="fas fa-shopping-cart me-2"></i>

                      Registrar Gasto

                    </button>

                  </div>

                  <div className="col-md-4">

                    <button
                      className="btn btn-dark btn-lg w-100"
                      onClick={() =>
                        setActiveSection("historial")
                      }
                    >

                      <i className="fas fa-list me-2"></i>

                      Ver Historial

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </>
        )}

        {/* ======================================
            REGISTRAR INGRESO
        ====================================== */}

        {activeSection === "ingresos" && (

          <TransactionForm
            type="income"
            onAddTransaction={addTransaction}
            onBack={() =>
              setActiveSection("inicio")
            }
          />

        )}

        {/* ======================================
            REGISTRAR GASTO
        ====================================== */}

        {activeSection === "gastos" && (

          <TransactionForm
            type="expense"
            onAddTransaction={addTransaction}
            onBack={() =>
              setActiveSection("inicio")
            }
          />

        )}

        {/* ======================================
            HISTORIAL
        ====================================== */}

        {activeSection === "historial" && (

          <History
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
            onBack={() =>
              setActiveSection("inicio")
            }
          />

        )}

        {/* ======================================
            REPORTES
        ====================================== */}

        {activeSection === "reportes" && (

          <Reports
            transactions={transactions}
            onBack={() =>
              setActiveSection("inicio")
            }
          />

        )}

      </main>

    </div>
  );
}

export default Dashboard;