import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProBadge } from "@/components/ProBadge";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { 
  Mic, 
  BookOpen, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles,
  Globe,
  Users,
  Award
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navigation showAuthButtons />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-warning rounded-full blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Master English with
              <br />
              <span className="text-accent">AI-Powered Learning</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Personalized lessons, real-time speech correction, and adaptive vocabulary training. 
              Your path to fluency starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/placement-test">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Award className="mr-2 h-5 w-5" />
                  Take Placement Test
                </Button>
              </Link>
              <a href="#pricing">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  View Pricing
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to improve all aspects of your English proficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 shadow-card hover:shadow-lg-custom transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Placement Test</h3>
              <p className="text-muted-foreground">
                Multi-dimensional assessment covering grammar, reading, and speaking to determine your exact level (A1-C2).
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-lg-custom transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Speech Correction
                <ProBadge className="ml-2" />
              </h3>
              <p className="text-muted-foreground">
                Real-time pronunciation analysis with phoneme-level feedback, intonation tracking, and native comparison.
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-lg-custom transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-2">Active Content Feed</h3>
              <p className="text-muted-foreground">
                Personalized articles, podcasts, and videos with embedded micro-lessons and vocabulary highlights.
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-lg-custom transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Courses</h3>
              <p className="text-muted-foreground">
                Industry-specific modules with video lectures, vocabulary cards, and practice exercises tailored to your career field.
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-lg-custom transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Vocabulary Trainer</h3>
              <p className="text-muted-foreground">
                Spaced repetition system (SRS) with topical decks to maximize retention and recall.
              </p>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-lg-custom transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                AI Chatbot
                <ProBadge className="ml-2" />
              </h3>
              <p className="text-muted-foreground">
                Practice workplace conversations with AI-powered role-play scenarios and instant pronunciation feedback.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Bảng Dịch Vụ
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chọn gói phù hợp với nhu cầu học tập của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8 shadow-card">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Gói miễn phí</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">0 VNĐ</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8 min-h-[200px]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Truy cập các bài giảng, bài tập ngữ pháp, từ vựng</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Truy cập 5 Module Email cơ bản</span>
                </li>
              </ul>
              
              <Link to="/placement-test" className="block">
                <Button variant="outline" className="w-full">
                  Bắt đầu miễn phí
                </Button>
              </Link>
            </Card>

            {/* Basic Plan */}
            <Card className="p-8 shadow-lg-custom border-2 border-accent">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Gói cơ bản</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">179,000 VNĐ</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">/tháng</p>
              </div>
              
              <ul className="space-y-3 mb-8 min-h-[200px]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Truy cập 10 Module Email cơ bản</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Luyện tập AI có giới hạn (5 lần/ngày)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Phản hồi cơ bản (sửa lỗi ngữ pháp/phát âm)</span>
                </li>
              </ul>
              
              <Link to="/ai-chatbot" className="block">
                <Button className="w-full">
                  Chọn gói cơ bản
                </Button>
              </Link>
            </Card>

            {/* Premium Plan */}
            <Card className="p-8 shadow-lg-custom border-2 border-primary relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <ProBadge />
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Gói cao cấp</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">1,990,000 VNĐ</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">/năm</p>
              </div>
              
              <ul className="space-y-3 mb-8 min-h-[200px]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Luyện tập AI không giới hạn</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Phản hồi chuyên sâu</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Hỗ trợ bộ công cụ kỹ năng mềm</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span>Báo cáo tiến độ chi tiết</span>
                </li>
              </ul>
              
              <Link to="/ai-chatbot" className="block">
                <Button className="w-full">
                  Chọn gói cao cấp
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 text-center gradient-card border-primary/20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take the placement test now and get your personalized learning path in minutes.
            </p>
            <Link to="/placement-test">
              <Button size="lg">
                <TrendingUp className="mr-2 h-5 w-5" />
                Begin Placement Test
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold">BizTalk</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 BizTalk. Empowering English learners worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
