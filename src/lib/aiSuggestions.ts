/**
 * AI Food & Nutrition Waste Reducer - AI Suggestion Engine
 * Generates intelligent recommendations for healthier alternatives and waste reduction
 */

import { FoodItem, getFoodById } from './foodDatabase';

export interface Suggestion {
  type: 'health' | 'waste' | 'nutrition' | 'alternative';
  priority: 'high' | 'medium' | 'low';
  message: string;
  foodId?: string;
  category?: string;
}

export interface MealAnalysis {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalWaste: number;
  mealCount: number;
  healthyCount: number;
  moderateCount: number;
  highCount: number;
}

/**
 * Analyze meals and generate comprehensive AI suggestions
 */
export function generateAISuggestions(meals: {
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  snack?: string;
}): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const analysis = analyzeMeals(meals);

  // High calorie warnings
  if (analysis.totalCalories > 2200) {
    suggestions.push({
      type: 'health',
      priority: 'high',
      message: `Your daily intake is ${analysis.totalCalories} calories, which is above the recommended 2000 calories. Consider reducing portion sizes or choosing lighter options.`
    });
  } else if (analysis.totalCalories > 2000) {
    suggestions.push({
      type: 'health',
      priority: 'medium',
      message: `Your daily intake is ${analysis.totalCalories} calories, slightly above the recommended limit. You're doing well, just watch your portions!`
    });
  }

  // Low calorie warnings
  if (analysis.totalCalories < 1200 && analysis.mealCount >= 3) {
    suggestions.push({
      type: 'nutrition',
      priority: 'high',
      message: `Your daily intake is only ${analysis.totalCalories} calories. Consider adding more nutritious foods to meet your energy needs.`
    });
  }

  // Protein recommendations
  const proteinPercentage = (analysis.totalProtein * 4 / analysis.totalCalories) * 100;
  if (proteinPercentage < 15 && analysis.totalCalories > 800) {
    suggestions.push({
      type: 'nutrition',
      priority: 'medium',
      message: `Your protein intake is low (${analysis.totalProtein}g). Add dal, paneer, eggs, or nuts to increase protein.`
    });
  } else if (proteinPercentage > 20) {
    suggestions.push({
      type: 'nutrition',
      priority: 'low',
      message: `Excellent protein intake (${analysis.totalProtein}g)! You're meeting your daily protein requirements.`
    });
  }

  // Carb recommendations
  const carbsPercentage = (analysis.totalCarbs * 4 / analysis.totalCalories) * 100;
  if (carbsPercentage > 65) {
    suggestions.push({
      type: 'nutrition',
      priority: 'medium',
      message: `Your carbohydrate intake is high (${analysis.totalCarbs}g). Consider adding more protein and vegetables for balance.`
    });
  }

  // Fat recommendations
  const fatsPercentage = (analysis.totalFats * 9 / analysis.totalCalories) * 100;
  if (fatsPercentage > 35) {
    suggestions.push({
      type: 'health',
      priority: 'high',
      message: `Your fat intake is high (${analysis.totalFats}g). Try reducing fried foods and opt for grilled or steamed alternatives.`
    });
  }

  // Waste reduction tips
  if (analysis.totalWaste > 150) {
    suggestions.push({
      type: 'waste',
      priority: 'high',
      message: `You're generating ${analysis.totalWaste}g of food waste today. Use vegetable peels for composting and practice portion control.`
    });
  } else if (analysis.totalWaste > 100) {
    suggestions.push({
      type: 'waste',
      priority: 'medium',
      message: `You're generating ${analysis.totalWaste}g of food waste. Consider meal planning to reduce waste by 30%.`
    });
  } else if (analysis.totalWaste < 80) {
    suggestions.push({
      type: 'waste',
      priority: 'low',
      message: `Great job! You're only generating ${analysis.totalWaste}g of waste today. Keep up the sustainable eating habits!`
    });
  }

  // Meal-specific suggestions
  Object.entries(meals).forEach(([mealType, foodId]) => {
    if (!foodId) return;

    const food = getFoodById(foodId);
    if (!food) return;

    // High calorie meal alternatives
    if (food.nutrition.calories > 500) {
      const alternatives = getHealthierAlternatives(food);
      if (alternatives.length > 0) {
        suggestions.push({
          type: 'alternative',
          priority: 'high',
          message: `${food.displayName} is high in calories (${food.nutrition.calories}). Try ${alternatives[0].displayName} instead to save ${food.nutrition.calories - alternatives[0].nutrition.calories} calories.`,
          foodId: food.id,
          category: mealType
        });
      }
    }

    // High waste meal alternatives
    if (food.waste > 35) {
      suggestions.push({
        type: 'waste',
        priority: 'medium',
        message: `${food.displayName} generates ${food.waste}g of waste. Consider composting vegetable scraps or reducing portion size.`,
        foodId: food.id,
        category: mealType
      });
    }

    // High fat meal suggestions
    if (food.nutrition.fats > 20) {
      suggestions.push({
        type: 'health',
        priority: 'medium',
        message: `${food.displayName} is high in fats (${food.nutrition.fats}g). Try grilling instead of frying, or choose baked options.`,
        foodId: food.id,
        category: mealType
      });
    }
  });

  // Balanced diet recognition
  if (analysis.highCount === 0 && analysis.mealCount >= 3) {
    suggestions.push({
      type: 'health',
      priority: 'low',
      message: '🎉 Excellent! You\'ve chosen all healthy meals today. Keep up the balanced diet!'
    });
  }

  // Variety suggestions
  if (analysis.mealCount < 3) {
    suggestions.push({
      type: 'nutrition',
      priority: 'medium',
      message: 'Try to have at least 3 balanced meals per day for optimal nutrition and energy levels.'
    });
  }

  return suggestions.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Analyze all meals and calculate totals
 */
export function analyzeMeals(meals: {
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  snack?: string;
}): MealAnalysis {
  const analysis: MealAnalysis = {
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFats: 0,
    totalWaste: 0,
    mealCount: 0,
    healthyCount: 0,
    moderateCount: 0,
    highCount: 0
  };

  Object.values(meals).forEach(foodId => {
    if (!foodId) return;

    const food = getFoodById(foodId);
    if (!food) return;

    analysis.totalCalories += food.nutrition.calories;
    analysis.totalProtein += food.nutrition.protein;
    analysis.totalCarbs += food.nutrition.carbs;
    analysis.totalFats += food.nutrition.fats;
    analysis.totalWaste += food.waste;
    analysis.mealCount++;

    if (food.healthScore === 'healthy') analysis.healthyCount++;
    else if (food.healthScore === 'moderate') analysis.moderateCount++;
    else if (food.healthScore === 'high') analysis.highCount++;
  });

  return analysis;
}

/**
 * Get healthier alternatives for a given food item
 */
function getHealthierAlternatives(food: FoodItem): FoodItem[] {
  const allFoods = require('./foodDatabase').getAllFoods() as FoodItem[];

  return allFoods
    .filter(f =>
      f.category === food.category &&
      f.id !== food.id &&
      f.nutrition.calories < food.nutrition.calories &&
      (f.healthScore === 'healthy' || f.healthScore === 'moderate')
    )
    .sort((a, b) => a.nutrition.calories - b.nutrition.calories)
    .slice(0, 3);
}

/**
 * Get waste reduction tips based on total waste
 */
export function getWasteReductionTips(totalWaste: number): string[] {
  const tips: string[] = [];

  if (totalWaste > 100) {
    tips.push('Use vegetable peels and scraps for composting to reduce waste by 60%');
    tips.push('Practice portion control - serve smaller portions and take seconds if needed');
    tips.push('Store leftovers properly in airtight containers to prevent spoilage');
  }

  if (totalWaste > 80) {
    tips.push('Plan your meals ahead to avoid overbuying and food waste');
    tips.push('Use the "first in, first out" method to consume older food items first');
  }

  tips.push('Save vegetable stock from cooking for soups and gravies');
  tips.push('Freeze excess food in portions for quick meals later');
  tips.push('Share large meals with family or friends to reduce waste');

  return tips.slice(0, 5);
}

/**
 * Get nutrition balance recommendations
 */
export function getNutritionBalance(analysis: MealAnalysis): {
  protein: { percentage: number; status: 'low' | 'good' | 'high' };
  carbs: { percentage: number; status: 'low' | 'good' | 'high' };
  fats: { percentage: number; status: 'low' | 'good' | 'high' };
} {
  const totalMacros = (analysis.totalProtein * 4) + (analysis.totalCarbs * 4) + (analysis.totalFats * 9);

  const proteinPercentage = ((analysis.totalProtein * 4) / totalMacros) * 100;
  const carbsPercentage = ((analysis.totalCarbs * 4) / totalMacros) * 100;
  const fatsPercentage = ((analysis.totalFats * 9) / totalMacros) * 100;

  return {
    protein: {
      percentage: Math.round(proteinPercentage),
      status: proteinPercentage < 15 ? 'low' : proteinPercentage > 25 ? 'high' : 'good'
    },
    carbs: {
      percentage: Math.round(carbsPercentage),
      status: carbsPercentage < 45 ? 'low' : carbsPercentage > 65 ? 'high' : 'good'
    },
    fats: {
      percentage: Math.round(fatsPercentage),
      status: fatsPercentage < 20 ? 'low' : fatsPercentage > 35 ? 'high' : 'good'
    }
  };
}
