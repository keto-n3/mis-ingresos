import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

function Reports({ transactions, onBack }) {
  // ==========================================
  // CÁLCULO DE TOTALES
  // ==========================================

  const totalIngresos = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount || 0), 0);

  const totalGastos = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount || 0), 0);

  const balance = totalIngresos - totalGastos;

  // ==========================================
  // FORMATO DE MONEDA
  // ==========================================

  const formatCurrency = (value) => {
    return `$${value.toLocaleString("es-CO")}`;
  };

  // ==========================================
  // GASTOS POR CATEGORÍA
  // ==========================================

  const expenseCategories = {};

  transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      if (!expenseCategories[transaction.category]) {
        expenseCategories[transaction.category] = 0;
      }

      expenseCategories[transaction.category] += transaction.amount;
    });

  const categoryLabels = Object.keys(expenseCategories);

  const categoryValues = Object.values(expenseCategories);

  // ==========================================
  // DATOS DEL GRÁFICO DE GASTOS
  // ==========================================

  const doughnutData = {
    labels: categoryLabels,

    datasets: [
      {
        label: "Gastos",
        data: categoryValues,
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,

    plugins: {
      legend: {
        position: "bottom",
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;

            return ` ${formatCurrency(value)}`;
          },
        },
      },
    },
  };

  // ==========================================
  // DATOS INGRESOS VS GASTOS
  // ==========================================

  const barData = {
    labels: ["Ingresos", "Gastos"],

    datasets: [
      {
        label: "Valor",
        data: [totalIngresos, totalGastos],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return ` ${formatCurrency(context.raw)}`;
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          callback: function (value) {
            return `$${Number(value).toLocaleString("es-CO")}`;
          },
        },
      },
    },
  };

  // ==========================================
  // INTERFAZ
  // ==========================================

  return (
    <div className="card">
      <div className="card-body p-4">
        {/* ENCABEZADO */}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1">
              <i className="fas fa-chart-pie me-2"></i>
              Reportes financieros
            </h3>

            <p className="text-muted mb-0">
              Analiza tus ingresos, gastos y balance.
            </p>
          </div>

          <span className="badge bg-primary fs-6">
            {transactions.length} movimientos
          </span>
        </div>

        {/* TARJETAS DE RESUMEN */}

        <div className="row g-4 mb-4">
          {/* INGRESOS */}

          <div className="col-md-4">
            <div className="card border-start border-success border-5 h-100">
              <div className="card-body">
                <p className="text-muted mb-1">Total Ingresos</p>

                <h3 className="fw-bold text-success">
                  {formatCurrency(totalIngresos)}
                </h3>

                <i className="fas fa-arrow-up text-success fs-3"></i>
              </div>
            </div>
          </div>

          {/* GASTOS */}

          <div className="col-md-4">
            <div className="card border-start border-danger border-5 h-100">
              <div className="card-body">
                <p className="text-muted mb-1">Total Gastos</p>

                <h3 className="fw-bold text-danger">
                  {formatCurrency(totalGastos)}
                </h3>

                <i className="fas fa-arrow-down text-danger fs-3"></i>
              </div>
            </div>
          </div>

          {/* BALANCE */}

          <div className="col-md-4">
            <div className="card border-start border-primary border-5 h-100">
              <div className="card-body">
                <p className="text-muted mb-1">Balance Neto</p>

                <h3 className="fw-bold text-primary">
                  {formatCurrency(balance)}
                </h3>

                <i className="fas fa-wallet text-primary fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        {/* GRÁFICOS */}

        <div className="row g-4">
          {/* INGRESOS VS GASTOS */}

          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-4">
                  <i className="fas fa-chart-bar me-2"></i>
                  Ingresos vs. Gastos
                </h5>

                {transactions.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <i className="fas fa-chart-bar fs-1 mb-3"></i>

                    <p className="mb-0">
                      No hay datos suficientes para mostrar el gráfico.
                    </p>
                  </div>
                ) : (
                  <Bar data={barData} options={barOptions} />
                )}
              </div>
            </div>
          </div>

          {/* GASTOS POR CATEGORÍA */}

          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-4">
                  <i className="fas fa-chart-pie me-2"></i>
                  Gastos por categoría
                </h5>

                {categoryLabels.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <i className="fas fa-chart-pie fs-1 mb-3"></i>

                    <p className="mb-0">Todavía no hay gastos registrados.</p>
                  </div>
                ) : (
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTÓN VOLVER */}

        <button
          type="button"
          className="btn btn-outline-primary mt-4"
          onClick={onBack}
        >
          <i className="fas fa-arrow-left me-2" aria-hidden="true"></i>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default Reports;
