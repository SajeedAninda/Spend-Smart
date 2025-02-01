import React, { useState } from 'react';

const Benefits = () => {
  const [activeTab, setActiveTab] = useState('transactions');

  const tabs = [
    { id: 'transactions', label: 'Transaction Tracking' },
    { id: 'budgeting', label: 'Smart Budgeting' },
    { id: 'piggy-bank', label: 'Piggy Bank & Savings' },
    { id: 'recurring-bills', label: 'Recurring Bills Management' },
  ];

  const benefits = {
    transactions: {
      title: 'Track Every Transaction with Ease',
      description: 'Monitor your spending habits, categorize expenses, and gain insights to make better financial decisions.',
      points: ['Real-time tracking', 'Detailed expense breakdown', 'Custom spending categories'],
    },
    budgeting: {
      title: 'Take Full Control of Your Budget',
      description: 'Create personalized budgets, track expenses against them, and ensure financial stability with insights.',
      points: ['Custom budgets', 'Spending insights', 'Alerts for overspending'],
    },
    'piggy-bank': {
      title: 'Save Smarter with Piggy Banks',
      description: 'Set up savings goals, allocate funds for specific needs, and grow your financial reserves efficiently.',
      points: ['Dedicated savings pots', 'Easy add/withdraw', 'Goal-based tracking'],
    },
    'recurring-bills': {
      title: 'Never Miss a Bill Payment Again',
      description: 'Manage your recurring expenses, automate payments, and avoid late fees effortlessly.',
      points: ['Bill reminders', 'Automated payments', 'Expense forecasting'],
    },
  };

  return (
    <section className="pb-32">
      <div className="w-[1000px] mx-auto flex max-w-screen-md flex-col items-center gap-6">
        <h2 className="mb-4 text-center text-3xl font-semibold lg:text-5xl">
          Benefits of Spend Smart
        </h2>
        <p className="text-center text-zinc-600 lg:text-2xl">
          Discover How Smarter Spending Can Help You Save More, Budget Better, and Achieve Financial Freedom
        </p>
      </div>

      {/* Tab Buttons */}
      <div className="mt-12 flex justify-center">
        <div className="flex flex-wrap gap-2 rounded-md bg-zinc-100 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium text-sm md:text-base transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeTab === tab.id
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-zinc-600 hover:bg-white'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Benefits Content */}
      <div className="mt-12 max-w-screen-lg mx-auto">
        <h3 className="mb-4 text-2xl font-semibold md:text-4xl">{benefits[activeTab].title}</h3>
        <p className="text-xl text-zinc-600">{benefits[activeTab].description}</p>
        <ul className="mt-8 grid grid-cols-1 gap-2 lg:grid-cols-2">
          {benefits[activeTab].points.map((point, index) => (
            <li key={index} className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-check w-4"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <span className="font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
