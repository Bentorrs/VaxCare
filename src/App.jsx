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
  const [editandoVacunaIndex, setEditandoVacunaIndex] = useState(null);

  const [chequeos, setChequeos] = useState([]);
  const [nuevoChequeo, setNuevoChequeo] = useState({
    tipo: '',
    fecha: '',
    profesional: '',
    observaciones: '',
    proxima: ''
  });
  const [editandoChequeoIndex, setEditandoChequeoIndex] = useState(null);

  const [coberturaOMS, setCoberturaOMS] = useState([]);

  useEffect(() => {
    fetch('https://ghoapi.azureedge.net/api/Immunization_cov_DTP3')
      .then((response) => response.json())
      .then((data) => {
        const resultados = data.value.slice(0, 10);
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
    if (editandoVacunaIndex !== null) {
      const actualizadas = [...vacunas];
      actualizadas[editandoVacunaIndex] = nuevaVacuna;
      setVacunas(actualizadas);
      setEditandoVacunaIndex(null);
    } else {
      setVacunas([...vacunas, nuevaVacuna]);
    }
    setNuevaVacuna({
      nombre: '',
      fecha: '',
      proximaDosis: '',
      medico: '',
      observaciones: '',
    });
  };

  const handleEditarVacuna = (index) => {
    setNuevaVacuna(vacunas[index]);
    setEditandoVacunaIndex(index);
  };

  const handleEliminarVacuna = (index) => {
    const actualizadas = vacunas.filter((_, i) => i !== index);
    setVacunas(actualizadas);
  };

  // CHEQUEOS
  const handleChangeChequeo = (e) => {
    setNuevoChequeo({ ...nuevoChequeo, [e.target.name]: e.target.value });
  };

  const handleSubmitChequeo = (e) => {
    e.preventDefault();
    if (editandoChequeoIndex !== null) {
      const actualizados = [...chequeos];
      actualizados[editandoChequeoIndex] = nuevoChequeo;
      setChequeos(actualizados);
      setEditandoChequeoIndex(null);
    } else {
      setChequeos([...chequeos, nuevoChequeo]);
    }
    setNuevoChequeo({
      tipo: '',
      fecha: '',
      profesional: '',
      observaciones: '',
      proxima: ''
    });
  };

  const handleEditarChequeo = (index) => {
    setNuevoChequeo(chequeos[index]);
    setEditandoChequeoIndex(index);
  };

  const handleEliminarChequeo = (index) => {
    const actualizados = chequeos.filter((_, i) => i !== index);
    setChequeos(actualizados);
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img src="public/VaxCare2_sin_fondo2.png" alt="VaxCare Logo" width="120" />
        <h4 className="text-muted">Tus chequeos, controles y vacunas en un solo lugar</h4>
      </div>

      {/* FORM VACUNAS */}
      <h3 className="mb-3">{editandoVacunaIndex !== null ? 'Editar Vacuna' : 'Registrar Vacuna'}</h3>
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
          <button type="submit" className="btn btn-primary">{editandoVacunaIndex !== null ? 'Actualizar' : 'Agregar'} Vacuna</button>
        </div>
      </form>

      {/* LISTADO VACUNAS */}
      <h4 className="mb-3">Historial de Vacunas</h4>
      {vacunas.length === 0 ? (
        <p className="text-muted">No hay vacunas registradas aún.</p>
      ) : (
        <ul className="list-group mb-5">
          {vacunas.map((v, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{v.nombre}</strong> - Aplicada: {v.fecha}, Próxima: {v.proximaDosis || 'N/A'}, Médico: {v.medico}, Obs: {v.observaciones}
              </div>
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditarVacuna(index)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleEliminarVacuna(index)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* FORM CHEQUEOS */}
      <h3 className="mb-3">{editandoChequeoIndex !== null ? 'Editar Chequeo Médico' : 'Registrar Chequeo Médico'}</h3>
      <form onSubmit={handleSubmitChequeo} className="mb-4">
        <div className="mb-2">
          <input type="text" name="tipo" className="form-control" placeholder="Tipo de chequeo" value={nuevoChequeo.tipo} onChange={handleChangeChequeo} required />
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
        <button type="submit" className="btn btn-success">{editandoChequeoIndex !== null ? 'Actualizar' : 'Agregar'} Chequeo</button>
      </form>

      {/* LISTADO CHEQUEOS */}
      <h4 className="mb-3">Historial de Chequeos</h4>
      {chequeos.length === 0 ? (
        <p className="text-muted">No hay chequeos registrados aún.</p>
      ) : (
        <ul className="list-group mb-5">
          {chequeos.map((c, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{c.tipo}</strong> — {c.fecha}<br />
                <span className="text-muted">{c.profesional}</span><br />
                {c.observaciones && <div>{c.observaciones}</div>}
                {c.proxima && <div>🗓 Próximo: {c.proxima}</div>}
              </div>
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditarChequeo(i)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleEliminarChequeo(i)}>Eliminar</button>
              </div>
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