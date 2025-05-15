import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 rounded transition duration-200 ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-900/90 backdrop-blur border-b border-gray-700 p-4 flex items-center justify-between shadow-md">
      <div className="text-xl font-bold text-blue-400">
        RECURSOS HUMANOS PRUEBA
      </div>
      <div className="flex space-x-4">
        <Link to="/" className={linkClasses("/")}>
          Colaboradores
        </Link>
        <Link to="/empresas" className={linkClasses("/empresas")}>
          Empresas
        </Link>
        <Link to="/ubicaciones" className={linkClasses("/ubicaciones")}>
          Ubicaciones
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
