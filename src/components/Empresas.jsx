import { useEffect, useState } from "react";
import api from "../api/api";

const Empresas = () => {
  const [form, setForm] = useState({
    nombreComercial: "",
    razonSocial: "",
    NIT: "",
    telefono: "",
    correo: "",
    paisId: "",
    departamentoId: "",
    municipioId: "",
  });

  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [empresas, setEmpresas] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);

  useEffect(() => {
    getPaises();
    getEmpresas();
  }, []);

  useEffect(() => {
    if (form.paisId) {
      api
        .get(`/ubicaciones/departamentos?paisId=${form.paisId}`)
        .then((res) => setDepartamentos(res.data));
    } else {
      setDepartamentos([]);
      setMunicipios([]);
    }
  }, [form.paisId]);

  useEffect(() => {
    if (form.departamentoId) {
      api
        .get(`/ubicaciones/municipios?departamentoId=${form.departamentoId}`)
        .then((res) => setMunicipios(res.data));
    } else {
      setMunicipios([]);
    }
  }, [form.departamentoId]);

  useEffect(() => {
    const cargarUbicaciones = async () => {
      const resPaises = await api.get("/ubicaciones/paises");
      const resDepartamentos = await api.get(
        "/ubicaciones/departamentos-todos"
      );
      const resMunicipios = await api.get("/ubicaciones/municipios-todos");
      setPaises(resPaises.data);
      setDepartamentos(resDepartamentos.data);
      setMunicipios(resMunicipios.data);
    };
    cargarUbicaciones();
  }, []);

  const getPaises = async () => {
    const res = await api.get("/ubicaciones/paises");
    setPaises(res.data);
  };

  const getEmpresas = async () => {
    const res = await api.get("/empresas");
    setEmpresas(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/empresas", form);
    setForm({
      nombreComercial: "",
      razonSocial: "",
      NIT: "",
      telefono: "",
      correo: "",
      paisId: "",
      departamentoId: "",
      municipioId: "",
    });
    setDepartamentos([]);
    setMunicipios([]);
    getEmpresas();
  };

  // Obtener nombre de país por id
  const nombrePais = (id) => paises.find((p) => p.id === id)?.nombre || "";
  const nombreDepartamento = (id) =>
    departamentos.find((d) => d.id === id)?.nombre || "";
  const nombreMunicipio = (id) =>
    municipios.find((m) => m.id === id)?.nombre || "";

  const abrirModal = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setEmpresaSeleccionada(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
        Registro de Empresas
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-xl shadow-md"
      >
        <input
          name="nombreComercial"
          placeholder="Nombre Comercial"
          value={form.nombreComercial}
          onChange={handleChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
        <input
          name="razonSocial"
          placeholder="Razón Social"
          value={form.razonSocial}
          onChange={handleChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
        <input
          name="NIT"
          placeholder="NIT"
          value={form.NIT}
          onChange={handleChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
        <input
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
        />

        <select
          name="paisId"
          value={form.paisId}
          onChange={handleChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
        >
          <option value="">Seleccionar País</option>
          {paises.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <select
          name="departamentoId"
          value={form.departamentoId}
          onChange={handleChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          disabled={!form.paisId}
        >
          <option value="">Seleccionar Departamento</option>
          {departamentos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nombre}
            </option>
          ))}
        </select>

        <select
          name="municipioId"
          value={form.municipioId}
          onChange={handleChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          disabled={!form.departamentoId}
        >
          <option value="">Seleccionar Municipio</option>
          {municipios.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded col-span-1 md:col-span-2"
        >
          Guardar Empresa
        </button>
      </form>

      <h3 className="text-2xl font-semibold mt-10 mb-4">
        Empresas Registradas
      </h3>
      <div className="bg-gray-800 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-700 text-green-300">
            <tr>
              <th className="p-3">Nombre Comercial</th>
              <th className="p-3">Razón Social</th>
              <th className="p-3">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((emp) => (
              <tr
                key={emp.id}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="p-3">{emp.nombreComercial}</td>
                <td className="p-3">{emp.razonSocial}</td>
                <td className="p-3">
                  <button
                    onClick={() => abrirModal(emp)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    title="Ver detalles"
                  >
                    🔍
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalVisible && empresaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full text-white relative">
            <h2 className="text-2xl font-bold mb-4">
              {empresaSeleccionada.nombreComercial}
            </h2>
            <p>
              <strong>Razón Social:</strong> {empresaSeleccionada.razonSocial}
            </p>
            <p>
              <strong>NIT:</strong> {empresaSeleccionada.NIT}
            </p>
            <p>
              <strong>Teléfono:</strong> {empresaSeleccionada.telefono}
            </p>
            <p>
              <strong>Correo:</strong> {empresaSeleccionada.correo}
            </p>
            <p>
              <strong>País:</strong> {nombrePais(empresaSeleccionada.paisId)}
            </p>
            <p>
              <strong>Departamento:</strong>{" "}
              {nombreDepartamento(empresaSeleccionada.departamentoId)}
            </p>
            <p>
              <strong>Municipio:</strong>{" "}
              {nombreMunicipio(empresaSeleccionada.municipioId)}
            </p>
            <button
              onClick={cerrarModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl font-bold"
              aria-label="Cerrar modal"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empresas;
