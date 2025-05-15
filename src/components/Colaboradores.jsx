import { useEffect, useState } from "react";
import api from "../api/api";
import rrhImage from "../assets/rrh.png";

// ESTADOS PARA EL FORMULARIO Y SU UTILIZACION.
const Colaboradores = () => {
  const [filtro, setFiltro] = useState("");
  const [colaboradores, setColaboradores] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    telefono: "",
    email: "",
    empresa: "",
  });

  const getColaboradores = async () => {
    const res = await api.get("/colaboradores");
    setColaboradores(res.data);
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
    if (!validarFormulario()) return;

    if (editandoId) {
      await api.put(`/colaboradores/${editandoId}`, form);
    } else {
      await api.post("/colaboradores", form);
    }

    limpiarFormulario();
    getColaboradores();
  };

  const limpiarFormulario = () => {
    setForm({ nombre: "", edad: "", telefono: "", email: "", empresa: "" });
    setEditandoId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [colabRes, empRes] = await Promise.all([
        api.get("/colaboradores"),
        api.get("/empresas"),
      ]);
      setColaboradores(colabRes.data);
      setEmpresas(empRes.data);
    };
    fetchData();
  }, []);

  const colaboradoresFiltrados = colaboradores.filter(
    (colab) =>
      colab.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      colab.empresa.toLowerCase().includes(filtro.toLowerCase())
  );

  //Funciones para editar y eliminar colaboradores
  const cargarParaEditar = (colab) => {
    setForm({
      nombre: colab.nombre,
      edad: colab.edad,
      telefono: colab.telefono,
      email: colab.email,
      empresa: colab.empresa,
    });
    setEditandoId(colab.id);
  };

  const eliminarColaborador = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este colaborador?"
    );
    if (confirmar) {
      await api.delete(`/colaboradores/${id}`);
      getColaboradores();
    }
  };

  // Funcion para validar
  const validarFormulario = () => {
    const { nombre, edad, telefono, email, empresa } = form;
    if (!nombre || !edad || !telefono || !email || !empresa) {
      alert("Por favor completa todos los campos antes de guardar.");
      return false;
    }
    return true;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <div className="flex justify-center mb-6">
        <img
          src={rrhImage}
          alt="RRH Logo"
          className="rounded-lg"
          style={{
            width: "100%",
            maxWidth: "600px",
            aspectRatio: "2.35 / 1",
            objectFit: "cover",
          }}
        />
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
        Registro de Colaboradores
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-xl shadow-md"
      >
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
        <input
          name="edad"
          placeholder="Edad"
          value={form.edad}
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
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
        />

        <select
          name="empresa"
          value={form.empresa}
          onChange={handleChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white col-span-1 md:col-span-2"
        >
          <option value="">Seleccionar Empresa</option>
          {empresas.map((emp) => (
            <option key={emp.id} value={emp.nombreComercial}>
              {emp.nombreComercial}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded col-span-1 md:col-span-2"
        >
          Guardar Colaborador
        </button>
      </form>

      <h3 className="text-2xl font-semibold mt-10 mb-4">
        Colaboradores Registrados
      </h3>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o empresa..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full md:w-1/2 p-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
      </div>

      <div className="bg-gray-800 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-700 text-blue-300">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Edad</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3">Email</th>
              <th className="p-3">Empresa</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {colaboradoresFiltrados.map((colab) => (
              <tr
                key={colab.id}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="p-3">{colab.nombre}</td>
                <td className="p-3">{colab.edad}</td>
                <td className="p-3">{colab.telefono}</td>
                <td className="p-3">{colab.email}</td>
                <td className="p-3">{colab.empresa}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => cargarParaEditar(colab)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => eliminarColaborador(colab.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Colaboradores;
