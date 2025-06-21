"use client";

import { 
  FileText, 
  Brain, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Star, 
  Upload, 
  Zap, 
  BarChart3, 
  MessageSquare,
  ArrowRight,
  Play,
  Users,
  Shield,
  Globe
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">ResumeSense</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">How it Works</a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="/auth" className="text-slate-600 hover:text-slate-900 transition-colors">Sign In</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/auth" className="hidden sm:inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
                Sign In
              </a>
              <a href="/auth" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              <Star className="w-4 h-4 mr-2" />
              Powered by Gemini AI
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Transform Your Resume with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI-Powered Insights</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Upload your resume and get instant analysis with skill matching, quality scoring, 
              and personalized improvement suggestions powered by advanced AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/auth" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl">
                Start Analyzing
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <button className="inline-flex items-center px-8 py-4 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-lg font-semibold">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>
          
          {/* Hero Image/Preview */}
          <div className="relative mt-16">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Upload Resume</h3>
                      <p className="text-slate-600">PDF or DOCX format</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">AI Analysis</h3>
                      <p className="text-slate-600">Gemini AI processes your content</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Get Insights</h3>
                      <p className="text-slate-600">Detailed analysis & recommendations</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Resume Score</span>
                      <span className="text-2xl font-bold text-green-600">85/100</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white rounded-lg p-3">
                        <div className="font-semibold text-slate-900">Skill Match</div>
                        <div className="text-green-600 font-bold">92%</div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="font-semibold text-slate-900">Keywords</div>
                        <div className="text-blue-600 font-bold">15 found</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Perfect Your Resume
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive analysis and actionable insights 
              to help you stand out in today&apos;s competitive job market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Skill Match Analysis</h3>
              <p className="text-slate-600">
                Compare your skills with specific job roles and see how well you align with industry requirements.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Quality Score</h3>
              <p className="text-slate-600">
                Get a comprehensive score based on content, formatting, and overall presentation quality.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Smart Suggestions</h3>
              <p className="text-slate-600">
                Receive personalized recommendations for content improvement and optimization.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Keyword Density</h3>
              <p className="text-slate-600">
                Analyze keyword usage and optimize for ATS (Applicant Tracking Systems).
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Grammar & Format</h3>
              <p className="text-slate-600">
                Catch grammar errors and get formatting suggestions for professional presentation.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Instant Results</h3>
              <p className="text-slate-600">
                Get comprehensive analysis in seconds with our advanced AI processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How ResumeSense Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Three simple steps to transform your resume with AI-powered insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Upload Your Resume</h3>
              <p className="text-slate-600">
                Simply drag and drop your PDF or DOCX resume file. Our secure platform ensures your data stays private.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">AI Analysis</h3>
              <p className="text-slate-600">
                Our Gemini AI analyzes your resume for skills, keywords, formatting, and provides comprehensive insights.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Get Results</h3>
              <p className="text-slate-600">
                Receive detailed analysis with scores, suggestions, and actionable recommendations to improve your resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs. No hidden fees, cancel anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Free</h3>
                <div className="text-4xl font-bold text-slate-900 mb-2">$0</div>
                <p className="text-slate-600">Perfect for trying out</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-600">1 resume analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-600">Basic insights</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-600">Grammar check</span>
                </li>
              </ul>
              <a href="/auth" className="w-full inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                Get Started Free
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-2">$9.99</div>
                <p className="text-blue-100">per month</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Unlimited analyses</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Advanced insights</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Skill matching</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Keyword optimization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Priority support</span>
                </li>
              </ul>
              <a href="/auth" className="w-full inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Start Pro Trial
              </a>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-slate-900 mb-2">Custom</div>
                <p className="text-slate-600">For teams & organizations</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-600">Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-600">Team management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-600">API access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-600">Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-600">Dedicated support</span>
                </li>
              </ul>
              <a href="/auth" className="w-full inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have improved their resumes with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/auth" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold">
              Start Free Analysis
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <button className="inline-flex items-center px-8 py-4 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors text-lg font-semibold">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ResumeSense</span>
              </div>
              <p className="text-slate-400 mb-4">
                AI-powered resume analysis to help you land your dream job.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Shield className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 ResumeSense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
