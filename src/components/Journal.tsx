"use client";

import React, { useState, useEffect } from "react";
import { Save, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";

interface JournalEntry {
  id: string;
  date: string;
  content: string;
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEntries = () => {
      const savedEntries = localStorage.getItem("journal");
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
      setIsLoading(false);
    };
    loadEntries();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("journal", JSON.stringify(entries));
    }
  }, [entries, isLoading]);

  const saveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEntry.trim()) return;

    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      content: currentEntry,
    };

    setEntries((prevEntries) => [newEntry, ...prevEntries]);
    setCurrentEntry("");
  };

  if (isLoading) {
    return <div>Loading journal entries...</div>;
  }

  const deleteJournal = (id: string) => {
    setEntries(entries.filter((entrie) => entrie.id !== id));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={saveEntry} className="space-y-4">
        <textarea
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          placeholder="Write your thoughts, notes, or reflections..."
          className="w-full h-52 px-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-ring focus:border-input outline-none transition-colors resize-none text-white"
          aria-label="Journal entry"
        />

        <Button type="submit" className="gap-2">
          <Save className="w-5 h-5" />
          Save
        </Button>
      </form>

      <div className="space-y-4">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="p-4 rounded-lg border bg-secondary/50"
          >
            <div className="flex items-center justify-between">
              <time className="text-sm text-muted-foreground block">
                {entry.date}
              </time>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteJournal(entry.id)}
                className="text-destructive hover:text-destructive/90 text-orange-500 items-center"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
            <p className="whitespace-pre-wrap text-white">{entry.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
