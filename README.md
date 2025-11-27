📌 Smart Ticket Management System

A full-stack ticketing application built with React (Vite) and Django REST Framework, allowing users to create, track, manage, and update support tickets.

This system provides a clean, modern UI with dashboards, visualizations, ticket forms, and an admin-friendly backend.

🚀 Features
🎫 Ticket Creation

Raise new tickets with:

Sender name & email

Receiver/Team

Subject

Description

Priority (High/Medium/Low)

File attachment (up to 5MB)

📋 Ticket Dashboard

View all tickets in a clean table

See ticket:

Status

Priority

Sender information

Quick "View" button

🔍 Ticket Details View

Full ticket information

Update ticket status (Raised → Working → Hold → Closed)

Download attachment

📊 Data Visualization

Ticket distribution by priority

Status breakdown

Monthly ticket creation chart

🌓 Clean Modern UI

React-based UI

Custom styled ticket form

Dashboard & Visualizer pages

🛠️ Tech Stack
Frontend

React (Vite)

Axios

Recharts (for charts)

CSS (custom UI styling)

Backend

Django

Django REST Framework (DRF)

PostgreSQL

SimpleJWT (for authentication)

CORS Headers

📁 Project Structure
smart-ticket-system/
│
├── backend/
│   ├── backend/           # Django project settings
│   ├── ticketapp/         # All ticket APIs and models
│   ├── venv/              # Virtual environment (optional)
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Route pages
│   │   ├── styles/        # CSS files
│   │   └── api/axios.js   # Axios base URL config
│   ├── public/
│   └── package.json
│
└── README.md

🗄️ Backend Setup (Django)
1️⃣ Create Virtual Environment
python -m venv venv
venv\Scripts\activate     # Windows

2️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Apply Migrations
python manage.py migrate

4️⃣ Run Server
python manage.py runserver

🔗 API Base URL
http://127.0.0.1:8000/api/

💻 Frontend Setup (React + Vite)
1️⃣ Install Dependencies
npm install

2️⃣ Start Development Server
npm run dev

🔗 Frontend URL
http://localhost:5173/

🔌 API Endpoints
Tickets
Method	Endpoint	Description
POST	/api/tickets/create/	Create a new ticket
GET	/api/tickets/	List all tickets
GET	/api/tickets/<id>/	Retrieve a single ticket
PATCH	/api/tickets/<id>/update-status/	Update ticket status
🧱 Database (PostgreSQL)

Example configuration in settings.py:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'ticketdb',
        'USER': 'postgres',
        'PASSWORD': 'YOUR_PASSWORD',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

🔐 Authentication (Optional)

The project already includes JWT setup:

from rest_framework_simplejwt.tokens import RefreshToken


Admin can log in & generate tokens.

🧾 Screenshots

(Add your UI screenshots here)
Example:

frontend/screenshots/dashboard.png
frontend/screenshots/ticket-form.png

🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first.

📜 License

This project is open-source and available under the MIT License.

👨‍💻 Developed By

Gokulnath
Full Stack Developer
