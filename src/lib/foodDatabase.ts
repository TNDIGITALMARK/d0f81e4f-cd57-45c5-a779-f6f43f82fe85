/**
 * AI Food & Nutrition Waste Reducer - Food Database
 * Comprehensive database of 50+ Indian food items with nutrition and waste data
 */

export interface FoodItem {
  id: string;
  name: string;
  displayName: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  nutrition: {
    calories: number;
    protein: number; // grams
    carbs: number; // grams
    fats: number; // grams
  };
  waste: number; // grams
  healthScore: 'healthy' | 'moderate' | 'high'; // Based on calories and waste
}

/**
 * Comprehensive food database with 50+ Indian food items
 */
export const foodDatabase: Record<string, FoodItem> = {
  // Breakfast Items
  'idli_2_pieces': {
    id: 'idli_2_pieces',
    name: 'Idli (2 pieces)',
    displayName: 'Idli (2 pieces) with Sambar',
    category: 'breakfast',
    nutrition: {
      calories: 120,
      protein: 4,
      carbs: 22,
      fats: 1
    },
    waste: 15,
    healthScore: 'healthy'
  },
  'dosa_plain': {
    id: 'dosa_plain',
    name: 'Plain Dosa',
    displayName: 'Plain Dosa with Chutney',
    category: 'breakfast',
    nutrition: {
      calories: 168,
      protein: 4,
      carbs: 28,
      fats: 4
    },
    waste: 20,
    healthScore: 'healthy'
  },
  'masala_dosa': {
    id: 'masala_dosa',
    name: 'Masala Dosa',
    displayName: 'Masala Dosa',
    category: 'breakfast',
    nutrition: {
      calories: 280,
      protein: 6,
      carbs: 42,
      fats: 9
    },
    waste: 25,
    healthScore: 'moderate'
  },
  'poha': {
    id: 'poha',
    name: 'Poha',
    displayName: 'Poha (Beaten Rice)',
    category: 'breakfast',
    nutrition: {
      calories: 250,
      protein: 5,
      carbs: 45,
      fats: 5
    },
    waste: 18,
    healthScore: 'moderate'
  },
  'upma': {
    id: 'upma',
    name: 'Upma',
    displayName: 'Upma (Semolina)',
    category: 'breakfast',
    nutrition: {
      calories: 200,
      protein: 5,
      carbs: 35,
      fats: 4
    },
    waste: 12,
    healthScore: 'healthy'
  },
  'paratha_aloo': {
    id: 'paratha_aloo',
    name: 'Aloo Paratha',
    displayName: 'Aloo Paratha with Curd',
    category: 'breakfast',
    nutrition: {
      calories: 320,
      protein: 7,
      carbs: 45,
      fats: 12
    },
    waste: 30,
    healthScore: 'moderate'
  },
  'bread_butter_jam': {
    id: 'bread_butter_jam',
    name: 'Bread with Butter & Jam',
    displayName: 'Bread Slices with Butter & Jam',
    category: 'breakfast',
    nutrition: {
      calories: 280,
      protein: 6,
      carbs: 40,
      fats: 10
    },
    waste: 10,
    healthScore: 'moderate'
  },
  'omelette_bread': {
    id: 'omelette_bread',
    name: 'Omelette with Bread',
    displayName: 'Omelette (2 eggs) with Bread',
    category: 'breakfast',
    nutrition: {
      calories: 310,
      protein: 18,
      carbs: 25,
      fats: 15
    },
    waste: 8,
    healthScore: 'healthy'
  },

  // Lunch Items
  'rice_dal': {
    id: 'rice_dal',
    name: 'Rice with Dal',
    displayName: 'Rice with Dal (Lentils)',
    category: 'lunch',
    nutrition: {
      calories: 350,
      protein: 12,
      carbs: 65,
      fats: 4
    },
    waste: 25,
    healthScore: 'healthy'
  },
  'roti_vegetables': {
    id: 'roti_vegetables',
    name: 'Roti with Vegetables',
    displayName: 'Roti (3 pieces) with Vegetables',
    category: 'lunch',
    nutrition: {
      calories: 380,
      protein: 10,
      carbs: 58,
      fats: 10
    },
    waste: 30,
    healthScore: 'healthy'
  },
  'chapati_dal': {
    id: 'chapati_dal',
    name: 'Chapati with Dal',
    displayName: 'Chapati (3 pieces) with Dal',
    category: 'lunch',
    nutrition: {
      calories: 360,
      protein: 14,
      carbs: 62,
      fats: 5
    },
    waste: 22,
    healthScore: 'healthy'
  },
  'rice_sambar': {
    id: 'rice_sambar',
    name: 'Rice with Sambar',
    displayName: 'Rice with Sambar',
    category: 'lunch',
    nutrition: {
      calories: 340,
      protein: 10,
      carbs: 64,
      fats: 3
    },
    waste: 28,
    healthScore: 'healthy'
  },
  'pulao': {
    id: 'pulao',
    name: 'Vegetable Pulao',
    displayName: 'Vegetable Pulao',
    category: 'lunch',
    nutrition: {
      calories: 420,
      protein: 8,
      carbs: 72,
      fats: 9
    },
    waste: 35,
    healthScore: 'moderate'
  },
  'biryani_veg': {
    id: 'biryani_veg',
    name: 'Vegetable Biryani',
    displayName: 'Vegetable Biryani',
    category: 'lunch',
    nutrition: {
      calories: 480,
      protein: 10,
      carbs: 78,
      fats: 12
    },
    waste: 40,
    healthScore: 'moderate'
  },
  'biryani_chicken': {
    id: 'biryani_chicken',
    name: 'Chicken Biryani',
    displayName: 'Chicken Biryani',
    category: 'lunch',
    nutrition: {
      calories: 580,
      protein: 28,
      carbs: 70,
      fats: 18
    },
    waste: 50,
    healthScore: 'high'
  },
  'chole_bhature': {
    id: 'chole_bhature',
    name: 'Chole Bhature',
    displayName: 'Chole Bhature',
    category: 'lunch',
    nutrition: {
      calories: 620,
      protein: 15,
      carbs: 85,
      fats: 22
    },
    waste: 45,
    healthScore: 'high'
  },
  'rajma_rice': {
    id: 'rajma_rice',
    name: 'Rajma with Rice',
    displayName: 'Rajma (Kidney Beans) with Rice',
    category: 'lunch',
    nutrition: {
      calories: 400,
      protein: 15,
      carbs: 68,
      fats: 6
    },
    waste: 32,
    healthScore: 'healthy'
  },
  'paneer_butter_masala': {
    id: 'paneer_butter_masala',
    name: 'Paneer Butter Masala',
    displayName: 'Paneer Butter Masala with Roti',
    category: 'lunch',
    nutrition: {
      calories: 520,
      protein: 18,
      carbs: 45,
      fats: 28
    },
    waste: 38,
    healthScore: 'high'
  },

  // Dinner Items
  'khichdi': {
    id: 'khichdi',
    name: 'Khichdi',
    displayName: 'Khichdi with Vegetables',
    category: 'dinner',
    nutrition: {
      calories: 280,
      protein: 9,
      carbs: 50,
      fats: 4
    },
    waste: 20,
    healthScore: 'healthy'
  },
  'dal_rice': {
    id: 'dal_rice',
    name: 'Dal with Rice',
    displayName: 'Dal with Rice',
    category: 'dinner',
    nutrition: {
      calories: 340,
      protein: 11,
      carbs: 62,
      fats: 4
    },
    waste: 25,
    healthScore: 'healthy'
  },
  'roti_curry': {
    id: 'roti_curry',
    name: 'Roti with Curry',
    displayName: 'Roti (2 pieces) with Vegetable Curry',
    category: 'dinner',
    nutrition: {
      calories: 320,
      protein: 8,
      carbs: 52,
      fats: 8
    },
    waste: 28,
    healthScore: 'healthy'
  },
  'fried_rice': {
    id: 'fried_rice',
    name: 'Fried Rice',
    displayName: 'Vegetable Fried Rice',
    category: 'dinner',
    nutrition: {
      calories: 450,
      protein: 9,
      carbs: 75,
      fats: 12
    },
    waste: 40,
    healthScore: 'moderate'
  },
  'noodles_veg': {
    id: 'noodles_veg',
    name: 'Vegetable Noodles',
    displayName: 'Vegetable Noodles',
    category: 'dinner',
    nutrition: {
      calories: 420,
      protein: 10,
      carbs: 68,
      fats: 11
    },
    waste: 35,
    healthScore: 'moderate'
  },
  'pasta': {
    id: 'pasta',
    name: 'Pasta',
    displayName: 'Pasta with Sauce',
    category: 'dinner',
    nutrition: {
      calories: 380,
      protein: 12,
      carbs: 62,
      fats: 9
    },
    waste: 30,
    healthScore: 'moderate'
  },
  'pizza_slice': {
    id: 'pizza_slice',
    name: 'Pizza (2 slices)',
    displayName: 'Pizza (2 slices)',
    category: 'dinner',
    nutrition: {
      calories: 540,
      protein: 20,
      carbs: 58,
      fats: 24
    },
    waste: 15,
    healthScore: 'high'
  },
  'burger_veg': {
    id: 'burger_veg',
    name: 'Vegetable Burger',
    displayName: 'Vegetable Burger with Fries',
    category: 'dinner',
    nutrition: {
      calories: 580,
      protein: 14,
      carbs: 72,
      fats: 26
    },
    waste: 25,
    healthScore: 'high'
  },

  // Snack Items
  'pakora': {
    id: 'pakora',
    name: 'Pakora',
    displayName: 'Pakora (6 pieces) with Chutney',
    category: 'snack',
    nutrition: {
      calories: 280,
      protein: 6,
      carbs: 32,
      fats: 14
    },
    waste: 20,
    healthScore: 'moderate'
  },
  'samosa': {
    id: 'samosa',
    name: 'Samosa',
    displayName: 'Samosa (2 pieces)',
    category: 'snack',
    nutrition: {
      calories: 308,
      protein: 5,
      carbs: 38,
      fats: 15
    },
    waste: 12,
    healthScore: 'moderate'
  },
  'vada_pav': {
    id: 'vada_pav',
    name: 'Vada Pav',
    displayName: 'Vada Pav',
    category: 'snack',
    nutrition: {
      calories: 290,
      protein: 7,
      carbs: 40,
      fats: 11
    },
    waste: 15,
    healthScore: 'moderate'
  },
  'bhel_puri': {
    id: 'bhel_puri',
    name: 'Bhel Puri',
    displayName: 'Bhel Puri',
    category: 'snack',
    nutrition: {
      calories: 220,
      protein: 5,
      carbs: 35,
      fats: 7
    },
    waste: 18,
    healthScore: 'moderate'
  },
  'maggi_noodles': {
    id: 'maggi_noodles',
    name: 'Maggi Noodles',
    displayName: 'Maggi Noodles',
    category: 'snack',
    nutrition: {
      calories: 310,
      protein: 8,
      carbs: 46,
      fats: 11
    },
    waste: 8,
    healthScore: 'moderate'
  },
  'sandwich_veg': {
    id: 'sandwich_veg',
    name: 'Vegetable Sandwich',
    displayName: 'Vegetable Sandwich',
    category: 'snack',
    nutrition: {
      calories: 250,
      protein: 8,
      carbs: 38,
      fats: 7
    },
    waste: 12,
    healthScore: 'healthy'
  },
  'biscuits': {
    id: 'biscuits',
    name: 'Biscuits',
    displayName: 'Biscuits (4-5 pieces)',
    category: 'snack',
    nutrition: {
      calories: 200,
      protein: 3,
      carbs: 28,
      fats: 8
    },
    waste: 2,
    healthScore: 'moderate'
  },
  'chips': {
    id: 'chips',
    name: 'Potato Chips',
    displayName: 'Potato Chips (1 packet)',
    category: 'snack',
    nutrition: {
      calories: 280,
      protein: 3,
      carbs: 30,
      fats: 17
    },
    waste: 5,
    healthScore: 'high'
  },
  'fruits_mixed': {
    id: 'fruits_mixed',
    name: 'Mixed Fruits',
    displayName: 'Mixed Fruits (1 cup)',
    category: 'snack',
    nutrition: {
      calories: 80,
      protein: 1,
      carbs: 20,
      fats: 0
    },
    waste: 10,
    healthScore: 'healthy'
  },
  'banana': {
    id: 'banana',
    name: 'Banana',
    displayName: 'Banana (1 piece)',
    category: 'snack',
    nutrition: {
      calories: 105,
      protein: 1,
      carbs: 27,
      fats: 0
    },
    waste: 8,
    healthScore: 'healthy'
  },
  'apple': {
    id: 'apple',
    name: 'Apple',
    displayName: 'Apple (1 piece)',
    category: 'snack',
    nutrition: {
      calories: 95,
      protein: 0,
      carbs: 25,
      fats: 0
    },
    waste: 6,
    healthScore: 'healthy'
  },
  'nuts_roasted': {
    id: 'nuts_roasted',
    name: 'Roasted Nuts',
    displayName: 'Roasted Nuts (handful)',
    category: 'snack',
    nutrition: {
      calories: 180,
      protein: 6,
      carbs: 8,
      fats: 15
    },
    waste: 3,
    healthScore: 'healthy'
  },
  'curd': {
    id: 'curd',
    name: 'Curd',
    displayName: 'Curd (1 cup)',
    category: 'snack',
    nutrition: {
      calories: 100,
      protein: 6,
      carbs: 12,
      fats: 3
    },
    waste: 5,
    healthScore: 'healthy'
  },
  'lassi': {
    id: 'lassi',
    name: 'Lassi',
    displayName: 'Lassi (1 glass)',
    category: 'snack',
    nutrition: {
      calories: 180,
      protein: 8,
      carbs: 22,
      fats: 5
    },
    waste: 10,
    healthScore: 'healthy'
  },
  'tea_biscuits': {
    id: 'tea_biscuits',
    name: 'Tea with Biscuits',
    displayName: 'Tea with Biscuits (2-3)',
    category: 'snack',
    nutrition: {
      calories: 150,
      protein: 2,
      carbs: 22,
      fats: 6
    },
    waste: 4,
    healthScore: 'moderate'
  },
  'coffee_snack': {
    id: 'coffee_snack',
    name: 'Coffee with Snack',
    displayName: 'Coffee with Light Snack',
    category: 'snack',
    nutrition: {
      calories: 140,
      protein: 3,
      carbs: 20,
      fats: 5
    },
    waste: 5,
    healthScore: 'moderate'
  },
  'namkeen': {
    id: 'namkeen',
    name: 'Namkeen',
    displayName: 'Namkeen (Savory Snack)',
    category: 'snack',
    nutrition: {
      calories: 260,
      protein: 5,
      carbs: 32,
      fats: 12
    },
    waste: 3,
    healthScore: 'moderate'
  },
  'dhokla': {
    id: 'dhokla',
    name: 'Dhokla',
    displayName: 'Dhokla (4 pieces)',
    category: 'snack',
    nutrition: {
      calories: 160,
      protein: 5,
      carbs: 28,
      fats: 3
    },
    waste: 10,
    healthScore: 'healthy'
  },
  'kachori': {
    id: 'kachori',
    name: 'Kachori',
    displayName: 'Kachori (2 pieces)',
    category: 'snack',
    nutrition: {
      calories: 320,
      protein: 7,
      carbs: 42,
      fats: 14
    },
    waste: 15,
    healthScore: 'high'
  },
  'jalebi': {
    id: 'jalebi',
    name: 'Jalebi',
    displayName: 'Jalebi (3-4 pieces)',
    category: 'snack',
    nutrition: {
      calories: 280,
      protein: 2,
      carbs: 48,
      fats: 9
    },
    waste: 8,
    healthScore: 'high'
  }
};

/**
 * Get food items filtered by category
 */
export function getFoodsByCategory(category: FoodItem['category']): FoodItem[] {
  return Object.values(foodDatabase).filter(food => food.category === category);
}

/**
 * Get a single food item by ID
 */
export function getFoodById(id: string): FoodItem | undefined {
  return foodDatabase[id];
}

/**
 * Get all food items as an array
 */
export function getAllFoods(): FoodItem[] {
  return Object.values(foodDatabase);
}

/**
 * Calculate health score based on calories and waste
 */
export function calculateHealthScore(calories: number, waste: number): FoodItem['healthScore'] {
  const score = calories + (waste * 2);

  if (score < 300) return 'healthy';
  if (score < 500) return 'moderate';
  return 'high';
}
