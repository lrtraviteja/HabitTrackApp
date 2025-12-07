import { useState, useEffect, useContext } from 'react';
import { Plus } from 'lucide-react';
import { habitAPI } from '../services/api';
import { ToastContext } from '../contexts/ToastContext';
import Sidebar from '../components/Sidebar';
import HabitCard from '../components/HabitCard';
import HabitModal from '../components/HabitModal';

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
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

  const handleToggle = async (id) => {
    const habit = habits.find(h => h._id === id);
    const optimisticHabits = habits.map(h => {
      if (h._id === id) {
        const today = new Date().setHours(0, 0, 0, 0);
        const completedToday = h.completedDates.some(d => new Date(d).setHours(0, 0, 0, 0) === today);
        return {
          ...h,
          completedDates: completedToday 
            ? h.completedDates.filter(d => new Date(d).setHours(0, 0, 0, 0) !== today)
            : [...h.completedDates, new Date()]
        };
      }
      return h;
    });
    setHabits(optimisticHabits);

    try {
      const { data } = await habitAPI.toggle(id);
      setHabits(habits.map(h => h._id === id ? data : h));
      showToast('Habit updated!', 'success');
    } catch (error) {
      setHabits(habits);
      showToast('Failed to update habit', 'error');
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingHabit) {
        const { data } = await habitAPI.update(editingHabit._id, formData);
        setHabits(habits.map(h => h._id === editingHabit._id ? data : h));
        showToast('Habit updated!', 'success');
      } else {
        const { data } = await habitAPI.create(formData);
        setHabits([...habits, data]);
        showToast('Habit created!', 'success');
      }
      setShowModal(false);
      setEditingHabit(null);
    } catch (error) {
      showToast('Failed to save habit', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this habit?')) return;
    try {
      await habitAPI.delete(id);
      setHabits(habits.filter(h => h._id !== id));
      showToast('Habit deleted!', 'success');
    } catch (error) {
      showToast('Failed to delete habit', 'error');
    }
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-8 p-4 pt-20 lg:pt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">My Habits</h1>
          <button onClick={() => { setEditingHabit(null); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            <Plus size={20} />
            Add Habit
          </button>
        </div>

        {habits.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...habits].sort((a, b) => {
              const priority = { high: 3, medium: 2, low: 1 };
              return priority[b.priority || 'medium'] - priority[a.priority || 'medium'];
            }).map(habit => (
              <HabitCard key={habit._id} habit={habit} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No habits yet. Create your first one!</p>
          </div>
        )}

        {showModal && (
          <HabitModal habit={editingHabit} onClose={() => { setShowModal(false); setEditingHabit(null); }} onSave={handleSave} />
        )}
      </main>
    </div>
  );
};

export default Habits;
