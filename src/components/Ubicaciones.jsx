import { useEffect, useState } from "react";
import api from "../api/api";

const Ubicaciones = () => {
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [nuevoPais, setNuevoPais] = useState("");
  const [nuevoDepartamento, setNuevoDepartamento] = useState({
    nombre: "",
    paisId: "",
  });
  const [nuevoMunicipio, setNuevoMunicipio] = useState({
    nombre: "",
    departamentoId: "",
  });

  const getPaises = async () => {
    const res = await api.get("/ubicaciones/paises");
    setPaises(res.data);
  };

  const getDepartamentos = async () => {
    const res = await api.get("/ubicaciones/departamentos-todos");
    setDepartamentos(res.data);
  };

  useEffect(() => {
    getPaises();
    getDepartamentos();
  }, []);

  const agregarPais = async (e) => {
    e.preventDefault();
    if (!nuevoPais) return;
    await api.post("/ubicaciones/paises", { nombre: nuevoPais });
    setNuevoPais("");
    getPaises();
  };

  const agregarDepartamento = async (e) => {
    e.preventDefault();
    const { nombre, paisId } = nuevoDepartamento;
    if (!nombre || !paisId) return;
    await api.post("/ubicaciones/departamentos", nuevoDepartamento);
    setNuevoDepartamento({ nombre: "", paisId: "" });
    getDepartamentos();
  };

  const agregarMunicipio = async (e) => {
    e.preventDefault();
    const { nombre, departamentoId } = nuevoMunicipio;
    if (!nombre || !departamentoId) return;
    await api.post("/ubicaciones/municipios", nuevoMunicipio);
    setNuevoMunicipio({ nombre: "", departamentoId: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
        Gestión de Ubicaciones
      </h2>

      {/* País */}
      <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-3">Agregar País</h3>
        <form onSubmit={agregarPais} className="flex gap-4">
          <input
            className="p-2 bg-gray-700 border border-gray-600 rounded text-white w-full"
            placeholder="Nombre del país"
            value={nuevoPais}
            onChange={(e) => setNuevoPais(e.target.value)}
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
            Agregar
          </button>
        </form>
      </div>

      {/* Departamento */}
      <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-3">Agregar Departamento</h3>
        <form
          onSubmit={agregarDepartamento}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="nombre"
            placeholder="Nombre del departamento"
            value={nuevoDepartamento.nombre}
            onChange={(e) =>
              setNuevoDepartamento({
                ...nuevoDepartamento,
                nombre: e.target.value,
              })
            }
            className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
          <select
            name="paisId"
            value={nuevoDepartamento.paisId}
            onChange={(e) =>
              setNuevoDepartamento({
                ...nuevoDepartamento,
                paisId: e.target.value,
              })
            }
            className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">Seleccionar país</option>
            {paises.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded col-span-1 md:col-span-2"
          >
            Agregar
          </button>
        </form>
      </div>

      {/* Municipio */}
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Agregar Municipio</h3>
        <form
          onSubmit={agregarMunicipio}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="nombre"
            placeholder="Nombre del municipio"
            value={nuevoMunicipio.nombre}
            onChange={(e) =>
              setNuevoMunicipio({ ...nuevoMunicipio, nombre: e.target.value })
            }
            className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
          <select
            name="departamentoId"
            value={nuevoMunicipio.departamentoId}
            onChange={(e) =>
              setNuevoMunicipio({
                ...nuevoMunicipio,
                departamentoId: e.target.value,
              })
            }
            className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">Seleccionar departamento</option>
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded col-span-1 md:col-span-2"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ubicaciones;
