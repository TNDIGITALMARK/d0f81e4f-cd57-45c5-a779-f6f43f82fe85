'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFoodsByCategory, FoodItem } from '@/lib/foodDatabase';

/**
 * Page 1: Meal Input Dashboard
 * Interactive meal selection interface with dropdown menus for each meal category
 */
export default function NutritionPage() {
  const router = useRouter();
  const [meals, setMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    snack: ''
  });
  const [isCalculating, setIsCalculating] = useState(false);

  const breakfastFoods = getFoodsByCategory('breakfast');
  const lunchFoods = getFoodsByCategory('lunch');
  const dinnerFoods = getFoodsByCategory('dinner');
  const snackFoods = getFoodsByCategory('snack');

  const handleMealChange = (category: keyof typeof meals, value: string) => {
    setMeals(prev => ({ ...prev, [category]: value }));
  };

  const handleCalculate = () => {
    const selectedMeals = Object.values(meals).filter(m => m !== '');

    if (selectedMeals.length === 0) {
      alert('Please select at least one meal to calculate nutrition and waste!');
      return;
    }

    setIsCalculating(true);

    // Store meals in sessionStorage for results page
    sessionStorage.setItem('selectedMeals', JSON.stringify(meals));

    // Simulate calculation with animation
    setTimeout(() => {
      router.push('/nutrition/results');
    }, 800);
  };

  const hasMeals = Object.values(meals).some(m => m !== '');

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            🌱 AI Food & Nutrition Waste Reducer
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Enter your meals to see nutrition info, estimated food waste, and healthy alternatives
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap text-sm">
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
              🟢 Green = Healthy / Low Waste
            </span>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
              🟡 Yellow = Moderate
            </span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">
              🔴 Red = High Calories / High Waste
            </span>
          </div>
        </header>

        {/* Meal Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Breakfast */}
          <MealCard
            title="🌅 Breakfast"
            description="Start your day right"
            foods={breakfastFoods}
            selectedValue={meals.breakfast}
            onChange={(value) => handleMealChange('breakfast', value)}
          />

          {/* Lunch */}
          <MealCard
            title="🍛 Lunch"
            description="Midday nutrition"
            foods={lunchFoods}
            selectedValue={meals.lunch}
            onChange={(value) => handleMealChange('lunch', value)}
          />

          {/* Dinner */}
          <MealCard
            title="🌙 Dinner"
            description="Evening meal"
            foods={dinnerFoods}
            selectedValue={meals.dinner}
            onChange={(value) => handleMealChange('dinner', value)}
          />

          {/* Snacks */}
          <MealCard
            title="🍿 Snacks"
            description="Healthy munchies"
            foods={snackFoods}
            selectedValue={meals.snack}
            onChange={(value) => handleMealChange('snack', value)}
          />
        </div>

        {/* Calculate Button */}
        <div className="text-center animate-fadeIn">
          <button
            onClick={handleCalculate}
            disabled={isCalculating || !hasMeals}
            className={`
              px-12 py-5 text-xl font-bold rounded-2xl shadow-lg
              transition-all duration-300 transform
              ${
                isCalculating || !hasMeals
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-xl'
              }
            `}
          >
            {isCalculating ? (
              <span className="flex items-center gap-3">
                <span className="animate-pulse">🔄</span>
                Calculating...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <span>🧮</span>
                Calculate Nutrition & Waste
              </span>
            )}
          </button>

          {!hasMeals && (
            <p className="mt-4 text-gray-500 text-sm">
              Select at least one meal to get started
            </p>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon="🎯"
            title="Track Nutrition"
            description="Get detailed breakdown of calories, protein, carbs, and fats for each meal"
          />
          <InfoCard
            icon="♻️"
            title="Reduce Waste"
            description="See estimated food waste and learn tips to minimize environmental impact"
          />
          <InfoCard
            icon="🤖"
            title="AI Suggestions"
            description="Receive personalized recommendations for healthier alternatives"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Meal Card Component - Dropdown selector for each meal category
 */
function MealCard({
  title,
  description,
  foods,
  selectedValue,
  onChange
}: {
  title: string;
  description: string;
  foods: FoodItem[];
  selectedValue: string;
  onChange: (value: string) => void;
}) {
  const selectedFood = foods.find(f => f.id === selectedValue);

  return (
    <div className="card animate-slideIn">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="space-y-3">
        <label className="text-xs">Select Food Item</label>
        <select
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-base"
        >
          <option value="">-- Choose --</option>
          {foods.map((food) => (
            <option key={food.id} value={food.id}>
              {food.displayName}
            </option>
          ))}
        </select>

        {/* Nutrition Preview */}
        {selectedFood && (
          <div
            className={`
              mt-4 p-3 rounded-lg text-sm transition-all duration-300
              ${
                selectedFood.healthScore === 'healthy'
                  ? 'status-healthy'
                  : selectedFood.healthScore === 'moderate'
                  ? 'status-moderate'
                  : 'status-high'
              }
            `}
          >
            <div className="font-semibold mb-2 flex items-center gap-2">
              {selectedFood.healthScore === 'healthy' && '🟢 Healthy Choice'}
              {selectedFood.healthScore === 'moderate' && '🟡 Moderate'}
              {selectedFood.healthScore === 'high' && '🔴 High Calories'}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Calories: {selectedFood.nutrition.calories}</div>
              <div>Protein: {selectedFood.nutrition.protein}g</div>
              <div>Carbs: {selectedFood.nutrition.carbs}g</div>
              <div>Fats: {selectedFood.nutrition.fats}g</div>
            </div>
            <div className="mt-2 text-xs opacity-80">
              Waste: {selectedFood.waste}g
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Info Card Component - Educational information cards
 */
function InfoCard({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
