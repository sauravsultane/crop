# Crop Recommendation AI

A machine learning-powered application that provides intelligent crop recommendations based on environmental and soil conditions.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Model Information](#model-information)
- [Technologies Used](#technologies-used)

## Features
- 🌾 AI-powered crop recommendations
- 📊 Data-driven decision making
- 🎨 Interactive web interface
- 📱 Responsive design
- 🚀 REST API backend

## Project Structure
```
crop/
├── app.py                          # Flask/Django backend application
├── generate_backend.py             # Backend generation script
├── run_eval.py                     # Model evaluation script
├── Crop_Recommendation_AI.ipynb    # Jupyter notebook with ML model
├── README.md                       # This file
├── frontend/                       # React/Vue frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── assets/
│   ├── public/
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── README.md
└── model/                          # Machine learning models
```

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup
```bash
# Navigate to project root
cd crop

# Install Python dependencies
pip install -r requirements.txt

# Run the application
python app.py
```

The backend will be available at `http://localhost:5000` (or configured port).

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite default).

## Usage

1. **Start the Backend**
   ```bash
   python app.py
   ```

2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - Input soil and environmental parameters
   - Receive crop recommendations from the AI model

## Model Information
The crop recommendation model is built using machine learning techniques and is defined in the Jupyter notebook: `Crop_Recommendation_AI.ipynb`

To evaluate the model:
```bash
python run_eval.py
```

## Technologies Used

### Backend
- Python
- Flask or Django (see app.py)

### Frontend
- React or Vue.js
- Vite (build tool)
- Tailwind CSS (styling)
- ESLint (code quality)

### Machine Learning
- Jupyter Notebook for model development
- Python ML libraries (pandas, scikit-learn, etc.)

## API Endpoints
Refer to the backend documentation or `app.py` for available API endpoints and request/response formats.

## Contributing
Feel free to submit issues and enhancement requests!

## License
[Add license information here]

## Contact
[Add contact information here]