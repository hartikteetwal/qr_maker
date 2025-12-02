qr-maker/
│
├── app/
│   ├── layout.js
│   ├── globals.css
│   │
│   ├── page.js                 → Home Page
│   │
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── signup/
│   │   │   └── page.js
│   │   └── reset-password/
│   │       └── page.js
│   │
│   ├── dashboard/
│   │   └── page.js             → After login dashboard
│   │
│   ├── settings/
│   │   └── upi/
│   │       └── page.js         → Add / Update UPI ID
│   │
│   ├── generate/
│   │   └── page.js             → Enter amount → generate QR
│   │
│   ├── qr/
│   │   └── [id]/
│   │       └── page.js         → QR preview page
│   │
│   ├── history/
│   │   └── page.js             → All generated QR history
│   │
│   ├── transactions/
│   │   └── page.js             → Payment verification logs
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   └── signup/route.js
│   │   │
│   │   ├── upi/
│   │   │   └── route.js        → save/update UPI
│   │   │
│   │   ├── qr/
│   │   │   └── route.js        → generate UPI deep link + QR
│   │   │
│   │   ├── razorpay/
│   │   │   ├── order/route.js  → Create Razorpay order
│   │   │   └── verify/route.js → Razorpay webhook
│   │   │
│   │   └── user/
│   │       └── route.js        → get user profile
│   │
│   └── utils/
│       ├── auth.js             → JWT / session helper
│       ├── db.js               → Database configuration
│       ├── qr.js               → QR generator utility
│       └── razorpay.js         → Razorpay config
│
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── Input.js
│   ├── Button.js
│   ├── QRCard.js
│   └── DashboardCard.js
│
├── lib/
│   ├── prisma.js               → Prisma Client
│   └── validations.js          → zod validations
│
├── prisma/
│   └── schema.prisma           → Database schema
│
├── public/
│   ├── logo.png
│   ├── qr-placeholder.png
│   └── icons/
│
├── .env.local                  → Environment variables
├── package.json
└── tailwind.config.js
