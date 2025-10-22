export const dynamic = 'force-dynamic'

import Link from 'next/link';

export default function Index() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            🌱 AI Food & Nutrition Waste Reducer
          </h1>
          <p className="text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
            Class 10 Science Exhibition Project
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An educational web application demonstrating how AI can help make better food choices while reducing waste
          </p>
        </div>

        {/* Main CTA */}
        <div className="text-center mb-20 animate-fadeIn">
          <Link
            href="/nutrition"
            className="inline-block px-12 py-6 text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-2xl hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-3">
              <span>🚀</span>
              Launch Nutrition Analyzer
            </span>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon="📊"
            title="Nutrition Analysis"
            description="Track calories, protein, carbs, and fats for each meal with detailed breakdowns and visual charts"
            color="from-blue-500 to-blue-600"
          />
          <FeatureCard
            icon="♻️"
            title="Waste Estimation"
            description="Calculate estimated food waste and learn practical tips to reduce environmental impact"
            color="from-green-500 to-green-600"
          />
          <FeatureCard
            icon="🤖"
            title="AI Recommendations"
            description="Get personalized suggestions for healthier alternatives and sustainable eating habits"
            color="from-purple-500 to-purple-600"
          />
        </div>

        {/* How It Works */}
        <div className="card mb-16 animate-fadeIn bg-gradient-to-br from-green-50 to-blue-50">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              number="1"
              title="Select Your Meals"
              description="Choose from 50+ Indian food items across Breakfast, Lunch, Dinner, and Snacks"
            />
            <StepCard
              number="2"
              title="View Analysis"
              description="See detailed nutrition breakdown, waste estimation, and interactive charts"
            />
            <StepCard
              number="3"
              title="Get Recommendations"
              description="Receive AI-powered suggestions for healthier choices and waste reduction"
            />
          </div>
        </div>

        {/* Key Features */}
        <div className="card mb-16 animate-fadeIn">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HighlightCard
              icon="🍛"
              title="50+ Indian Food Items"
              items={[
                'Traditional breakfast items (Idli, Dosa, Poha, Upma)',
                'Complete lunch options (Rice & Dal, Roti & Vegetables, Biryani)',
                'Dinner varieties (Khichdi, Pulao, Noodles, Pizza)',
                'Healthy snacks (Fruits, Nuts, Samosa, Pakora)'
              ]}
            />
            <HighlightCard
              icon="📈"
              title="Interactive Visualizations"
              items={[
                'Pie chart for nutrient distribution (Protein, Carbs, Fats)',
                'Bar chart for food waste by meal category',
                'Color-coded meal status (Green, Yellow, Red)',
                'Real-time calculation and updates'
              ]}
            />
            <HighlightCard
              icon="🎯"
              title="Smart Analysis"
              items={[
                'Total daily calorie tracking',
                'Macro-nutrient breakdown (Protein, Carbs, Fats)',
                'Meal-wise waste estimation',
                'Health score for each food item'
              ]}
            />
            <HighlightCard
              icon="💡"
              title="AI-Powered Insights"
              items={[
                'Personalized health recommendations',
                'Healthier food alternatives',
                'Waste reduction strategies',
                'Nutrition balance guidance'
              ]}
            />
          </div>
        </div>

        {/* Educational Info */}
        <div className="card animate-fadeIn bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <span>🏫</span>
              Educational Objectives
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              This project demonstrates the application of Artificial Intelligence in nutrition science and environmental sustainability.
              Students learn about:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✓</span>
                <span className="text-gray-700">How AI can analyze food nutrition and make intelligent recommendations</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✓</span>
                <span className="text-gray-700">The importance of balanced nutrition for health and well-being</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✓</span>
                <span className="text-gray-700">Environmental impact of food waste and reduction strategies</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✓</span>
                <span className="text-gray-700">Data visualization techniques for scientific communication</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center mt-16 animate-fadeIn">
          <Link
            href="/nutrition"
            className="inline-block px-10 py-5 text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all duration-300"
          >
            Get Started Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Feature Card Component
 */
function FeatureCard({
  icon,
  title,
  description,
  color
}: {
  icon: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="card hover:scale-105 transition-all">
      <div className={`text-6xl mb-4 bg-gradient-to-r ${color} bg-clip-text`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

/**
 * Step Card Component
 */
function StepCard({
  number,
  title,
  description
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 text-white text-2xl font-bold rounded-full mb-4 shadow-lg">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

/**
 * Highlight Card Component
 */
function HighlightCard({
  icon,
  title,
  items
}: {
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{icon}</span>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-green-600 flex-shrink-0">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
