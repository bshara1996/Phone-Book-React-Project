# 📞 Phone Book - React Application

A modern, feature-rich contact management application built with React and Material-UI. Manage your contacts and groups with an elegant, responsive interface.


## ✨ Features

- Contact Management: Add, edit, delete, and search contacts
- Group Organization: Create and manage contact groups
- User Authentication: Secure login system
- Responsive Design: Works seamlessly on desktop and mobile devices
- Modern UI: Built with Material-UI components and custom styling
- Fast Performance: Powered by Vite for lightning-fast development and builds

## 🚀 Getting Started

### Installation

```bash
npm install
npm start
```

The application will open at `http://localhost:5173`


## 🛠️ Tech Stack

- React 18.2 + Vite 5.2
- React Router DOM 7.2
- Material-UI 5.15
- Emotion (CSS-in-JS)
- React Icons 5.0

## 📁 Project Structure

```
src/
├── app/              # Main app component and layout
│   ├── App.jsx       # Root component with routing
│   ├── Layout.jsx    # Protected route layout
│   └── data/         # Mock data
├── pages/            # Page components
│   ├── Home/         # Home page
│   ├── Contacts/     # Contacts management
│   ├── Groups/       # Groups management
│   ├── Login/        # Authentication
│   └── NotFound/     # 404 page
├── components/       # Reusable components
│   ├── cards/        # Contact cards
│   ├── forms/        # Form components
│   ├── controls/     # UI controls
│   ├── header/       # Header component
│   ├── footer/       # Footer component
│   ├── navbar/       # Navigation bar
│   └── modal/        # Modal dialogs
├── context/          # React Context
│   └── PhoneBookContext.jsx  # Global state management
└── utils/            # Utility functions
    └── api.js        # API calls
```



## 🎯 Key Features Explained

### Context-Based State Management

The application uses React Context (`PhoneBookContext`) to manage global state, providing:
- Centralized contact and group management
- Efficient filtering and search operations
- Optimized state updates with single-pass algorithms

### Authentication System

- Login page with username/password validation
- Role-based access control (admin/user)
- Protected routes using Layout component
- Session management with logout functionality

### Contact Operations

- **Add Contact**: Create new contacts with name, email, phone, and group assignments
- **Update Contact**: Edit existing contact information
- **Delete Contact**: Remove individual contacts or entire groups
- **Toggle Favorite**: Mark important contacts as favorites
- **Search & Filter**: Real-time filtering by name, email, phone, or group

## 👥 Authors

- Bshara Karkaby [49-2]
- Moner Makholuy [49-2]

---

<p align="center">Made with ❤️ using React & Vite</p>

