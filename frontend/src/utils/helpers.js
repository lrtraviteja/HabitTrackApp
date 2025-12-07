export const calculateStreak = (completedDates) => {
  if (!completedDates.length) return 0;
  
  const sorted = completedDates.map(d => new Date(d).setHours(0, 0, 0, 0)).sort((a, b) => b - a);
  const today = new Date().setHours(0, 0, 0, 0);
  const yesterday = today - 86400000;
  
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;
  
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1] - sorted[i] === 86400000) streak++;
    else break;
  }
  return streak;
};

export const isCompletedToday = (completedDates) => {
  const today = new Date().setHours(0, 0, 0, 0);
  return completedDates.some(d => new Date(d).setHours(0, 0, 0, 0) === today);
};

export const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
};

export const getCurrentMonthDays = () => {
  const days = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
};
