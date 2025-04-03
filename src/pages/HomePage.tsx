
import React from 'react';
import MoodTracker from '@/components/shared/MoodTracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, BookOpen, Wind, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const quickAccessItems = [
    {
      title: 'Chat Support',
      description: "Talk with our AI assistant about how you're feeling.",
      icon: <MessageCircle className="h-6 w-6 text-lavender" />,
      path: '/chat'
    },
    {
      title: 'Breathing Exercises',
      description: 'Guided breathing to help you relax and focus.',
      icon: <Wind className="h-6 w-6 text-sage" />,
      path: '/breathing'
    },
    {
      title: 'Journal',
      description: 'Write down your thoughts and track your progress.',
      icon: <BookOpen className="h-6 w-6 text-peach" />,
      path: '/journal'
    },
    {
      title: 'Support Forums',
      description: "Connect with others who understand what you're going through.",
      icon: <Users className="h-6 w-6 text-lavender" />,
      path: '/forum'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-poppins font-semibold mb-6 text-sage">Welcome to MindfulSpace</h1>
      
      <MoodTracker />
      
      <section className="mb-8">
        <h2 className="text-xl font-poppins font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccessItems.map((item) => (
            <Card key={item.title} className="card-mental hover:shadow-md cursor-pointer" onClick={() => navigate(item.path)}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <CardTitle className="text-lg font-poppins">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <Card className="card-mental bg-gradient-to-r from-sage/20 to-lavender/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-poppins font-semibold mb-2">Daily Wellness Tip</h3>
                <p className="mb-4">Remember that it's okay to take breaks. Small moments of rest can help your mind recharge and improve your focus.</p>
                <Button className="bg-peach text-charcoal hover:bg-peach/90">Get More Tips</Button>
              </div>
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-lavender to-sage/70 flex items-center justify-center">
                <span className="text-5xl">🌱</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
