import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [vacunas, setVacunas] = useState([]);
  const [nuevaVacuna, setNuevaVacuna] = useState({
    nombre: '',
    fecha: '',
    proximaDosis: '',
    medico: '',
    observaciones: '',
  });

  const [coberturaOMS, setCoberturaOMS] = useState([]);

  useEffect(() => {
    fetch('https://ghoapi.azureedge.net/api/Immunization_cov_DTP3')
      .then((response) => response.json())
      .then((data) => {
        const resultados = data.value.slice(0, 10); // primeros 10 registros
        setCoberturaOMS(resultados);
      })
      .catch((error) => console.error('Error al obtener datos OMS:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaVacuna({ ...nuevaVacuna, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVacunas([...vacunas, nuevaVacuna]);
    setNuevaVacuna({
      nombre: '',
      fecha: '',
      proximaDosis: '',
      medico: '',
      observaciones: '',
    });
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img src="public/VaxCare2_sin_fondo2.png" alt="VaxCare Logo" width="120" />
      </div>
      <h4 className="text-center mb-5 text-muted">Tus chequeos, controles y vacunas en un solo lugar</h4>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              name="nombre"
              placeholder="Nombre de la vacuna"
              value={nuevaVacuna.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              name="fecha"
              value={nuevaVacuna.fecha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              name="proximaDosis"
              value={nuevaVacuna.proximaDosis}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="medico"
              placeholder="Médico tratante"
              value={nuevaVacuna.medico}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="observaciones"
              placeholder="Observaciones"
              value={nuevaVacuna.observaciones}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="text-end mt-3">
          <button type="submit" className="btn btn-primary">Agregar</button>
        </div>
      </form>

      <h3 className="mb-3">Historial de Vacunas y Controles</h3>
      {vacunas.length === 0 ? (
        <p className="text-muted">No hay registros aún.</p>
      ) : (
        <ul className="list-group mb-4">
          {vacunas.map((v, index) => (
            <li key={index} className="list-group-item">
              <strong>{v.nombre}</strong> - Aplicada: {v.fecha}, Próxima: {v.proximaDosis || 'N/A'}, Médico: {v.medico}, Obs: {v.observaciones}
            </li>
          ))}
        </ul>
      )}

      <h3 className="mb-3">Cobertura DTP3 según OMS</h3>
      {coberturaOMS.length === 0 ? (
        <p className="text-muted">Cargando datos de la OMS...</p>
      ) : (
        <ul className="list-group">
          {coberturaOMS.map((item, index) => (
            <li key={index} className="list-group-item">
              {item.SpatialDim} - {item.Value}% en {item.TimeDim}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;