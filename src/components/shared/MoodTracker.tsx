
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-green-100 dark:bg-green-900/30' },
  { emoji: '😌', label: 'Calm', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { emoji: '😐', label: 'Neutral', color: 'bg-gray-100 dark:bg-gray-700/30' },
  { emoji: '😢', label: 'Sad', color: 'bg-indigo-100 dark:bg-indigo-900/30' },
  { emoji: '😡', label: 'Angry', color: 'bg-orange-100 dark:bg-orange-900/30' },
  { emoji: '😰', label: 'Anxious', color: 'bg-yellow-100 dark:bg-yellow-900/30' },
];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { toast } = useToast();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    toast({
      title: "Mood Logged",
      description: `You're feeling ${mood.toLowerCase()} today.`,
    });
  };

  return (
    <div className="card-mental mb-6">
      <h2 className="text-lg font-poppins font-semibold mb-3">How are you feeling today?</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {moods.map((mood) => (
          <Button
            key={mood.label}
            variant="ghost"
            className={`flex flex-col items-center p-3 h-auto ${
              selectedMood === mood.label ? 'ring-2 ring-sage' : ''
            } ${mood.color}`}
            onClick={() => handleMoodSelect(mood.label)}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-xs">{mood.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
