
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Download, Plus, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

interface JournalEntry {
  id: string | number;
  date: Date;
  content: string;
  mood: string;
}

const PROMPTS = [
  "What made you smile today?",
  "What's something you're grateful for?",
  "What's something challenging you faced today?",
  "How did you practice self-care today?",
  "What's something you're looking forward to?"
];

const JournalPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    const fetchJournalEntries = async () => {
      try {
        const { data, error } = await supabase
          .from('journal_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          const formattedEntries: JournalEntry[] = data.map(entry => ({
            id: entry.id,
            date: new Date(entry.date),
            content: entry.content,
            mood: entry.mood || 'Unspecified'
          }));
          
          setEntries(formattedEntries);
        }
      } catch (error) {
        console.error('Error loading journal entries:', error);
        toast({
          title: 'Error',
          description: 'Failed to load journal entries',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    // Create journal_entries table if it doesn't exist yet
    const createJournalTable = async () => {
      try {
        // Check if the table exists by trying to select from it
        const { error } = await supabase
          .from('journal_entries')
          .select('id')
          .limit(1);
          
        // If there's an error (table doesn't exist), create it using SQL
        if (error) {
          const { error: sqlError } = await supabase.rpc('create_journal_entries_table');
          if (sqlError) throw sqlError;
        }
        
        fetchJournalEntries();
      } catch (error) {
        console.error('Error checking/creating journal table:', error);
        setIsLoading(false);
      }
    };
    
    createJournalTable();
  }, [user, toast]);

  const handleSave = async () => {
    if (!user) return;
    
    if (!currentEntry.trim()) {
      toast({
        title: "Entry empty",
        description: "Please write something before saving.",
        variant: "destructive"
      });
      return;
    }

    const newEntry: JournalEntry = {
      id: uuidv4(),
      date: new Date(),
      content: currentEntry,
      mood: selectedMood || 'Unspecified'
    };

    try {
      const { error } = await supabase
        .from('journal_entries')
        .insert({
          id: newEntry.id,
          user_id: user.id,
          date: newEntry.date.toISOString(),
          content: newEntry.content,
          mood: newEntry.mood
        });
        
      if (error) throw error;
      
      setEntries([newEntry, ...entries]);
      setCurrentEntry('');
      setSelectedPrompt('');
      setSelectedMood('');

      toast({
        title: "Journal Entry Saved",
        description: "Your thoughts have been recorded.",
      });
    } catch (error) {
      console.error('Error saving journal entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to save journal entry',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setCurrentEntry(currentEntry ? currentEntry + '\n\n' + prompt + '\n' : prompt + '\n');
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-poppins font-semibold mb-6 text-sage">Journal</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="card-mental mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-sage" />
                New Entry - {formatDate(new Date())}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">How are you feeling?</label>
                <div className="flex flex-wrap gap-2">
                  {['Happy', 'Calm', 'Neutral', 'Sad', 'Angry', 'Anxious'].map((mood) => (
                    <Button
                      key={mood}
                      variant="outline"
                      size="sm"
                      className={`${selectedMood === mood ? 'bg-sage text-white' : ''}`}
                      onClick={() => setSelectedMood(mood)}
                    >
                      {mood}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Writing Prompts</label>
                <div className="flex flex-wrap gap-2">
                  {PROMPTS.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      className={`${selectedPrompt === prompt ? 'bg-lavender/50' : ''}`}
                      onClick={() => handlePromptSelect(prompt)}
                    >
                      {prompt.length > 25 ? prompt.substring(0, 22) + '...' : prompt}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Textarea
                placeholder="What's on your mind today?"
                className="min-h-[200px] mb-4"
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
              />
              
              <div className="flex gap-3">
                <Button 
                  className="bg-sage hover:bg-sage/90 flex-1 sm:flex-none"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Entry
                </Button>
                <Button variant="outline" className="sm:flex-none">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="card-mental">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Previous Entries</CardTitle>
            </CardHeader>
            <CardContent>
              {entries.length > 0 ? (
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <div 
                      key={entry.id} 
                      className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium">{formatDate(entry.date)}</p>
                        <span className="text-xs px-2 py-1 bg-lavender/20 rounded-full">{entry.mood}</span>
                      </div>
                      <p className="text-sm line-clamp-3">{entry.content}</p>
                    </div>
                  ))}
                  
                  <Button 
                    variant="ghost" 
                    className="w-full text-sage hover:text-sage/80 hover:bg-sage/10"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    View All Entries
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No entries yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
