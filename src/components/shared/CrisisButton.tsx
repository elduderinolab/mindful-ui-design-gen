
import React, { useState } from 'react';
import { LifeBuoy, Phone, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CrisisButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const handleCallSupport = () => {
    window.location.href = 'tel:+919999666555';
    toast({
      title: "Connecting to helpline",
      description: "Dialing national mental health helpline"
    });
  };

  const handleTextCounselor = () => {
    toast({
      title: "Counselor Chat",
      description: "Connecting you to a counselor via text",
    });
  };

  return (
    <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50">
      {isExpanded && (
        <div className="bg-white dark:bg-charcoal rounded-lg shadow-lg p-3 md:p-4 mb-3 max-w-xs animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-poppins font-semibold text-sage text-sm md:text-base">Crisis Support</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsExpanded(false)}
              className="h-6 w-6 md:h-7 md:w-7"
            >
              <X className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
          <p className="text-xs md:text-sm mb-3">
            If you're experiencing a mental health emergency, please reach out for immediate help.
          </p>
          <div className="space-y-2">
            <Button 
              className="w-full bg-sage hover:bg-sage/90 text-white flex items-center gap-2 text-xs md:text-sm"
              size="sm"
              onClick={handleCallSupport}
            >
              <Phone className="h-3 w-3 md:h-4 md:w-4" />
              Call Support Line
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-sage text-sage hover:bg-sage/10 text-xs md:text-sm"
              size="sm"
              onClick={handleTextCounselor}
            >
              <MessageSquare className="h-3 w-3 md:h-4 md:w-4 mr-2" />
              Text With Counselor
            </Button>
          </div>
        </div>
      )}
      <Button 
        className="rounded-full bg-peach hover:bg-peach/90 h-12 w-12 md:h-14 md:w-14 flex items-center justify-center shadow-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <LifeBuoy className="h-5 w-5 md:h-6 md:w-6 text-charcoal" />
        <span className="sr-only">Crisis Support</span>
      </Button>
    </div>
  );
};

export default CrisisButton;
