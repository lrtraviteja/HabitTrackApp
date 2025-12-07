import { Flame, Check, Pencil, Trash2 } from 'lucide-react';
import { isCompletedToday } from '../utils/helpers';

const HabitCard = ({ habit, onToggle, onEdit, onDelete }) => {
  const completed = isCompletedToday(habit.completedDates);
  const priorityColors = { low: 'bg-slate-100 text-slate-600', medium: 'bg-yellow-100 text-yellow-700', high: 'bg-red-100 text-red-700' };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[habit.priority || 'medium']}`}>
              {(habit.priority || 'medium').toUpperCase()}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${habit.category === 'health' ? 'bg-green-100 text-green-700' : habit.category === 'productivity' ? 'bg-blue-100 text-blue-700' : habit.category === 'mindfulness' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
              {habit.category}
            </span>
            {habit.streak > 0 && (
              <div className="flex items-center gap-1 text-orange-500">
                <Flame size={16} />
                <span className="text-sm font-bold">{habit.streak}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-slate-800">{habit.title}</h3>
        </div>
        <button onClick={() => onToggle(habit._id)} className={`p-2 rounded-lg transition ${completed ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
          <Check size={20} />
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(habit)} className="flex-1 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition flex items-center justify-center gap-2">
          <Pencil size={16} />
          Edit
        </button>
        <button onClick={() => onDelete(habit._id)} className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-2">
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
