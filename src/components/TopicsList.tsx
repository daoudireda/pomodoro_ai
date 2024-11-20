import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

interface TopicsListProps {
  topics: string[];
  onSelectTopic: (topic: string) => void;
  selectedTopic: string | null;
}

export function TopicsList({ topics, onSelectTopic, selectedTopic }: TopicsListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Choose a Topic to Focus On:</h3>
      <div className="grid gap-3">
        {topics.map((topic, index) => (
          <Button
            key={index}
            variant={selectedTopic === topic ? "default" : "outline"}
            className="w-full justify-start gap-2 p-4 h-auto"
            onClick={() => onSelectTopic(topic)}
          >
            <CheckCircle2 
              className={`w-5 h-5 ${
                selectedTopic === topic ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            />
            <span className="text-left">{topic}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}