import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Check, 
  Zap, 
  Calendar,
  Bot,
  Twitter,
  Mail,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Star,
  Crown,
  Flame,
  Terminal,
  ArrowLeft
} from 'lucide-react';

function PricingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const features = [
    {
      icon: Bot,
      title: "AI Tweet Generation",
      description: "Transform journal entries into engaging tweets automatically",
      color: "text-cyan-400"
    },
    {
      icon: Clock,
      title: "Custom Time Slots",
      description: "Schedule up to 5 daily tweet generation times",
      color: "text-pink-400"
    },
    {
      icon: TrendingUp,
      title: "Trending Topic Integration",
      description: "AI suggestions based on GitHub, HN, and Product Hunt trends",
      color: "text-yellow-400"
    },
    {
      icon: Twitter,
      title: "Direct X Integration",
      description: "Post directly to X (Twitter) with one click",
      color: "text-blue-400"
    },
    {
      icon: Mail,
      title: "Email Delivery",
      description: "Get tweet suggestions delivered to your inbox",
      color: "text-green-400"
    },
    {
      icon: Sparkles,
      title: "AI Edit & Refinement",
      description: "Refine tweets with custom AI prompts",
      color: "text-purple-400"
    },
    {
      icon: Calendar,
      title: "Journal Calendar",
      description: "Visual calendar to track your journaling progress",
      color: "text-orange-400"
    },
    {
      icon: Zap,
      title: "Unlimited Generations",
      description: "No limits on tweet suggestions or journal entries",
      color: "text-red-400"
    }
  ];

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 12,
      period: 'month',
      description: 'Perfect for trying out the full experience',
      badge: null,
      features: features,
      cta: 'Start Monthly Plan',
      popular: false
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: 100,
      originalPrice: 144,
      period: 'year',
      monthlyEquivalent: 10,
      description: 'Best value - 2 months free!',
      badge: 'BEST VALUE',
      features: features,
      cta: 'Start Yearly Plan',
      popular: true
    }
  ];

  const handlePlanSelect = (planId: string) => {
    // Here you would integrate with your payment processor
    console.log('Selected plan:', planId);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-300"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-xl flex items-center justify-center">
              <Terminal className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent font-mono">
              JournalToTweet
            </span>
          </Link>
          
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="text-white">Simple </span>
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Turn your dev journal into viral tweets. No free plan because we believe in the value we provide.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-1 flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 relative ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                  Save 30%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => {
              const isActive = billingCycle === plan.id;
              const isHovered = hoveredPlan === plan.id;
              
              return (
                <div
                  key={plan.id}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  className={`relative transition-all duration-500 ${
                    isActive ? 'scale-105' : 'scale-100'
                  } ${isHovered ? 'scale-105' : ''}`}
                >
                  {/* Animated border */}
                  <div className={`absolute -inset-1 rounded-2xl transition-all duration-500 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500 opacity-75 blur-sm'
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 opacity-50 blur-sm'
                  } ${isHovered ? 'opacity-100 blur-md' : ''}`}></div>
                  
                  {/* Card */}
                  <div className={`relative bg-gray-900 border rounded-2xl p-8 h-full ${
                    plan.popular 
                      ? 'border-cyan-500/50' 
                      : 'border-gray-700'
                  }`}>
                    {/* Badge */}
                    {plan.badge && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                          <Crown className="w-4 h-4" />
                          <span>{plan.badge}</span>
                        </div>
                      </div>
                    )}

                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                      
                      {/* Price */}
                      <div className="mb-6">
                        {plan.originalPrice && (
                          <div className="text-gray-500 text-lg line-through mb-1">
                            ${plan.originalPrice}
                          </div>
                        )}
                        <div className="flex items-baseline justify-center space-x-1">
                          <span className="text-5xl font-black text-white">${plan.price}</span>
                          <span className="text-gray-400">/{plan.period}</span>
                        </div>
                        {plan.monthlyEquivalent && (
                          <div className="text-cyan-400 text-sm mt-2">
                            Only ${plan.monthlyEquivalent}/month
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                          <div 
                            key={index} 
                            className="flex items-start space-x-3 group"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                              plan.popular ? 'bg-cyan-500/20' : 'bg-gray-800'
                            }`}>
                              <Icon className={`w-3 h-3 ${feature.color}`} />
                            </div>
                            <div>
                              <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                              <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:scale-105 shadow-lg hover:shadow-cyan-500/25'
                          : 'bg-gray-800 border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    {/* Money back guarantee */}
                    <div className="text-center mt-4">
                      <p className="text-xs text-gray-500">
                        30-day money-back guarantee
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-white">Everything You Need to </span>
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Go Viral
              </span>
            </h2>
            <p className="text-xl text-gray-400 font-mono">
              // All features included in both plans
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gray-800 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about JournalToTweet
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Why no free plan?",
                answer: "We believe in providing real value. Our AI infrastructure, trend monitoring, and email delivery costs money. We'd rather charge fairly than compromise on quality or bombard you with ads."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Absolutely! Cancel anytime with one click. No questions asked, no hidden fees. If you cancel within 30 days, we'll refund you completely."
              },
              {
                question: "How does the AI work?",
                answer: "Our AI analyzes your journal entries for key insights, emotions, and technical details. It then crafts tweets that sound authentically like you, while incorporating trending topics and optimal hashtags."
              },
              {
                question: "Do you store my journal entries?",
                answer: "We only store what's necessary to generate tweets. Your data is encrypted, never shared, and you can delete everything anytime. Privacy is not negotiable."
              },
              {
                question: "What if I don't like the generated tweets?",
                answer: "You can edit any tweet, ask AI to refine it with custom prompts, or regenerate completely. The AI learns from your preferences to get better over time."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
                <h3 className="text-white font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-white">Ready to Turn Your </span>
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Journal into Gold?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of developers who've already transformed their journaling into a powerful content strategy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-lg font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <div className="text-sm text-gray-500 font-mono">
                30-day money-back guarantee • No setup fees
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                JournalToTweet
              </h3>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-500 text-sm">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-pink-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-yellow-400 transition-colors flex items-center space-x-1">
                <Twitter className="w-4 h-4" />
                <span>@journaltotweet</span>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 font-mono text-sm">
              Coded in caffeine. Designed in chaos. 2025. 
              <span className="text-cyan-400 ml-2">// Made by indie devs, for indie devs</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PricingPage;