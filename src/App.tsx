import React from "react";
import { Timer } from "./components/Timer";
import { DomainSelector } from "./components/DomainSelector";
import TaskManager from "./components/TaskManager";
import Journal from "./components/Journal";
import { GraduationCap, BookOpen, PenTool } from "lucide-react";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "./components/ui/sheet";
import { HowItWorks } from "./components/HowItWorks";

function App() {
  return (
    <div className="min-h-screen bg-gradient">
      <header className="bg-background/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">PomodoroAI</h1>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="hidden sm:block">Tasks</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="mb-2">Tasks</SheetTitle>
                </SheetHeader>
                <TaskManager />
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" className="gap-2">
                  <PenTool className="w-5 h-5" />
                  <span className="hidden sm:block">Journal</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="mb-2">Learning Journal</SheetTitle>
                </SheetHeader>
                <Journal />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-border/50">
            <Timer />
          </div>

          <Tabs defaultValue="learn" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="learn">Learning Path</TabsTrigger>
              <TabsTrigger value="how">How It Works</TabsTrigger>
            </TabsList>

            <TabsContent value="learn" className="space-y-8">
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-border/50">
                <DomainSelector />
              </div>
            </TabsContent>

            <TabsContent value="how">
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-border/50">
                <HowItWorks />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default App;
