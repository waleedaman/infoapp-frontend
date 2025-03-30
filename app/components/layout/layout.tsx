import React, { useState } from 'react';
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Card from './ui/Card';

type Message = {
  role: 'user' | 'system' | 'loading';
  content: string;
};

interface DashboardProps {
  name: string;
  location: string;
  destination: string;
  travelReason: string;
}

const Dashboard = (DashboardProps: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'Welcome to your travel assistance. How can I help you?' }
  ]);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

  // User and travel information (would be fetched from backend in a real app)
  const name = DashboardProps.name;
  const location = DashboardProps.location;
  const destination = DashboardProps.destination;
  const travelReason = DashboardProps.travelReason;

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Dynamic images based on travel details
  const getDestinationImage = () => {
    const normalizedDest = destination.toLowerCase();
    if (normalizedDest.includes('berlin')) return 'https://plus.unsplash.com/premium_vector-1723730925229-3c0e92f2ba78?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    if (normalizedDest.includes('paris')) return 'https://plus.unsplash.com/premium_vector-1697729516485-7dd1c98bfac5?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    if (normalizedDest.includes('amsterdam')) return 'https://plus.unsplash.com/premium_vector-1716196830065-10c4f321a025?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    if (normalizedDest.includes('lahore')) return 'https://plus.unsplash.com/premium_vector-1729264578798-6c7f043e6425?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    if (normalizedDest.includes('beijing')) return 'https://plus.unsplash.com/premium_vector-1730038645427-f82f741a86c0?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    if (normalizedDest.includes('delhi')) return 'https://plus.unsplash.com/premium_vector-1720277559446-52fb4dff1420?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    return 'https://plus.unsplash.com/premium_vector-1718388092748-68f3b747ac7d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  };

  const getLocationImage = () => {
    const normalizedLoc = location.toLowerCase();
    if (normalizedLoc.includes('berlin')) return 'https://plus.unsplash.com/premium_vector-1723730925229-3c0e92f2ba78?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    if (normalizedLoc.includes('paris')) return 'https://plus.unsplash.com/premium_vector-1697729516485-7dd1c98bfac5?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    if (normalizedLoc.includes('amsterdam')) return 'https://plus.unsplash.com/premium_vector-1716196830065-10c4f321a025?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    if (normalizedLoc.includes('lahore')) return 'https://plus.unsplash.com/premium_vector-1729264578798-6c7f043e6425?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    if (normalizedLoc.includes('beijing')) return 'https://plus.unsplash.com/premium_vector-1730038645427-f82f741a86c0?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    if (normalizedLoc.includes('delhi')) return 'https://plus.unsplash.com/premium_vector-1720277559446-52fb4dff1420?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    return 'https://images.unsplash.com/vector-1738932609148-bf277e122443?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  };
  
  const cards = [
    {
      title: "Before Travelling",
      content: "This section will help you prepare for travel, apply for travel documents and any other things you need to prepare.",
      image: getLocationImage(),
      animation: 'animate-float',
      items: ['Passport validity check', 'Visa documents', 'Travel insurance', 'Vaccination records']
    },
    {
      title: "During Travel",
      content: "This section will guide you through your travels, airport maps and layovers and what you need to be aware of.",
      image: 'https://plus.unsplash.com/premium_vector-1717672655490-b1d52b0ca7c5?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      animation: 'animate-float',
      items: ['Flight status', 'Airport maps', 'Layovers', 'Travel alerts']
    },
    {
      title: "After Arrival",
      content: `This section will help you once you arrive to find hotels, register for events, and based on your reason (${travelReason}) help with necessary accommodations.`,
      image: getDestinationImage(),
      animation: 'animate-float',
      items: ['Hotel booking', 'Event registration', 'Accommodation arrangements']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const userMessage = { role: 'user', content: message };
    setMessages([...messages, userMessage]);
    setMessage('');

    const loadingMessage = { role: 'loading', content: '' };
    setMessages(prev => [...prev, loadingMessage]);

    setTimeout(() => {
      setMessages(prev => {
        const filteredMessages = prev.filter(m => m.role !== 'loading');
        return [
          ...filteredMessages,
          {
            role: 'system',
            content: `Thanks for your message about ${destination}. Our team will help you with your ${travelReason} trip.`
          }
        ];
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            <span className="text-green-500 dark:text-green-300">Travel</span>Companion
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-600 dark:text-green-200 font-medium">
              {name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-5xl text-green-500 dark:text-green-300 mb-2">{getGreeting()}, {name}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Planning your {travelReason} trip from <span className="font-medium">{location}</span> to <span className="font-medium">{destination}</span>
          </p>
        </section>

        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex space-x-8">
            {['overview', 'documents', 'timeline'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-green-500 dark:border-green-300 text-green-600 dark:text-green-300'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className='flex flex-[1,1,auto] flex-col space-y-8'>
            <div className="flex-1 flex flex-row space-x-4">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  className="dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => setExpandedCardIndex(expandedCardIndex === index ? null : index)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{card.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{card.content}</p>
                    
                    {expandedCardIndex === index && (
                <div className="mt-4 space-y-4 relative pl-8 animate-fade-in">
                  {card.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="relative">
                      {/* Vertical connector line */}
                      {itemIndex !== card.items.length - 1 && (
                        <div className="absolute left-4 top-6 w-px h-[calc(100%+1rem)] bg-green-500"/>
                      )}
                      <div className="flex items-center gap-4">
                        {/* Bullet */}
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center z-10">
                          <span className="text-gray-900 font-bold">{itemIndex + 1}</span>
                        </div>
                        {/* Pill */}
                        <div className="bg-gray-700 rounded-full hover:bg-green-100 px-6 py-3 text-gray-300 hover:text-gray-900 transition-colors duration-300" >
                          <p>{item}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
                  </div>
                </Card>
              ))}
            </div>

            {/* AI Assistant Section */}
            <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                AI Assistant
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                I'm your AI travel companion. I can answer questions and help you prepare required documents for your trip.
              </p>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-inner p-4">
                <div className="h-64 overflow-y-auto mb-4 space-y-4 px-2">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-green-100 dark:bg-green-900 ml-auto max-w-[80%] text-gray-800 dark:text-white'
                          : 'bg-gray-100 dark:bg-gray-800 mr-auto max-w-[80%] text-gray-800 dark:text-white'
                      }`}
                    >
                      {msg.role === 'loading' ? (
                        <div className="flex items-center gap-2">
                          <ArrowPathIcon className="h-5 w-5 animate-spin text-green-500" />
                          <span className="bg-gradient-to-r from-green-500 via-green-400 to-green-500 bg-[length:200%_100%] animate-shimmer bg-clip-text text-transparent">
                            Awaiting response...
                          </span>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    placeholder="Ask me anything about your trip..."
                  />
                  <button 
                    type="submit" 
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-300"
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;