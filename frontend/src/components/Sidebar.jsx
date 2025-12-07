import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, Sparkles, LogOut, Menu, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/habits', icon: Target, label: 'Habits' },
    { to: '/insights', icon: Sparkles, label: 'AI Insights' }
  ];

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && <div onClick={() => setIsOpen(false)} className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-400">HabitFlow AI</h1>
        </div>
        <nav className="px-4 space-y-2">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}>
              <link.icon size={20} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
