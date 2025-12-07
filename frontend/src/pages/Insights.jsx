import { useState, useContext } from 'react';
import { Sparkles, Lightbulb, Quote, Target } from 'lucide-react';
import { aiAPI } from '../services/api';
import { ToastContext } from '../contexts/ToastContext';
import Sidebar from '../components/Sidebar';

const Insights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useContext(ToastContext);

  const analyzeProgress = async () => {
    setLoading(true);
    try {
      const { data } = await aiAPI.getInsights();
      setInsights(data);
      showToast('Analysis complete!', 'success');
    } catch (error) {
      showToast('Failed to generate insights', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-8 p-4 pt-20 lg:pt-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">AI Insights</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
          <Sparkles className="mx-auto mb-4 text-indigo-600" size={48} />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Get Personalized Insights</h2>
          <p className="text-slate-600 mb-6">Let AI analyze your habits and provide actionable recommendations</p>
          <button onClick={analyzeProgress} disabled={loading} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
            {loading ? 'Analyzing...' : 'Analyze Progress'}
          </button>
        </div>

        {insights && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-indigo-600" size={24} />
                <h3 className="text-xl font-bold text-slate-800">Analysis</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">{insights.analysis}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-yellow-500" size={24} />
                <h3 className="text-xl font-bold text-slate-800">Suggestions</h3>
              </div>
              <ul className="space-y-3">
                {insights.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                    <span className="text-slate-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Quote className="text-purple-600" size={24} />
                <h3 className="text-xl font-bold text-slate-800">Daily Quote</h3>
              </div>
              <p className="text-slate-700 italic text-lg">"{insights.quote}"</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-green-600" size={24} />
                <h3 className="text-xl font-bold text-slate-800">Focus Area</h3>
              </div>
              <p className="text-slate-700">{insights.focusArea}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Insights;
