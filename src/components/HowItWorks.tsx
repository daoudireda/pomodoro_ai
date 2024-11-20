import React from 'react';
import { Timer, Brain, BookOpen, PenTool, CheckCircle2 } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Timer,
      title: "Set Your Timer",
      description: "Choose a Pomodoro cycle that works for you. We offer various presets like 25/5, 15/3, or 50/10 minutes."
    },
    {
      icon: Brain,
      title: "Select Learning Domain",
      description: "Pick your area of interest and specify what you'd like to focus on. Our AI will generate personalized learning topics."
    },
    {
      icon: BookOpen,
      title: "Manage Tasks",
      description: "Create and track your learning tasks. Break down your goals into manageable chunks and mark them as you progress."
    },
    {
      icon: PenTool,
      title: "Journal Your Progress",
      description: "Keep notes, reflections, and insights in your learning journal. Document your journey and track your understanding."
    },
    {
      icon: CheckCircle2,
      title: "Track Progress",
      description: "Complete topics, mark tasks as done, and build a consistent learning habit with the Pomodoro technique."
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-white">How to Use PomodoroAI</h2>
      
      <div className="grid gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4 p-4 rounded-lg bg-secondary/30 backdrop-blur-sm border border-border/50">
            <div className="flex-shrink-0">
              <step.icon className="w-6 h-6 text-[#ff6b00]" />
            </div>
            <div>
              <h3 className="font-medium mb-1 text-white">{step.title}</h3>
              <p className="text-white/70">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}