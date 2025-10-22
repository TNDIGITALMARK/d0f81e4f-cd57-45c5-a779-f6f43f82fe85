'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getFoodById, FoodItem } from '@/lib/foodDatabase';
import { analyzeMeals } from '@/lib/aiSuggestions';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Page 2: Results & Analytics
 * Display nutrition analysis, waste estimation, and interactive charts
 */
export default function ResultsPage() {
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
          <div className="text-6xl mb-4 animate-pulse">🔄</div>
          <p className="text-xl font-semibold">Loading your results...</p>
        </div>
      </div>
    );
  }

  const analysis = analyzeMeals(meals);
  const mealEntries = Object.entries(meals).filter(([_, foodId]) => foodId) as [string, string][];

  // Prepare data for pie chart (nutrient distribution)
  const pieData = [
    { name: 'Protein', value: analysis.totalProtein * 4, fill: '#3b82f6' },
    { name: 'Carbs', value: analysis.totalCarbs * 4, fill: '#f59e0b' },
    { name: 'Fats', value: analysis.totalFats * 9, fill: '#ef4444' }
  ];

  // Prepare data for bar chart (waste by meal)
  const wasteData = mealEntries.map(([mealType, foodId]) => {
    const food = getFoodById(foodId);
    return {
      meal: mealType.charAt(0).toUpperCase() + mealType.slice(1),
      waste: food?.waste || 0,
      fill: getWasteColor(food?.waste || 0)
    };
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            📊 Your Nutrition & Waste Analysis
          </h1>
          <p className="text-lg text-gray-700">
            Here's a comprehensive breakdown of your daily meals
          </p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <SummaryCard
            label="Total Calories"
            value={analysis.totalCalories}
            unit="kcal"
            color={getCalorieColor(analysis.totalCalories)}
            icon="🔥"
          />
          <SummaryCard
            label="Total Protein"
            value={analysis.totalProtein}
            unit="g"
            color="blue"
            icon="💪"
          />
          <SummaryCard
            label="Total Waste"
            value={analysis.totalWaste}
            unit="g"
            color={getWasteColorName(analysis.totalWaste)}
            icon="♻️"
          />
          <SummaryCard
            label="Meals Tracked"
            value={analysis.mealCount}
            unit="meals"
            color="purple"
            icon="🍽️"
          />
        </div>

        {/* Meal-wise Table */}
        <div className="card mb-8 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-6">Meal-wise Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="pb-3 pr-4 font-semibold">Meal</th>
                  <th className="pb-3 pr-4 font-semibold">Food Item</th>
                  <th className="pb-3 pr-4 font-semibold text-right">Calories</th>
                  <th className="pb-3 pr-4 font-semibold text-right">Protein</th>
                  <th className="pb-3 pr-4 font-semibold text-right">Carbs</th>
                  <th className="pb-3 pr-4 font-semibold text-right">Fats</th>
                  <th className="pb-3 pr-4 font-semibold text-right">Waste</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {mealEntries.map(([mealType, foodId]) => {
                  const food = getFoodById(foodId);
                  if (!food) return null;

                  return (
                    <tr key={mealType} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 pr-4 font-semibold capitalize">{mealType}</td>
                      <td className="py-4 pr-4">{food.displayName}</td>
                      <td className="py-4 pr-4 text-right">{food.nutrition.calories}</td>
                      <td className="py-4 pr-4 text-right">{food.nutrition.protein}g</td>
                      <td className="py-4 pr-4 text-right">{food.nutrition.carbs}g</td>
                      <td className="py-4 pr-4 text-right">{food.nutrition.fats}g</td>
                      <td className="py-4 pr-4 text-right">{food.waste}g</td>
                      <td className="py-4">
                        <HealthBadge healthScore={food.healthScore} />
                      </td>
                    </tr>
                  );
                })}
                <tr className="font-bold bg-gray-50">
                  <td className="py-4 pr-4" colSpan={2}>TOTAL</td>
                  <td className="py-4 pr-4 text-right">{analysis.totalCalories}</td>
                  <td className="py-4 pr-4 text-right">{analysis.totalProtein}g</td>
                  <td className="py-4 pr-4 text-right">{analysis.totalCarbs}g</td>
                  <td className="py-4 pr-4 text-right">{analysis.totalFats}g</td>
                  <td className="py-4 pr-4 text-right">{analysis.totalWaste}g</td>
                  <td className="py-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart - Nutrient Distribution */}
          <div className="card animate-fadeIn">
            <h3 className="text-xl font-bold mb-6">Nutrient Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value.toFixed(0)} cal`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Protein ({analysis.totalProtein}g)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>Carbs ({analysis.totalCarbs}g)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Fats ({analysis.totalFats}g)</span>
              </div>
            </div>
          </div>

          {/* Bar Chart - Food Waste */}
          <div className="card animate-fadeIn">
            <h3 className="text-xl font-bold mb-6">Food Waste by Meal</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="meal" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: 'Waste (g)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value: number) => `${value}g`} />
                <Bar dataKey="waste" radius={[8, 8, 0, 0]}>
                  {wasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm text-center text-gray-600">
              Total waste: {analysis.totalWaste}g • {getWasteMessage(analysis.totalWaste)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 animate-fadeIn">
          <Link
            href="/nutrition/recommendations"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <span>🤖</span>
              View AI Recommendations
            </span>
          </Link>
          <Link
            href="/nutrition"
            className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <span>🔄</span>
              Try Different Meals
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Summary Card Component
 */
function SummaryCard({
  label,
  value,
  unit,
  color,
  icon
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
  icon: string;
}) {
  const colorClasses = {
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div className={`card bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} text-white`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-bold mb-1">
        {value}{unit !== 'meals' && unit !== 'kcal' && <span className="text-lg ml-1">{unit}</span>}
      </div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  );
}

/**
 * Health Badge Component
 */
function HealthBadge({ healthScore }: { healthScore: FoodItem['healthScore'] }) {
  const badges = {
    healthy: { text: '🟢 Healthy', className: 'bg-green-100 text-green-700' },
    moderate: { text: '🟡 Moderate', className: 'bg-yellow-100 text-yellow-700' },
    high: { text: '🔴 High', className: 'bg-red-100 text-red-700' }
  };

  const badge = badges[healthScore];

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
      {badge.text}
    </span>
  );
}

/**
 * Helper functions for color coding
 */
function getCalorieColor(calories: number): string {
  if (calories < 1500) return 'green';
  if (calories < 2200) return 'yellow';
  return 'red';
}

function getWasteColor(waste: number): string {
  if (waste < 20) return '#10b981'; // green
  if (waste < 35) return '#f59e0b'; // yellow
  return '#ef4444'; // red
}

function getWasteColorName(waste: number): string {
  if (waste < 80) return 'green';
  if (waste < 120) return 'yellow';
  return 'red';
}

function getWasteMessage(waste: number): string {
  if (waste < 80) return 'Excellent! Low waste generation 🌟';
  if (waste < 120) return 'Good effort, can improve further 👍';
  return 'High waste, consider reduction strategies ⚠️';
}
