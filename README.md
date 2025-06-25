# VaxCare 🩺💉

**VaxCare** es una aplicación web desarrollada en React que permite a los usuarios registrar, gestionar y visualizar su historial de vacunas y chequeos médicos. Además, consume datos públicos de la WHO(World Health Organization) API que muestra la Expectancia de vida a los 60 años en Chile (%) por año y Dosis de la vacunas (sarampión) entre niños de 1 año en Chile (%) por año.

## 📦 Características

### ✅ Módulo de Vacunas

- Registrar una nueva vacuna con campos como nombre, fecha de aplicación, próxima dosis, médico tratante y observaciones.
- Listado en tiempo real de vacunas registradas.
- Edición de vacunas existentes.
- Eliminación de vacunas individuales.

### ✅ Módulo de Chequeos Médicos

- Registrar un nuevo chequeo con campos como tipo, fecha, profesional, observaciones y próxima cita.
- Visualización de todos los chequeos en una lista detallada.
- Edición de registros de chequeos.
- Eliminación de registros.

### 🌐 Integración con datos de la OMS

- Consumo de la API pública `https://who.int/data/gho/info/gho-odata-api`.
- Muestra la Expectancia de vida a los 60 años en Chile (%) por año/porcentaje y Dosis de la vacunas (sarampión) entre niños de 1 año en Chile (%) por año/porcentaje.

## 🎨 Estilos personalizados

- Uso de Bootstrap 5 para estructura y componentes.
- Estilos CSS personalizados para botones:
  - `Agregar` / `Actualizar` en azul
  - `Editar` en azul claro
  - `Eliminar` en rojo
- Estilos con transiciones suaves, colores al presionar (`:active`), y enfoque (`:focus`).

## 🚀 Tecnologías utilizadas

- React JS (con Hooks)
- Bootstrap 5
- HTML + CSS (personalizado)
- API pública de OMS

## 🛠️ Instrucciones de uso

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Bentorrs/VaxCare.git
   cd vaxcare