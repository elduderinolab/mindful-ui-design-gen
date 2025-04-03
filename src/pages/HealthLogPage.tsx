
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Download, BarChart3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';

interface MoodEntry {
  date: string;
  mood: number;
  note?: string;
}

// Sample mood data - in a real app this would be fetched from a database
const SAMPLE_MOOD_DATA: MoodEntry[] = [
  { date: '2025-03-28', mood: 4, note: 'Feeling good today, productive study session' },
  { date: '2025-03-29', mood: 3, note: 'Neutral day, bit tired from studying' },
  { date: '2025-03-30', mood: 2, note: 'Stressed about upcoming exam' },
  { date: '2025-03-31', mood: 1, note: 'Anxious, had trouble sleeping' },
  { date: '2025-04-01', mood: 2, note: 'Still worried but better than yesterday' },
  { date: '2025-04-02', mood: 3, note: 'Feeling more calm after talking to friend' },
  { date: '2025-04-03', mood: 4, note: 'Good day, exam went well' }
];

const moodLabels = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Great',
  5: 'Excellent'
};

const HealthLogPage: React.FC = () => {
  const navigate = useNavigate();
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    // In a real app, fetch from API or local storage
    setMoodData(SAMPLE_MOOD_DATA);
  }, []);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getChartData = () => {
    return moodData.map(entry => ({
      date: formatDate(entry.date),
      mood: entry.mood,
      moodLabel: moodLabels[entry.mood as keyof typeof moodLabels]
    }));
  };

  const getMoodAverage = (): number => {
    if (!moodData.length) return 0;
    const sum = moodData.reduce((acc, entry) => acc + entry.mood, 0);
    return parseFloat((sum / moodData.length).toFixed(1));
  };

  const getMoodTrend = (): string => {
    if (moodData.length < 3) return "Not enough data";
    
    const recent = moodData.slice(-3);
    const avg = recent.reduce((acc, entry) => acc + entry.mood, 0) / recent.length;
    const firstHalf = moodData.slice(0, Math.floor(moodData.length / 2));
    const firstHalfAvg = firstHalf.reduce((acc, entry) => acc + entry.mood, 0) / firstHalf.length;
    
    if (avg > firstHalfAvg + 0.5) return "Improving";
    if (avg < firstHalfAvg - 0.5) return "Declining";
    return "Stable";
  };

  const downloadReport = () => {
    // In a real app, generate a PDF or CSV report
    const reportData = JSON.stringify(moodData, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mood-report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/')} 
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-poppins font-semibold text-sage">Health Log & Reports</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="card-mental">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-poppins flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sage" />
              Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {(['week', 'month', 'year'] as const).map((period) => (
                <Button 
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  className={selectedPeriod === period ? "bg-sage text-white" : ""}
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-mental">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-poppins flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-lavender" />
              Mood Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-semibold">{getMoodAverage()}</p>
                <p className="text-sm text-muted-foreground">out of 5</p>
              </div>
              <div className="bg-muted px-3 py-1 rounded-full text-sm">
                Trend: {getMoodTrend()}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-mental">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-poppins flex items-center gap-2">
              <Download className="h-5 w-5 text-peach" />
              Export Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline"
              className="w-full"
              onClick={downloadReport}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-mental mb-8">
        <CardHeader>
          <CardTitle className="font-poppins">Mood Tracking Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="mood" stroke="#A78BC1" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" opacity={0.3} />
                <XAxis dataKey="date" />
                <YAxis 
                  domain={[0, 5]} 
                  ticks={[1, 2, 3, 4, 5]} 
                  tickFormatter={(value) => moodLabels[value as keyof typeof moodLabels] || ''} 
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} - ${moodLabels[value as keyof typeof moodLabels]}`, 
                    'Mood'
                  ]} 
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-mental mb-8">
        <CardHeader>
          <CardTitle className="font-poppins">Mood Journal Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moodData.map((entry, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">{formatDate(entry.date)}</p>
                  <span className="px-3 py-1 bg-lavender/20 rounded-full text-sm">
                    {moodLabels[entry.mood as keyof typeof moodLabels]}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{entry.note}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthLogPage;
