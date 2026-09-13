import { useState } from "react";

function History({ transactions, onDeleteTransaction, onBack }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = transactions
    .filter((transaction) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(searchText) ||
        transaction.category
          .toLowerCase()
          .includes(searchText);

      const matchesType =
        filterType === "all" ||
        transaction.type === filterType;

      return matchesSearch && matchesType;
    })
    .slice()
    .reverse();

  const formatCurrency = (value) => {
    return `$${value.toLocaleString("es-CO")}`;
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este movimiento?"
    );

    if (confirmDelete) {
      onDeleteTransaction(id);
    }
  };

  return (
    <div className="card">

      <div className="card-body p-4">

        {/* Título */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h3 className="fw-bold mb-1">
              <i className="fas fa-history me-2"></i>
              Historial de movimientos
            </h3>

            <p className="text-muted mb-0">
              Consulta y administra tus ingresos y gastos.
            </p>

          </div>

          <span className="badge bg-primary fs-6">
            {filteredTransactions.length} movimientos
          </span>

        </div>


        {/* Búsqueda y filtros */}

        <div className="row g-3 mb-4">

          {/* Buscar */}

          <div className="col-md-6">

            <label className="form-label fw-semibold">
              Buscar
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Buscar por descripción o categoría..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>


          {/* Filtro */}

          <div className="col-md-6">

            <label className="form-label fw-semibold">
              Filtrar por tipo
            </label>

            <select
              className="form-select"
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value)
              }
            >

              <option value="all">
                Todos los movimientos
              </option>

              <option value="income">
                Solo ingresos
              </option>

              <option value="expense">
                Solo gastos
              </option>

            </select>

          </div>

        </div>


        {/* Tabla */}

        {filteredTransactions.length === 0 ? (

          <div className="text-center py-5">

            <i className="fas fa-search fs-1 text-muted"></i>

            <h5 className="mt-3">
              No se encontraron movimientos
            </h5>

            <p className="text-muted">
              Intenta cambiar el texto de búsqueda
              o el filtro.
            </p>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>Fecha</th>

                  <th>Descripción</th>

                  <th>Categoría</th>

                  <th>Tipo</th>

                  <th className="text-end">
                    Valor
                  </th>

                  <th className="text-center">
                    Acción
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredTransactions.map(
                  (transaction) => (

                    <tr key={transaction.id}>

                      {/* Fecha */}

                      <td>
                        {formatDate(
                          transaction.date
                        )}
                      </td>


                      {/* Descripción */}

                      <td className="fw-semibold">
                        {transaction.description}
                      </td>


                      {/* Categoría */}

                      <td>
                        {transaction.category}
                      </td>


                      {/* Tipo */}

                      <td>

                        {transaction.type ===
                        "income" ? (

                          <span className="badge bg-success">
                            <i className="fas fa-arrow-up me-1"></i>
                            Ingreso
                          </span>

                        ) : (

                          <span className="badge bg-danger">
                            <i className="fas fa-arrow-down me-1"></i>
                            Gasto
                          </span>

                        )}

                      </td>


                      {/* Valor */}

                      <td
                        className={`text-end fw-bold ${
                          transaction.type ===
                          "income"
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >

                        {transaction.type ===
                        "income"
                          ? "+"
                          : "-"}

                        {formatCurrency(
                          transaction.amount
                        )}

                      </td>


                      {/* Eliminar */}

                      <td className="text-center">

                        <button
                          className="btn btn-outline-danger btn-sm"
                          title="Eliminar movimiento"
                          onClick={() =>
                            handleDelete(
                              transaction.id
                            )
                          }
                        >

                          <i className="fas fa-trash"></i>

                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}


        {/* Volver */}

        <button
          className="btn btn-outline-primary mt-3"
          onClick={onBack}
        >

          <i className="fas fa-arrow-left me-2"></i>

          Volver al inicio

        </button>

      </div>

    </div>
  );
}

export default History;