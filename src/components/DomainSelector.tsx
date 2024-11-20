import React, { useState } from 'react';
import { Code2, Palette, Database, LineChart, BookOpen, Loader2, Briefcase, Lightbulb, Coins } from 'lucide-react';
import { Button } from './ui/button';
import { TopicsList } from './TopicsList';
import { generateTopics } from '../lib/openai';

const domains = [
  { id: 'web', name: 'Web Development', icon: Code2 },
  { id: 'design', name: 'UI/UX Design', icon: Palette },
  { id: 'data', name: 'Data Science', icon: Database },
  { id: 'marketing', name: 'Digital Marketing', icon: LineChart },
  { id: 'business', name: 'Business & Management', icon: Briefcase },
  { id: 'general', name: 'General Knowledge', icon: BookOpen },
  { id: 'productivity', name: 'Personal Development', icon: Lightbulb },
  { id: 'finance', name: 'Finance', icon: Coins },
];

export function DomainSelector() {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [focusArea, setFocusArea] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateTopics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const selectedDomainName = domains.find(d => d.id === selectedDomain)?.name || '';
      const generatedTopics = await generateTopics(selectedDomainName, focusArea);
      setTopics(generatedTopics);
      setSelectedTopic(null);
    } catch (err) {
      setError('Failed to generate topics. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Choose Your Learning Path</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {domains.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedDomain(id)}
            className={`p-4 rounded-xl border-2 border-white border-opacity-50 transition-all ${
              selectedDomain === id
                ? 'border-[#ff6b00] bg-[#ff6b00]/10 text-[#ff6b00] border-2'
                : 'border-border/50 hover:border-[#ff6b00]/20 hover:bg-[#ff6b00]/5 text-white'
            }`}
          >
            <Icon className={`w-6 h-6 mb-2 ${
              selectedDomain === id ? 'text-[#ff6b00]' : 'text-white/60'
            }`} />
            <div className="font-medium">{name}</div>
          </button>
        ))}
      </div>

      {selectedDomain && (
        <div className="space-y-4">
          <div>
            <label htmlFor="focusArea" className="block text-sm font-medium mb-2 text-white">
              What would you like to focus on?
            </label>
            <input
              type="text"
              id="focusArea"
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              placeholder="E.g., React Hooks, Color Theory, Data Visualization..."
              className="w-full px-4 py-2 rounded-lg border bg-secondary/50 text-white placeholder-white/50 focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] outline-none transition-colors"
            />
          </div>

          <Button
            disabled={!focusArea || isLoading}
            onClick={handleGenerateTopics}
            className="w-full py-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Topics...
              </>
            ) : (
              'Generate Learning Topics'
            )}
          </Button>

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          {topics.length > 0 && (
            <TopicsList
              topics={topics}
              onSelectTopic={setSelectedTopic}
              selectedTopic={selectedTopic}
            />
          )}
        </div>
      )}
    </div>
  );
}