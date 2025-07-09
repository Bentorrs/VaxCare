# VaxCare

**VaxCare** es una aplicación web desarrollada en React que permite a los usuarios registrar, gestionar y visualizar su historial de vacunas y chequeos médicos. Además, consume indicadores de salud desde la API de la Organización Mundial de la Salud (OMS), específicamente datos sobre **expectativa de vida a los 60 años** y **cobertura de vacunación de sarampión** en niños de un año en Chile.

---

## Características

### Módulo de Vacunas

- Registrar una nueva vacuna ingresando: nombre, fecha de aplicación, próxima dosis, médico tratante y observaciones.
- Visualización de vacunas en un historial claro.
- Edición de registros existentes.
- Eliminación de registros individuales.
- Filtrado de vacunas por fecha de aplicación.
- Indicador visual para vacunas con dosis próximas o vencidas.
- Persistencia local en `localStorage`.

### Módulo de Chequeos Médicos

- Registro de chequeos médicos con: tipo de chequeo, fecha, profesional, observaciones y próxima revisión.
- Listado visual de todos los chequeos.
- Edición y eliminación de chequeos individuales.
- Filtrado de chequeos por tipo.
- Indicador visual de chequeos próximos o vencidos.
- Almacenamiento persistente en `localStorage`.

### Integración con datos de la OMS

- Consumo de datos desde la API oficial de la OMS (mediante backend proxy).
- Visualización de:
  - Expectativa de vida a los 60 años (%)
  - Cobertura de vacunación de sarampión en niños de 1 año (%)
- Paginación de resultados (5 por página).
- Paneles desplegables por indicador.

---

## Estilos personalizados

- Estilos creados con Bootstrap 5 + CSS personalizado.
- Botones con clases personalizadas:
  - `Agregar / Actualizar`: Azul (`.btn-primary`, `.btn-success`)
  - `Editar`: Azul claro (`.btn-warning`)
  - `Eliminar`: Rojo (`.btn-danger`)
- Colores y transiciones mejoradas al pasar el cursor (`:hover`) o presionar (`:active`, `:focus`).
- Colores de advertencia para vacunas/chequeos próximos y vencidos:
  - Amarillo (`.bg-warning-subtle`)
  - Rojo (`.bg-danger-subtle`)

---

## Tecnologías utilizadas

- React JS (Hooks)
- Bootstrap 5
- HTML + CSS
- API pública de la OMS (WHO GHO OData API)
- `localStorage` para persistencia de datos

---

##  Instrucciones de uso

1. Clona este repositorio:

```bash
git clone https://github.com/Bentorrs/VaxCare.git
cd VaxCare