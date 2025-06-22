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

  const [chequeos, setChequeos] = useState([]);
  const [nuevoChequeo, setNuevoChequeo] = useState({
    tipo: '',
    fecha: '',
    profesional: '',
    observaciones: '',
    proxima: ''
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

  // VACUNAS
  const handleChangeVacuna = (e) => {
    const { name, value } = e.target;
    setNuevaVacuna({ ...nuevaVacuna, [name]: value });
  };

  const handleSubmitVacuna = (e) => {
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

  // CHEQUEOS
  const handleChangeChequeo = (e) => {
    setNuevoChequeo({ ...nuevoChequeo, [e.target.name]: e.target.value });
  };

  const handleSubmitChequeo = (e) => {
    e.preventDefault();
    setChequeos([...chequeos, nuevoChequeo]);
    setNuevoChequeo({
      tipo: '',
      fecha: '',
      profesional: '',
      observaciones: '',
      proxima: ''
    });
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img src="public/VaxCare2_sin_fondo2.png" alt="VaxCare Logo" width="120" />
        <h4 className="text-muted">Tus chequeos, controles y vacunas en un solo lugar</h4>
      </div>

      {/* FORM VACUNAS */}
      <h3 className="mb-3">Registrar Vacuna</h3>
      <form onSubmit={handleSubmitVacuna} className="mb-5">
        <div className="row g-3">
          <div className="col-md-4">
            <input type="text" className="form-control" name="nombre" placeholder="Nombre de la vacuna" value={nuevaVacuna.nombre} onChange={handleChangeVacuna} required />
          </div>
          <div className="col-md-2">
            <input type="date" className="form-control" name="fecha" value={nuevaVacuna.fecha} onChange={handleChangeVacuna} required />
          </div>
          <div className="col-md-2">
            <input type="date" className="form-control" name="proximaDosis" value={nuevaVacuna.proximaDosis} onChange={handleChangeVacuna} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" name="medico" placeholder="Médico tratante" value={nuevaVacuna.medico} onChange={handleChangeVacuna} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" name="observaciones" placeholder="Observaciones" value={nuevaVacuna.observaciones} onChange={handleChangeVacuna} />
          </div>
        </div>
        <div className="text-end mt-3">
          <button type="submit" className="btn btn-primary">Agregar Vacuna</button>
        </div>
      </form>

      {/* LISTADO VACUNAS */}
      <h4 className="mb-3">Historial de Vacunas</h4>
      {vacunas.length === 0 ? (
        <p className="text-muted">No hay vacunas registradas aún.</p>
      ) : (
        <ul className="list-group mb-5">
          {vacunas.map((v, index) => (
            <li key={index} className="list-group-item">
              <strong>{v.nombre}</strong> - Aplicada: {v.fecha}, Próxima: {v.proximaDosis || 'N/A'}, Médico: {v.medico}, Obs: {v.observaciones}
            </li>
          ))}
        </ul>
      )}

      {/* FORM CHEQUEOS */}
      <h3 className="mb-3">Registrar Chequeo Médico</h3>
      <form onSubmit={handleSubmitChequeo} className="mb-4">
        <div className="mb-2">
          <input type="text" name="tipo" className="form-control" placeholder="Tipo de chequeo (Ej: Control general)" value={nuevoChequeo.tipo} onChange={handleChangeChequeo} required />
        </div>
        <div className="mb-2">
          <input type="date" name="fecha" className="form-control" value={nuevoChequeo.fecha} onChange={handleChangeChequeo} required />
        </div>
        <div className="mb-2">
          <input type="text" name="profesional" className="form-control" placeholder="Profesional tratante" value={nuevoChequeo.profesional} onChange={handleChangeChequeo} />
        </div>
        <div className="mb-2">
          <textarea name="observaciones" className="form-control" placeholder="Observaciones" value={nuevoChequeo.observaciones} onChange={handleChangeChequeo} />
        </div>
        <div className="mb-2">
          <label className="form-label">Próxima fecha (opcional)</label>
          <input type="date" name="proxima" className="form-control" value={nuevoChequeo.proxima} onChange={handleChangeChequeo} />
        </div>
        <button type="submit" className="btn btn-success">Agregar Chequeo</button>
      </form>

      {/* LISTADO CHEQUEOS */}
      <h4 className="mb-3">Historial de Chequeos</h4>
      {chequeos.length === 0 ? (
        <p className="text-muted">No hay chequeos registrados aún.</p>
      ) : (
        <ul className="list-group mb-5">
          {chequeos.map((c, i) => (
            <li key={i} className="list-group-item">
              <strong>{c.tipo}</strong> — {c.fecha}<br />
              <span className="text-muted">{c.profesional}</span><br />
              {c.observaciones && <div>{c.observaciones}</div>}
              {c.proxima && <div>🗓 Próximo: {c.proxima}</div>}
            </li>
          ))}
        </ul>
      )}

      {/* API OMS */}
      <h3 className="mb-3">Cobertura DTP3 según OMS</h3>
      {coberturaOMS.length === 0 ? (
        <p className="text-muted">Cargando datos de la OMS...</p>
      ) : (
        <ul className="list-group mb-5">
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