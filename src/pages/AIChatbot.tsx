import { useState, useRef, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProBadge } from "@/components/ProBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Briefcase, 
  UserCheck, 
  Users, 
  Scale,
  Mic,
  MicOff,
  Send,
  Home,
  BookOpen,
  Lock,
  Volume2,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { mockUser } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: {
    pronunciation: number;
    intonation: number;
    fluency: number;
    errors: string[];
  };
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  role: string;
  icon: any;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  requiresPro: boolean;
}

const AIChatbot = () => {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scenarios: Scenario[] = [
    {
      id: 'colleague',
      title: 'Colleague Discussion',
      description: 'Practice daily workplace conversations with a friendly colleague',
      role: 'Colleague',
      icon: Users,
      difficulty: 'basic',
      requiresPro: false
    },
    {
      id: 'interview',
      title: 'Job Interview',
      description: 'Prepare for interviews with realistic questions and feedback',
      role: 'Recruiter',
      icon: UserCheck,
      difficulty: 'intermediate',
      requiresPro: true
    },
    {
      id: 'client',
      title: 'Client Meeting',
      description: 'Handle client interactions and address their concerns professionally',
      role: 'Client',
      icon: Briefcase,
      difficulty: 'intermediate',
      requiresPro: true
    },
    {
      id: 'negotiation',
      title: 'Business Negotiation',
      description: 'Practice negotiation skills in high-stakes business scenarios',
      role: 'Business Partner',
      icon: Scale,
      difficulty: 'advanced',
      requiresPro: true
    }
  ];

  const startConversation = (scenario: Scenario) => {
    if (scenario.requiresPro && !mockUser.isPro) {
      toast({
        title: "Premium Feature",
        description: "Upgrade to Basic or Premium plan to access this scenario",
        variant: "destructive"
      });
      return;
    }

    setSelectedScenario(scenario);
    const welcomeMessage: Message = {
      id: '1',
      role: 'assistant',
      content: getWelcomeMessage(scenario),
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const getWelcomeMessage = (scenario: Scenario): string => {
    const welcomes = {
      colleague: "Hi! I'm glad we could meet today. I wanted to discuss the upcoming project with you. How have you been?",
      interview: "Good morning! Thank you for coming in today. I've reviewed your resume and I'm excited to learn more about you. Could you start by telling me about yourself?",
      client: "Hello! Thank you for taking the time to meet with me. I understand you have some concerns about our recent proposal. How can I help you today?",
      negotiation: "Good afternoon. I appreciate you coming to the negotiation table. Let's discuss the terms of our potential partnership. What are your main priorities?"
    };
    return welcomes[scenario.id as keyof typeof welcomes] || "Hello! How can I help you today?";
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedScenario) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date(),
      feedback: {
        pronunciation: 85,
        intonation: 78,
        fluency: 82,
        errors: ['Slight stress issue with "presentation"', 'Consider pausing after "however"']
      }
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getMockResponse(selectedScenario.id, inputText),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getMockResponse = (scenarioId: string, userInput: string): string => {
    const responses = {
      colleague: "That sounds like a great approach! I agree with your perspective. Have you had a chance to look at the timeline for the deliverables?",
      interview: "That's very impressive. Your experience in that area is exactly what we're looking for. Can you tell me about a challenging situation you faced and how you handled it?",
      client: "I understand your concerns. Let me address those points one by one. First, regarding the timeline...",
      negotiation: "I appreciate your position. However, from our perspective, we need to consider the long-term value. Perhaps we can find a middle ground?"
    };
    return responses[scenarioId as keyof typeof responses] || "I see. Could you elaborate on that?";
  };

  const toggleRecording = () => {
    if (!mockUser.isPro && selectedScenario?.requiresPro) {
      toast({
        title: "Premium Feature",
        description: "Voice recording requires a paid plan",
        variant: "destructive"
      });
      return;
    }
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone"
      });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!mockUser.isPro && selectedScenario) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <NavLink to="/dashboard" className="flex items-center gap-2 font-bold text-xl">
                <span className="gradient-text">BizTalk</span>
              </NavLink>
            </div>
            <ThemeToggle />
          </div>
        </nav>
        <div className="container py-20">
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <Lock className="w-20 h-20 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Unlock AI Chatbot Feature</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Access realistic workplace conversation simulations with advanced AI feedback
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="p-6 border-2">
                <h3 className="font-bold text-xl mb-2">Basic Plan</h3>
                <p className="text-3xl font-bold text-primary mb-4">179,000 VND<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                <ul className="space-y-2 text-sm text-left mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>10 Email modules access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>Limited AI practice (5 times/day)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>Basic feedback (grammar/pronunciation)</span>
                  </li>
                </ul>
                <Button className="w-full">Choose Basic</Button>
              </Card>
              <Card className="p-6 border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5">
                <Badge className="mb-2">Recommended</Badge>
                <h3 className="font-bold text-xl mb-2">Premium Plan</h3>
                <p className="text-3xl font-bold text-primary mb-4">1,990,000 VND<span className="text-sm font-normal text-muted-foreground">/year</span></p>
                <ul className="space-y-2 text-sm text-left mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>Unlimited AI practice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>In-depth expert feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>Advanced soft skills toolkit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    <span>Detailed progress reports</span>
                  </li>
                </ul>
                <Button className="w-full gradient-pro">Choose Premium</Button>
              </Card>
            </div>
            <Button variant="outline" onClick={() => setSelectedScenario(null)}>
              Back to Scenarios
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <NavLink to="/dashboard" className="flex items-center gap-2 font-bold text-xl">
              <span className="gradient-text">BizTalk</span>
            </NavLink>
            <div className="hidden md:flex items-center gap-4">
              <NavLink 
                to="/dashboard" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </NavLink>
              <NavLink 
                to="/courses" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Courses
              </NavLink>
              <NavLink 
                to="/ai-chatbot" 
                className="flex items-center gap-2 text-foreground font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                AI Chatbot
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container py-8">
        {!selectedScenario ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold gradient-text">AI Conversation Simulator</h1>
                <ProBadge />
              </div>
              <p className="text-muted-foreground">Practice workplace conversations with realistic AI-powered scenarios</p>
            </div>

            {/* Scenario Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scenarios.map((scenario) => {
                const Icon = scenario.icon;
                const isLocked = scenario.requiresPro && !mockUser.isPro;
                
                return (
                  <Card 
                    key={scenario.id} 
                    className={`relative overflow-hidden transition-all hover:shadow-elegant ${
                      isLocked ? 'opacity-75' : 'cursor-pointer'
                    }`}
                    onClick={() => !isLocked && startConversation(scenario)}
                  >
                    {isLocked && (
                      <div className="absolute top-4 right-4 z-10">
                        <Lock className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${
                          scenario.difficulty === 'basic' ? 'bg-success/20' :
                          scenario.difficulty === 'intermediate' ? 'bg-warning/20' :
                          'bg-destructive/20'
                        }`}>
                          <Icon className={`w-8 h-8 ${
                            scenario.difficulty === 'basic' ? 'text-success' :
                            scenario.difficulty === 'intermediate' ? 'text-warning' :
                            'text-destructive'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle>{scenario.title}</CardTitle>
                            {scenario.requiresPro && <ProBadge />}
                          </div>
                          <Badge variant="outline" className="mb-2">
                            {scenario.role}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant={
                          scenario.difficulty === 'basic' ? 'default' :
                          scenario.difficulty === 'intermediate' ? 'secondary' :
                          'destructive'
                        }>
                          {scenario.difficulty}
                        </Badge>
                        <Button disabled={isLocked}>
                          {isLocked ? 'Requires Pro' : 'Start Practice'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pricing Prompt */}
            {!mockUser.isPro && (
              <Card className="mt-8 p-6 bg-gradient-pro text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Unlock All Scenarios</h3>
                    <p className="opacity-90">Get access to advanced AI conversation practice with detailed feedback</p>
                  </div>
                  <Button size="lg" variant="secondary">
                    View Plans
                  </Button>
                </div>
              </Card>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="h-[calc(100vh-12rem)]  flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedScenario(null)}
                      >
                        ← Back
                      </Button>
                      <div>
                        <CardTitle className="text-lg">{selectedScenario.title}</CardTitle>
                        <CardDescription>Speaking with {selectedScenario.role}</CardDescription>
                      </div>
                    </div>
                    <Badge>{selectedScenario.difficulty}</Badge>
                  </div>
                </CardHeader>
                
                {/* Messages */}
                <ScrollArea className="flex-1 p-6" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`rounded-2xl p-4 ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                          {message.feedback && (
                            <Card className="mt-2 p-3 bg-background/50">
                              <div className="grid grid-cols-3 gap-2 mb-2">
                                <div className="text-center">
                                  <div className="text-xs text-muted-foreground mb-1">Pronunciation</div>
                                  <div className="text-lg font-bold text-success">{message.feedback.pronunciation}%</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xs text-muted-foreground mb-1">Intonation</div>
                                  <div className="text-lg font-bold text-warning">{message.feedback.intonation}%</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xs text-muted-foreground mb-1">Fluency</div>
                                  <div className="text-lg font-bold text-accent">{message.feedback.fluency}%</div>
                                </div>
                              </div>
                              {message.feedback.errors.length > 0 && (
                                <div className="space-y-1">
                                  {message.feedback.errors.map((error, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-xs">
                                      <AlertCircle className="w-3 h-3 text-warning mt-0.5 flex-shrink-0" />
                                      <span className="text-muted-foreground">{error}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </Card>
                          )}
                          <div className="text-xs text-muted-foreground mt-1 px-2">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl p-4">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="icon"
                      onClick={toggleRecording}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Textarea
                      placeholder="Type your message or use voice input..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[60px] resize-none"
                    />
                    <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Session Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Messages</span>
                      <span className="font-bold">{messages.length}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Avg. Pronunciation</span>
                      <span className="font-bold text-success">85%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Avg. Fluency</span>
                      <span className="font-bold text-accent">82%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Volume2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Speak clearly and at a natural pace</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>Review feedback after each message</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>Practice different scenarios regularly</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatbot;
