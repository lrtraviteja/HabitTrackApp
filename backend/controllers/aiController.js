import openai from '../services/aiService.js';
import Habit from '../models/Habit.js';

export const getInsights = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.userId });
    
    if (!habits.length) {
      return res.json({
        analysis: "Start tracking habits to get personalized insights!",
        suggestions: ["Create your first habit", "Set realistic goals", "Track daily progress"],
        quote: "The journey of a thousand miles begins with one step.",
        focusArea: "Begin by adding habits you want to build"
      });
    }
    
    const habitSummary = habits.map(h => ({
      title: h.title,
      category: h.category,
      streak: h.streak,
      completions: h.completedDates.length
    }));
    
    const prompt = `Analyze these habits: ${JSON.stringify(habitSummary)}. Provide:
1. A motivational analysis (2-3 sentences)
2. Three actionable suggestions
3. A daily motivational quote
4. One focus area for improvement

Format as JSON: { "analysis": "", "suggestions": [], "quote": "", "focusArea": "" }`;
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }]
      });
      const insights = JSON.parse(completion.choices[0].message.content.replace(/```json\n|\n```/g, "").trim());
      return res.json(insights);
    } catch (aiError) {
      console.log('AI API failed, using mock data:', aiError.message);
      return res.json({
        analysis: `You're tracking ${habits.length} habits with great dedication. Your consistency shows commitment to personal growth. Keep building on this momentum!`,
        suggestions: [
          "Focus on maintaining your current streaks by setting daily reminders",
          "Consider adding complementary habits that support your existing goals",
          "Review and adjust habit difficulty if completion rates are too low or high"
        ],
        quote: "Success is the sum of small efforts repeated day in and day out.",
        focusArea: "Consistency over perfection - aim to complete at least 80% of your daily habits"
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'AI service error', error: error.message });
  }
};
