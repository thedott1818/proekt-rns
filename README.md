# Пицария - Онлайн поръчки

Система за управление на онлайн поръчки за пицария, разработена с TypeScript, React, Express и Vite.

## Функционалности

- **Управление на пици** - преглед на налични пици със съставки и цени
- **Управление на клиенти** - добавяне и преглед на клиенти
- **Създаване на поръчки** - избор на пици и клиент за нова поръчка
- **Проследяване на поръчки** - преглед и обновяване на статуса на поръчките
- **CRUD операции** за всички обекти
- **Валидация на данни** и проверка за съществуващи ID-та

## Технологии

### Backend
- **Node.js** с **TypeScript**
- **Express.js** за REST API
- **In-memory база данни** (масиви)
- **CORS** за cross-origin заявки

### Frontend
- **React** с **TypeScript**
- **Vite** за build tool
- **Axios** за HTTP заявки
- **CSS** за стилизиране

## Структура на проекта

\`\`\`
my-project/
├── backend/
│   ├── src/
│   │   ├── models/          # TypeScript интерфейси
│   │   ├── services/        # Бизнес логика и база данни
│   │   ├── utils/           # Помощни функции
│   │   └── index.ts         # Express сървър
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React компоненти
│   │   ├── utils/           # API функции
│   │   ├── App.tsx          # Главен компонент
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
└── README.md
\`\`\`

## Инсталация и стартиране

### Предварителни изисквания
- Node.js (версия 18 или по-нова)
- npm или yarn

### 1. Клониране на репозиторията
\`\`\`bash
git clone <repository-url>
cd my-project
\`\`\`

### 2. Инсталиране на зависимости

#### Backend
\`\`\`bash
cd backend
npm install
\`\`\`

#### Frontend
\`\`\`bash
cd frontend
npm install
\`\`\`

### 3. Стартиране на приложението

#### Стартиране на backend сървъра
\`\`\`bash
cd backend
npm run dev
\`\`\`
Сървърът ще стартира на http://localhost:3001

#### Стартиране на frontend приложението
\`\`\`bash
cd frontend
npm run dev
\`\`\`
Приложението ще бъде достъпно на http://localhost:3000

## API Endpoints

### Пици
- \`GET /api/pizzas\` - получаване на всички пици
- \`GET /api/pizzas/:id\` - получаване на пица по ID
- \`POST /api/pizzas\` - създаване на нова пица
- \`PUT /api/pizzas/:id\` - обновяване на пица
- \`DELETE /api/pizzas/:id\` - изтриване на пица

### Съставки
- \`GET /api/ingredients\` - получаване на всички съставки
- \`POST /api/ingredients\` - създаване на нова съставка

### Клиенти
- \`GET /api/customers\` - получаване на всички клиенти
- \`POST /api/customers\` - създаване на нов клиент

### Поръчки
- \`GET /api/orders\` - получаване на всички поръчки
- \`POST /api/orders\` - създаване на нова поръчка
- \`PUT /api/orders/:id\` - обновяване на поръчка

### Доставки
- \`GET /api/deliveries\` - получаване на всички доставки
- \`POST /api/deliveries\` - създаване на нова доставка

## Модели на данни

### Pizza
\`\`\`typescript
interface Pizza {
  id: string;
  name: string;
  ingredients: string[];
  price: number;
}
\`\`\`

### Ingredient
\`\`\`typescript
interface Ingredient {
  id: string;
  name: string;
  allergens: string[];
  availability: boolean;
}
\`\`\`

### Customer
\`\`\`typescript
interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
}
\`\`\`

### Order
\`\`\`typescript
interface Order {
  id: string;
  pizzas: string[]; // Pizza IDs
  customerId: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
}
\`\`\`

### Delivery
\`\`\`typescript
interface Delivery {
  id: string;
  date: Date;
  orderId: string;
  deliveryPerson: string;
  status: 'assigned' | 'in_transit' | 'delivered';
}
\`\`\`

## Използване

1. **Преглед на пици** - отидете в раздел "Пици" за да видите наличните пици
2. **Добавяне на клиент** - в раздел "Клиенти" можете да добавите нов клиент
3. **Създаване на поръчка** - в раздел "Нова поръчка" изберете клиент и пици
4. **Управление на поръчки** - в раздел "Поръчки" можете да проследявате и обновявате статуса

## Git работен процес

Препоръчителни стъпки за работа с Git:

\`\`\`bash
# Първоначално клониране
git clone <repository-url>
cd my-project

# Създаване на нов branch за функционалност
git checkout -b feature/add-pizza-management

# Добавяне на промени
git add .
git commit -m "Add pizza CRUD operations"

# Push на промените
git push origin feature/add-pizza-management

# Merge в main branch
git checkout main
git merge feature/add-pizza-management
\`\`\`

## Разработчици

- [Име на първия ученик]
- [Име на втория ученик]

## Лиценз

Този проект е разработен за учебни цели.
\`\`\`
\`\`\`

```text file=".gitignore"
# Dependencies
node_modules/
*/node_modules/

# Build outputs
dist/
build/
*/dist/
*/build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
