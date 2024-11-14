import React from 'react';
import { useState, useEffect } from 'react';
import { Users, Building2, TicketCheck, LogOut } from 'lucide-react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { AuthState } from './types';

function App() {
  const [auth, setAuth] = useState<AuthState>(() => {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : { user: null, token: null };
  });
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState<'issues' | 'departments'>('issues');

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const handleLogout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('auth');
  };

  if (!auth.user || !auth.token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Issue Tracker</h1>
              <p className="text-gray-600">Manage your team's issues efficiently</p>
            </div>
            {showRegister ? (
              <Register setAuth={setAuth} switchToLogin={() => setShowRegister(false)} />
            ) : (
              <Login setAuth={setAuth} switchToRegister={() => setShowRegister(true)} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <TicketCheck className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">Issue Tracker</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('issues')}
                  className={`${
                    activeTab === 'issues'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <TicketCheck className="h-5 w-5 mr-1" />
                  Issues
                </button>
                <button
                  onClick={() => setActiveTab('departments')}
                  className={`${
                    activeTab === 'departments'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <Building2 className="h-5 w-5 mr-1" />
                  Departments
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-700">{auth.user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Dashboard activeTab={activeTab} token={auth.token} />
      </main>
    </div>
  );
}

export default App;