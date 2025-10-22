# 🌱 AI Food & Nutrition Waste Reducer

**Class 10 Science Exhibition Project**

An interactive, educational web application demonstrating how Artificial Intelligence can help students make better food choices while reducing environmental waste.

---

## 🎯 Project Overview

This web application provides instant nutrition analysis and waste estimation for Indian meals, combined with AI-powered suggestions for healthier alternatives and sustainable eating habits. It's designed to be visually appealing and educational, perfect for science exhibitions and classroom demonstrations.

### Target Audience
- Class 10 students
- Science teachers
- Exhibition visitors
- Anyone interested in nutrition and sustainability

---

## ✨ Key Features

### 1. **50+ Indian Food Items Database**
- **Breakfast**: Idli, Dosa, Poha, Upma, Paratha, Omelette, etc.
- **Lunch**: Rice & Dal, Roti & Vegetables, Biryani, Pulao, Chole Bhature, etc.
- **Dinner**: Khichdi, Fried Rice, Noodles, Pasta, Pizza, Burger, etc.
- **Snacks**: Pakora, Samosa, Fruits, Nuts, Maggi, Sandwich, etc.

### 2. **Comprehensive Nutrition Tracking**
- Total daily calorie calculation
- Macro-nutrient breakdown (Protein, Carbs, Fats)
- Meal-wise nutrition analysis
- Health score for each food item

### 3. **Food Waste Estimation**
- Estimated waste generation per meal
- Total daily waste calculation
- Waste reduction tips and strategies

### 4. **AI-Powered Recommendations**
- Personalized health suggestions
- Healthier food alternatives
- Nutrition balance guidance
- Sustainability tips

### 5. **Interactive Visualizations**
- **Pie Chart**: Nutrient distribution (Protein, Carbs, Fats)
- **Bar Chart**: Food waste by meal category
- **Color Coding**:
  - 🟢 Green = Healthy / Low Waste
  - 🟡 Yellow = Moderate
  - 🔴 Red = High Calories / High Waste

---

## 🚀 How to Use

### Option 1: Next.js Application (Full Features)

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open in browser**:
   - Visit: `http://localhost:4006`
   - Click "Launch Nutrition Analyzer"

3. **Select your meals**:
   - Choose food items from dropdown menus for Breakfast, Lunch, Dinner, and Snacks
   - See nutrition preview for each selection

4. **Calculate results**:
   - Click "Calculate Nutrition & Waste"
   - View detailed analysis with charts

5. **Get AI recommendations**:
   - Click "View AI Recommendations"
   - Receive personalized suggestions

### Option 2: Standalone HTML (Zylo / Direct Browser)

1. **Open the standalone file**:
   ```
   public/standalone-nutrition-app.html
   ```

2. **Double-click to open in browser** or **embed in Zylo**

3. **Features included**:
   - Full meal selection interface
   - Real-time nutrition preview
   - Interactive charts (Chart.js)
   - AI suggestions
   - All functionality in a single HTML file

---

## 📁 Project Structure

### Next.js Application
```
src/
├── app/
│   ├── page.tsx                          # Home page with project overview
│   ├── nutrition/
│   │   ├── page.tsx                      # Meal Input Dashboard (Page 1)
│   │   ├── results/
│   │   │   └── page.tsx                  # Results & Analytics (Page 2)
│   │   └── recommendations/
│   │       └── page.tsx                  # AI Recommendations (Page 3)
│   ├── globals.css                       # Global styles with custom design system
│   └── layout.tsx                        # Root layout
├── lib/
│   ├── foodDatabase.ts                   # 50+ Indian food items with nutrition data
│   └── aiSuggestions.ts                  # AI recommendation engine
public/
└── standalone-nutrition-app.html         # Self-contained HTML version
```

### Standalone HTML
```
public/standalone-nutrition-app.html      # Complete app in single file
```

---

## 🎨 Design System

### Color Palette
- **Primary Green**: `#10b981` (Healthy choices)
- **Sunny Yellow**: `#f59e0b` (Moderate options)
- **Coral Red**: `#ef4444` (High calorie/waste)
- **Mint Green**: `#d1fae5` (Background accents)
- **Blue**: `#3b82f6` (Charts and info)
- **Purple**: `#8b5cf6` (Recommendations)

### Typography
- **Heading Font**: Poppins (700, 800)
- **Body Font**: Inter (400, 500, 600)
- **Base Size**: 16px
- **Line Height**: 1.6

### Components
- Exhibition-friendly card design
- Smooth animations and transitions
- Responsive layout (mobile-friendly)
- Interactive hover effects
- Color-coded health indicators

---

## 📊 Data & Analysis

### Nutrition Calculations
- **Calories**: Total daily intake from all meals
- **Protein**: Grams of protein (4 calories per gram)
- **Carbs**: Grams of carbohydrates (4 calories per gram)
- **Fats**: Grams of fats (9 calories per gram)

### Health Scoring
- **Healthy**: < 300 (calories + waste × 2)
- **Moderate**: 300-500
- **High**: > 500

### AI Recommendation Logic
- High calorie warnings (> 2000 daily)
- Protein deficiency alerts (< 15% of calories)
- High fat content warnings (> 35% of calories)
- Waste reduction strategies
- Healthier food alternatives

---

## 🏫 Educational Objectives

This project teaches students about:

1. **AI in Nutrition Science**
   - How AI analyzes food data
   - Pattern recognition in dietary habits
   - Intelligent recommendation systems

2. **Balanced Nutrition**
   - Importance of macro-nutrients
   - Daily calorie requirements
   - Meal planning strategies

3. **Environmental Sustainability**
   - Food waste impact
   - Composting and recycling
   - Sustainable eating habits

4. **Data Visualization**
   - Chart types and their uses
   - Visual communication of data
   - Interactive user interfaces

---

## 🛠️ Technical Stack

### Next.js Application
- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Charts**: Recharts
- **Fonts**: Google Fonts (Inter, Poppins)

### Standalone HTML
- **Charts**: Chart.js (CDN)
- **Styling**: Embedded CSS
- **JavaScript**: Vanilla JS (no dependencies)

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1366×768 (exhibition standard)
- **Laptop**: 1920×1080
- **Tablet**: iPad and similar devices
- **Mobile**: Touch-friendly buttons (min 44px)

---

## 🎯 Usage Scenarios

### Science Exhibition
1. Open on exhibition laptop
2. Let visitors select their daily meals
3. Show nutrition analysis and waste data
4. Demonstrate AI recommendations
5. Explain educational objectives

### Classroom Demonstration
1. Project on classroom screen
2. Select meals as a class activity
3. Discuss nutrition results
4. Analyze waste data together
5. Learn about healthy alternatives

### Individual Learning
1. Students use on personal devices
2. Track own meal patterns
3. Learn about nutrition science
4. Understand environmental impact
5. Make informed food choices

---

## 🔧 Customization

### Adding New Foods
Edit `src/lib/foodDatabase.ts`:
```typescript
{
  id: 'new_food_id',
  name: 'Food Name',
  displayName: 'Display Name',
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  nutrition: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  },
  waste: 0,
  healthScore: 'healthy' | 'moderate' | 'high'
}
```

### Modifying AI Logic
Edit `src/lib/aiSuggestions.ts`:
- Adjust calorie thresholds
- Modify recommendation messages
- Add new suggestion types

---

## 📝 Exhibition Presentation Tips

1. **Hook**: Start with the question "How much food do we waste daily?"
2. **Demo**: Show live meal selection and calculation
3. **Explain**: Discuss the AI recommendation logic
4. **Engage**: Ask visitors to try with their own meals
5. **Conclude**: Summarize learning objectives

---

## 🌟 Future Enhancements

Potential additions for advanced projects:
- User accounts and meal history
- Multi-day tracking and trends
- Recipe suggestions
- Regional cuisine options
- Mobile app version
- Integration with real nutrition APIs
- Social sharing features
- Teacher dashboard for classroom use

---

## 📚 References & Credits

- **Nutrition Data**: Based on USDA FoodData Central and Indian food databases
- **Health Guidelines**: WHO and ICMR recommendations
- **Fonts**: Google Fonts (Inter, Poppins)
- **Charts**: Recharts (Next.js) and Chart.js (HTML)
- **Icons**: Emoji for exhibition-friendly visuals

---

## 💡 Learning Outcomes

Students who use this application will:
- Understand macro-nutrient composition of Indian foods
- Learn to make healthier food choices
- Recognize the environmental impact of food waste
- Experience practical AI applications
- Develop awareness of sustainable eating habits

---

## 🤝 Support & Feedback

For questions or suggestions about this project:
- Review the code comments in each file
- Check the inline documentation
- Experiment with different meal combinations
- Observe the AI recommendations logic

---

## 📄 License

This project is created for educational purposes as a Class 10 Science Exhibition project.

---

**Built with ❤️ for Science Education**

*Demonstrating how AI can make a positive impact on health and environment*
