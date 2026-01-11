import React, { useState } from 'react';
import { Book, User, Search, Moon, Sun, Menu, X, LogIn, Home, BookOpen, AlertCircle } from 'lucide-react';
import { LoginView } from './view/LoginView';
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Datos de ejemplo  para el catálogo
  const books = [
    { id: 1, title: 'Introducción a la Programación', author: 'Juan Pérez', available: true, category: 'Informática' },
    { id: 2, title: 'Cálculo Diferencial', author: 'María González', available: true, category: 'Matemáticas' },
    { id: 3, title: 'Física Cuántica Básica', author: 'Carlos Ruiz', available: false, category: 'Física' },
    { id: 4, title: 'Historia del Arte', author: 'Ana Martínez', available: true, category: 'Arte' },
    { id: 5, title: 'Química Orgánica', author: 'Luis Torres', available: true, category: 'Química' },
    { id: 6, title: 'Literatura Latinoamericana', author: 'Sofia Vargas', available: false, category: 'Literatura' }
  ];

  // Validación de formularios
  

  

  // Estilos base con modo claro/oscuro
  const theme = {
    bg: darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
    card: darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100',
    text: darkMode ? 'text-gray-100' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    input: darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300',
    button: darkMode ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
    buttonSecondary: darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200',
    navBg: darkMode ? 'bg-gray-800/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm',
    accent: darkMode ? 'text-blue-400' : 'text-blue-600',
    accentHover: darkMode ? 'hover:text-blue-300' : 'hover:text-purple-600'
  };


  

  // Componente de navegación accesible
  const Navigation = () => (
    <nav 
      className={`${theme.navBg} ${theme.border} border-b sticky top-0 z-50 shadow-lg`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Book className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-purple-600'}`} aria-hidden="true" />
            <h1 className={`ml-2 text-xl font-bold ${theme.text}`}>
              BiblioTech
            </h1>
          </div>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3 py-2 rounded-md ${theme.text} ${theme.accentHover} transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label="Ir a inicio"
              aria-current={currentView === 'home' ? 'page' : undefined}
            >
              <Home className="inline h-5 w-5 mr-1" aria-hidden="true" />
              Inicio
            </button>
            {isLoggedIn && (
              <button
                onClick={() => setCurrentView('catalog')}
                className={`px-3 py-2 rounded-md ${theme.text} ${theme.accentHover} transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label="Ir al catálogo"
                aria-current={currentView === 'catalog' ? 'page' : undefined}
              >
                <BookOpen className="inline h-5 w-5 mr-1" aria-hidden="true" />
                Catálogo
              </button>
            )}
            {!isLoggedIn ? (
              <button
                onClick={() => setCurrentView('login')}
                className={`px-3 py-2 rounded-md ${theme.text} ${theme.accentHover} transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label="Iniciar sesión"
                aria-current={currentView === 'login' ? 'page' : undefined}
              >
                <LogIn className="inline h-5 w-5 mr-1" aria-hidden="true" />
                Ingresar
              </button>
            ) : (
              <span className={`px-3 py-2 ${theme.textSecondary} flex items-center`}>
                <User className="inline h-5 w-5 mr-1" aria-hidden="true" />
                <span className={`font-medium ${theme.accent}`}>{userName}</span>
              </span>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-md ${theme.buttonSecondary} transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {darkMode ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>

          {/* Menú móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-md ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menú móvil expandido */}
      {menuOpen && (
        <div className={`md:hidden ${theme.card} ${theme.border} border-t`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => { setCurrentView('home'); setMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md ${theme.text} hover:${theme.buttonSecondary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              Inicio
            </button>
            {isLoggedIn && (
              <button
                onClick={() => { setCurrentView('catalog'); setMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md ${theme.text} hover:${theme.buttonSecondary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                Catálogo
              </button>
            )}
            {!isLoggedIn && (
              <button
                onClick={() => { setCurrentView('login'); setMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md ${theme.text} hover:${theme.buttonSecondary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                Ingresar
              </button>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`block w-full text-left px-3 py-2 rounded-md ${theme.text} hover:${theme.buttonSecondary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  // Vista de Inicio
  const HomeView = () => (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article>
        <header className="text-center mb-12">
          <h2 className={`text-4xl font-bold ${theme.text} mb-4`}>
            Bienvenido a BiblioTech
          </h2>
          <p className={`text-xl ${theme.textSecondary}`}>
            Tu biblioteca universitaria digital accesible para todos
          </p>
        </header>

        <section className={`${theme.card} rounded-lg shadow-xl p-8 mb-8 hover:shadow-2xl transition-shadow`} aria-labelledby="about-heading">
          <h3 id="about-heading" className={`text-2xl font-semibold ${theme.text} mb-4 flex items-center`}>
            <span className={`w-1 h-8 ${darkMode ? 'bg-blue-500' : 'bg-purple-600'} rounded mr-3`}></span>
            Sobre Nosotros
          </h3>
          <p className={`${theme.textSecondary} mb-4 leading-relaxed`}>
            BiblioTech es un sistema moderno de gestión bibliotecaria diseñado específicamente 
            para instituciones educativas. Nuestro objetivo es facilitar el acceso al conocimiento 
            mediante una plataforma intuitiva y completamente accesible.
          </p>
        </section>

        <section aria-labelledby="features-heading">
          <h3 id="features-heading" className={`text-2xl font-semibold ${theme.text} mb-6`}>
            Características Principales
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <article className={`${theme.card} rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-1 border-l-4 ${darkMode ? 'border-blue-500' : 'border-blue-600'}`}>
              <div className={`w-16 h-16 rounded-full ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'} flex items-center justify-center mb-4`}>
                <Book className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" />
              </div>
              <h4 className={`text-xl font-semibold ${theme.text} mb-2`}>
                Catálogo Extenso
              </h4>
              <p className={theme.textSecondary}>
                Accede a miles de libros académicos y recursos digitales organizados por categoría
              </p>
            </article>

            <article className={`${theme.card} rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-1 border-l-4 ${darkMode ? 'border-green-500' : 'border-green-600'}`}>
              <div className={`w-16 h-16 rounded-full ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center mb-4`}>
                <Search className={`h-8 w-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} aria-hidden="true" />
              </div>
              <h4 className={`text-xl font-semibold ${theme.text} mb-2`}>
                Búsqueda Inteligente
              </h4>
              <p className={theme.textSecondary}>
                Encuentra rápidamente el material que necesitas con nuestro sistema de búsqueda avanzada
              </p>
            </article>

            <article className={`${theme.card} rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-1 border-l-4 ${darkMode ? 'border-purple-500' : 'border-purple-600'}`}>
              <div className={`w-16 h-16 rounded-full ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'} flex items-center justify-center mb-4`}>
                <User className={`h-8 w-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} aria-hidden="true" />
              </div>
              <h4 className={`text-xl font-semibold ${theme.text} mb-2`}>
                Gestión Personal
              </h4>
              <p className={theme.textSecondary}>
                Administra tus préstamos, reservas y favoritos desde tu panel personalizado
              </p>
            </article>
          </div>
        </section>

        <section className="mt-12 text-center">
          {!isLoggedIn && (
            <button
              onClick={() => setCurrentView('login')}
              className={`${theme.button} text-white px-8 py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
              aria-label="Comenzar a usar BiblioTech"
            >
              Comenzar Ahora
            </button>
          )}
        </section>
      </article>
    </main>
  );

  // Vista de Login
  

  // Vista de Catálogo
  const CatalogView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h2 className={`text-3xl font-bold ${theme.text} mb-4 flex items-center`}>
            <BookOpen className={`h-8 w-8 mr-3 ${theme.accent}`} aria-hidden="true" />
            Catálogo de Libros
          </h2>
          <div className="relative">
            <label htmlFor="search" className="sr-only">
              Buscar libros por título, autor o categoría
            </label>
            <Search 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${theme.textSecondary}`} 
              aria-hidden="true"
            />
            <input
              type="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg ${theme.input} border focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md`}
              placeholder="Buscar por título, autor o categoría..."
              aria-label="Buscar libros"
            />
          </div>
        </header>

        <section aria-label="Resultados de búsqueda">
          {filteredBooks.length > 0 ? (
            <>
              <p className={`${theme.textSecondary} mb-4`} role="status" aria-live="polite">
                Mostrando {filteredBooks.length} {filteredBooks.length === 1 ? 'libro' : 'libros'}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <article 
                    key={book.id} 
                    className={`${theme.card} rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-1`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'} flex items-center justify-center`}>
                        <BookOpen className={`h-7 w-7 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" />
                      </div>
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          book.available 
                            ? darkMode ? 'bg-green-500/20 text-green-300 border border-green-500/50' : 'bg-green-100 text-green-800 border border-green-200'
                            : darkMode ? 'bg-red-500/20 text-red-300 border border-red-500/50' : 'bg-red-100 text-red-800 border border-red-200'
                        }`}
                        aria-label={book.available ? 'Disponible' : 'No disponible'}
                      >
                        {book.available ? '✓ Disponible' : '✗ Prestado'}
                      </span>
                    </div>
                    
                    <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>
                      {book.title}
                    </h3>
                    
                    <p className={`${theme.textSecondary} mb-1 text-sm`}>
                      <span className="font-medium">Autor:</span> {book.author}
                    </p>
                    
                    <p className={`${theme.textSecondary} mb-4 text-sm flex items-center`}>
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        book.category === 'Informática' ? 'bg-blue-500' :
                        book.category === 'Matemáticas' ? 'bg-purple-500' :
                        book.category === 'Física' ? 'bg-green-500' :
                        book.category === 'Arte' ? 'bg-pink-500' :
                        book.category === 'Química' ? 'bg-yellow-500' :
                        'bg-orange-500'
                      }`}></span>
                      {book.category}
                    </p>
                    
                    <button
                      disabled={!book.available}
                      className={`w-full py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        book.available
                          ? `${theme.button} text-white shadow-md hover:shadow-lg`
                          : darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      aria-label={`${book.available ? 'Reservar' : 'No disponible'} ${book.title}`}
                      onClick={() => alert('Libro reservado correctamente')}
                    >
                      {book.available ? '📚 Reservar Libro' : '🔒 No Disponible'}
                    </button>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className={`${theme.card} rounded-lg shadow p-8 text-center`}>
              <AlertCircle className={`h-16 w-16 ${theme.textSecondary} mx-auto mb-4`} aria-hidden="true" />
              <p className={`text-lg ${theme.text}`}>
                No se encontraron libros que coincidan con tu búsqueda
              </p>
              <p className={`${theme.textSecondary} mt-2`}>
                Intenta con otros términos de búsqueda
              </p>
            </div>
          )}
        </section>
      </main>
    );
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text}`}>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
      >
        Saltar al contenido principal
      </a>
      
      <Navigation />
      
      <div id="main-content">
        {currentView === 'home' && <HomeView />}
        {currentView === 'login' && <LoginView
    theme={theme}
    darkMode={darkMode}
    setIsLoggedIn={setIsLoggedIn}
    setUserName={setUserName}
    setCurrentView={setCurrentView}
  />}
        {currentView === 'catalog' && <CatalogView />}
      </div>

      <footer className={`${theme.card} ${theme.border} border-t mt-12`} role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className={theme.textSecondary}>
              © 2025 BiblioTech - Sistema de Gestión Bibliotecaria Accesible
            </p>
            <p className={`${theme.textSecondary} mt-2 text-sm`}>
              Desarrollado cumpliendo las pautas WCAG 2.2 nivel AA DEJA DORMIR JAIR 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}