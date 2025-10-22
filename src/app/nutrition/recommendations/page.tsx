'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateAISuggestions, getWasteReductionTips, analyzeMeals, getNutritionBalance, Suggestion } from '@/lib/aiSuggestions';
import { getFoodById } from '@/lib/foodDatabase';

/**
 * Page 3: AI Recommendations Hub
 * Display personalized AI-generated suggestions for healthier alternatives and waste reduction
 */
export default function RecommendationsPage() {
  const router = useRouter();
  const [meals, setMeals] = useState<{ breakfast?: string; lunch?: string; dinner?: string; snack?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedMeals = sessionStorage.getItem('selectedMeals');
    if (!storedMeals) {
      router.push('/nutrition');
      return;
    }

    setMeals(JSON.parse(storedMeals));
    setIsLoading(false);
  }, [router]);

  if (isLoading || !meals) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🤖</div>
          <p className="text-xl font-semibold">Generating AI recommendations...</p>
        </div>
      </div>
    );
  }

  const suggestions = generateAISuggestions(meals);
  const analysis = analyzeMeals(meals);
  const wasteTips = getWasteReductionTips(analysis.totalWaste);
  const nutritionBalance = getNutritionBalance(analysis);

  // Group suggestions by priority
  const highPriority = suggestions.filter(s => s.priority === 'high');
  const mediumPriority = suggestions.filter(s => s.priority === 'medium');
  const lowPriority = suggestions.filter(s => s.priority === 'low');

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 animate-fadeIn">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🤖 AI Recommendations
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Personalized suggestions for healthier choices and sustainable eating habits
          </p>
        </header>

        {/* Nutrition Balance Overview */}
        <div className="card mb-8 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>📊</span>
            Nutrition Balance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BalanceCard
              nutrient="Protein"
              percentage={nutritionBalance.protein.percentage}
              status={nutritionBalance.protein.status}
              icon="💪"
              color="blue"
            />
            <BalanceCard
              nutrient="Carbohydrates"
              percentage={nutritionBalance.carbs.percentage}
              status={nutritionBalance.carbs.status}
              icon="🍚"
              color="yellow"
            />
            <BalanceCard
              nutrient="Fats"
              percentage={nutritionBalance.fats.percentage}
              status={nutritionBalance.fats.status}
              icon="🥑"
              color="red"
            />
          </div>
        </div>

        {/* High Priority Suggestions */}
        {highPriority.length > 0 && (
          <div className="mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>🚨</span>
              High Priority Recommendations
            </h2>
            <div className="space-y-4">
              {highPriority.map((suggestion, index) => (
                <SuggestionCard key={index} suggestion={suggestion} />
              ))}
            </div>
          </div>
        )}

        {/* Medium Priority Suggestions */}
        {mediumPriority.length > 0 && (
          <div className="mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>⚡</span>
              Moderate Priority Recommendations
            </h2>
            <div className="space-y-4">
              {mediumPriority.map((suggestion, index) => (
                <SuggestionCard key={index} suggestion={suggestion} />
              ))}
            </div>
          </div>
        )}

        {/* Low Priority / Positive Feedback */}
        {lowPriority.length > 0 && (
          <div className="mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>✨</span>
              Positive Feedback & Tips
            </h2>
            <div className="space-y-4">
              {lowPriority.map((suggestion, index) => (
                <SuggestionCard key={index} suggestion={suggestion} />
              ))}
            </div>
          </div>
        )}

        {/* Waste Reduction Tips */}
        <div className="card mb-8 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>♻️</span>
            Waste Reduction Strategies
          </h2>
          <ul className="space-y-3">
            {wasteTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Meal Summary */}
        <div className="card mb-8 animate-fadeIn bg-gradient-to-br from-blue-50 to-purple-50">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🍽️</span>
            Today's Meal Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(meals).map(([mealType, foodId]) => {
              if (!foodId) return null;
              const food = getFoodById(foodId);
              if (!food) return null;

              return (
                <div key={mealType} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm font-semibold text-gray-500 uppercase mb-1">{mealType}</div>
                  <div className="text-sm font-medium">{food.displayName}</div>
                  <div className="text-xs text-gray-600 mt-2">
                    {food.nutrition.calories} cal • {food.waste}g waste
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 animate-fadeIn">
          <Link
            href="/nutrition/results"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <span>📊</span>
              Back to Results
            </span>
          </Link>
          <Link
            href="/nutrition"
            className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <span>🔄</span>
              Start Over
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Balance Card Component
 */
function BalanceCard({
  nutrient,
  percentage,
  status,
  icon,
  color
}: {
  nutrient: string;
  percentage: number;
  status: 'low' | 'good' | 'high';
  icon: string;
  color: string;
}) {
  const statusConfig = {
    low: { text: 'Too Low', bg: 'bg-yellow-100', border: 'border-yellow-400', text_color: 'text-yellow-700' },
    good: { text: 'Balanced ✓', bg: 'bg-green-100', border: 'border-green-400', text_color: 'text-green-700' },
    high: { text: 'Too High', bg: 'bg-red-100', border: 'border-red-400', text_color: 'text-red-700' }
  };

  const config = statusConfig[status];

  return (
    <div className={`p-5 rounded-xl border-2 ${config.border} ${config.bg} transition-all hover:scale-105`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold mb-1">{percentage}%</div>
      <div className="text-sm font-semibold mb-2">{nutrient}</div>
      <div className={`text-xs font-bold ${config.text_color}`}>{config.text}</div>
    </div>
  );
}

/**
 * Suggestion Card Component
 */
function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const typeConfig = {
    health: { icon: '🏥', color: 'border-red-200 bg-red-50' },
    waste: { icon: '♻️', color: 'border-green-200 bg-green-50' },
    nutrition: { icon: '🥗', color: 'border-blue-200 bg-blue-50' },
    alternative: { icon: '🔄', color: 'border-purple-200 bg-purple-50' }
  };

  const priorityConfig = {
    high: { badge: '🚨 High Priority', badgeClass: 'bg-red-500 text-white' },
    medium: { badge: '⚡ Medium Priority', badgeClass: 'bg-yellow-500 text-white' },
    low: { badge: '✨ Tip', badgeClass: 'bg-blue-500 text-white' }
  };

  const config = typeConfig[suggestion.type];
  const priority = priorityConfig[suggestion.priority];

  return (
    <div className={`card border-2 ${config.color} hover:scale-[1.02] transition-all`}>
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{config.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${priority.badgeClass}`}>
              {priority.badge}
            </span>
            <span className="text-xs text-gray-500 uppercase font-semibold">{suggestion.type}</span>
          </div>
          <p className="text-gray-800 leading-relaxed">{suggestion.message}</p>
        </div>
      </div>
    </div>
  );
}
