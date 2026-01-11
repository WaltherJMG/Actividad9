import { useState } from "react";
import { LogIn, AlertCircle } from "lucide-react";

export const LoginView = ({
  theme,
  setIsLoggedIn,
  setUserName,
  setCurrentView
}) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateLogin = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Correo electrónico inválido";
    }

    if (!formData.password) {
      errors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      errors.password = "Mínimo 6 caracteres";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      setIsLoggedIn(true);
      setUserName(formData.email.split("@")[0]);
      setCurrentView("catalog");
      setFormData({ email: "", password: "" });
      setFormErrors({});
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <article className={`${theme.card} rounded-lg shadow-2xl p-8`}>
        <header className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <LogIn className="h-10 w-10 text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${theme.text}`}>
            Iniciar Sesión
          </h2>
          <p className={theme.textSecondary}>
            Accede a tu cuenta de BiblioTech
          </p>
        </header>

        {/* EMAIL */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${theme.text}`}>
            Correo Electrónico *
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-md ${theme.input} border ${
              formErrors.email && "border-red-500"
            }`}
          />
          {formErrors.email && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              {formErrors.email}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${theme.text}`}>
            Contraseña *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-md ${theme.input} border ${
              formErrors.password && "border-red-500"
            }`}
          />
          {formErrors.password && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              {formErrors.password}
            </p>
          )}
        </div>

        <button
          onClick={handleLogin}
          className={`w-full ${theme.button} text-white py-3 rounded-md font-semibold`}
        >
          Ingresar
        </button>
      </article>
    </main>
  );
};
