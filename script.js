
// DOM Elements
const form = document.getElementById('bmi-form');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const formSection = document.getElementById('form-section');
const resultSection = document.getElementById('result-section');
const resetBtn = document.getElementById('reset-btn');

// Result Elements
const bmiValueEl = document.getElementById('bmi-value');
const bmiRing = document.getElementById('bmi-ring');
const categoryTitle = document.getElementById('bmi-category');
const categoryDesc = document.getElementById('bmi-desc');
const mealBreakfast = document.getElementById('meal-breakfast');
const mealLunch = document.getElementById('meal-lunch');
const mealDinner = document.getElementById('meal-dinner');
const mealSnacks = document.getElementById('meal-snacks');

// Core Logic (Same as before)
const calculateBMI = (heightCm, weightKg) => {
    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return null;
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    return parseFloat(bmi.toFixed(1));
};

const getDietPlan = (bmi) => {
    if (bmi < 18.5) {
        return {
            category: 'Underweight',
            colorClass: 'text-blue-400',
            borderColor: '#60a5fa', // blue-400 equivalent
            summary: 'You are underweight. Focus on nutrient-rich foods to gain healthy weight.',
            meals: {
                breakfast: 'Oatmeal with whole milk, nuts, seeds, and banana.',
                lunch: 'Grilled chicken breast with brown rice, avocado, and steamed vegetables.',
                dinner: 'Salmon or tofu stir-fry with quinoa and olive oil dressing.',
                snacks: 'Greek yogurt with honey, trail mix, or protein smoothie.'
            }
        };
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return {
            category: 'Normal Weight',
            colorClass: 'text-green-400',
            borderColor: '#4ade80', // green-400
            summary: 'You have a healthy weight. Maintain a balanced diet to stay fit.',
            meals: {
                breakfast: 'Scrambled eggs with spinach and whole-grain toast.',
                lunch: 'Turkey and cheese sandwich on whole wheat bread with a side salad.',
                dinner: 'Grilled fish with roasted sweet potatoes and asparagus.',
                snacks: 'Apple with peanut butter or a handful of almonds.'
            }
        };
    } else if (bmi >= 25 && bmi < 29.9) {
        return {
            category: 'Overweight',
            colorClass: 'text-orange-400',
            borderColor: '#fb923c', // orange-400
            summary: 'You are slightly overweight. Focus on portion control and nutrient-dense foods.',
            meals: {
                breakfast: 'Greek yogurt with berries and a sprinkle of granola.',
                lunch: 'Grilled chicken salad with vinaigrette dressing (no croutons).',
                dinner: 'Baked chicken or turkey with steamed broccoli and cauliflower.',
                snacks: 'Carrot sticks with hummus or a piece of seasonal fruit.'
            }
        };
    } else {
        return {
            category: 'Obese',
            colorClass: 'text-red-500',
            borderColor: '#ef4444', // red-500
            summary: 'Your BMI indicates obesity. Prioritize lean proteins and vegetables.',
            meals: {
                breakfast: 'Egg white omelet with mushrooms and spinach.',
                lunch: 'Large mixed green salad with grilled shrimp or tofu and lemon juice.',
                dinner: 'Baked white fish with steamed zucchini and leafy greens.',
                snacks: 'Celery sticks, cucumber slices, or a small handful of walnuts.'
            }
        };
    }
};

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    const bmi = calculateBMI(height, weight);
    if (!bmi) return;

    const plan = getDietPlan(bmi);
    displayResult(bmi, plan);
});

resetBtn.addEventListener('click', () => {
    formSection.style.display = 'block';
    resultSection.classList.add('hidden');
    // Clear inputs
    heightInput.value = '';
    weightInput.value = '';
});

// Helper Function
function displayResult(bmi, plan) {
    // Hide form, show result
    formSection.style.display = 'none';
    resultSection.classList.remove('hidden');

    // Update Content
    bmiValueEl.textContent = bmi;
    categoryTitle.textContent = plan.category;
    categoryDesc.textContent = plan.summary;

    // Update Colors
    categoryTitle.style.color = plan.borderColor;
    bmiRing.style.borderColor = plan.borderColor;

    // Update Meals
    mealBreakfast.textContent = plan.meals.breakfast;
    mealLunch.textContent = plan.meals.lunch;
    mealDinner.textContent = plan.meals.dinner;
    mealSnacks.textContent = plan.meals.snacks;
}
