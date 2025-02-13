# Django + React 19 Starter Kit

A modern full-stack starter kit featuring Django 5 and React 19 with a carefully selected tech stack for rapid development.

## Tech Stack

### Backend
- Django 5.0
- Django Ninja (Fast Django REST Framework)
- Session-based Authentication
- UV Package Manager

### Frontend
- React 19
- React Router 7
- Shadcn/ui Components
- TailwindCSS 4
- TypeScript
- Tanstack Query
- PNPM Package Manager

## Prerequisites

- Python 3.10+
- Node.js 18+
- UV Package Manager
- PNPM

## Getting Started

### Backend Setup
1. Install UV if you haven't already:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```
2. Create and activate a virtual environment:
   ```bash
   uv sync

   ```
3. Install dependencies using UV:
   ```bash
   uv pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   uv run manage.py migrate
   ```
5. Start the Django development server:
   ```bash
   uv run manage.py runserver
   ```

### Frontend Setup
1. Install PNPM if you haven't already:
   ```bash
   npm install -g pnpm
   ```
2. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   pnpm install
   ```
3. Start the React development server:
   ```bash
   pnpm start
   ```

## Usage
This starter kit provides a solid foundation for building full-stack applications with Django and React. You can easily extend the functionality by adding more features as needed.

## License
This project is licensed under the MIT License.

## Contributing
We welcome contributions! Please fork the repository and create a pull request with your changes.

## Contact
For any questions or feedback, please contact us at [contact@example.com](mailto:contact@example.com).

