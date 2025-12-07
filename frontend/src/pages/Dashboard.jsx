import { useState, useEffect, useContext } from 'react';
import { Target, CheckCircle, TrendingUp, Flame } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { habitAPI } from '../services/api';
import { ToastContext } from '../contexts/ToastContext';
import { isCompletedToday, getLast7Days, getCurrentMonthDays } from '../utils/helpers';
import StatCard from '../components/StatCard';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [view, setView] = useState('weekly');
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const { data } = await habitAPI.getAll();
      setHabits(data);
    } catch (error) {
      showToast('Failed to load habits', 'error');
    }
  };

  const completedToday = habits.filter(h => isCompletedToday(h.completedDates)).length;
  const consistency = habits.length ? Math.round((completedToday / habits.length) * 100) : 0;
  const bestStreak = Math.max(...habits.map(h => h.streak), 0);

  const weeklyData = getLast7Days().map(dateStr => {
    const completedCount = habits.reduce((count, habit) => {
      const hasCompletion = habit.completedDates.some(d => {
        const completedDate = new Date(d).toISOString().split('T')[0];
        return completedDate === dateStr;
      });
      return hasCompletion ? count + 1 : count;
    }, 0);
    return {
      date: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
      completed: completedCount
    };
  });

  const today = new Date().setHours(0, 0, 0, 0);
  const monthlyData = getCurrentMonthDays()
    .filter(dateStr => new Date(dateStr).setHours(0, 0, 0, 0) <= today)
    .map(dateStr => {
      const completedCount = habits.reduce((count, habit) => {
        const hasCompletion = habit.completedDates.some(d => {
          const completedDate = new Date(d).toISOString().split('T')[0];
          return completedDate === dateStr;
        });
        return hasCompletion ? count + 1 : count;
      }, 0);
      return {
        date: new Date(dateStr).getDate(),
        completed: completedCount
      };
    });

  const chartData = view === 'weekly' ? weeklyData : monthlyData;

  const topHabits = [...habits].sort((a, b) => b.streak - a.streak).slice(0, 3);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-8 p-4 pt-20 lg:pt-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Target} label="Total Habits" value={habits.length} color="bg-indigo-500" />
          <StatCard icon={CheckCircle} label="Completed Today" value={completedToday} color="bg-green-500" />
          <StatCard icon={TrendingUp} label="Consistency" value={`${consistency}%`} color="bg-blue-500" />
          <StatCard icon={Flame} label="Best Streak" value={bestStreak} color="bg-orange-500" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">Progress Chart</h2>
            <div className="flex gap-2">
              <button onClick={() => setView('weekly')} className={`px-4 py-2 rounded-lg transition ${view === 'weekly' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Weekly</button>
              <button onClick={() => setView('monthly')} className={`px-4 py-2 rounded-lg transition ${view === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Monthly</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="completed" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Today's Focus</h2>
          {topHabits.length ? (
            <div className="space-y-3">
              {topHabits.map(habit => (
                <div key={habit._id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-800">{habit.title}</span>
                  <div className="flex items-center gap-2 text-orange-500">
                    <Flame size={18} />
                    <span className="font-bold">{habit.streak}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600">No habits yet. Create your first habit!</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
