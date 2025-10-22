# Orbit - Pi Ecosystem Platform

A dual-purpose platform for the Pi Network where users can earn Pi through micro-tasks and spend it on goods/services in a peer-to-peer marketplace.

[![PiOS](https://img.shields.io/badge/Pi-Open%20Source-%23f0b90b)](https://github.com/pi-apps/PiOS)
[![Powered by Pi SDK](https://img.shields.io/badge/Powered%20by-Pi%20SDK-blueviolet)](https://developers.minepi.com)

## 🌟 Overview

Orbit combines two powerful concepts into one unified platform:

- **🎯 PiTask (MicroJobs)** - Earn Pi by completing tasks or offering services
- **🛒 PiMart (Marketplace)** - Spend Pi on real products and digital goods

This creates a **circular Pi economy** where users can earn Pi and immediately spend it, making Pi truly useful for everyday life.

## ✨ Key Features

### 🎨 **MicroJobs & Services**
- **Post Tasks** - Need a logo? Translation? Coding help? Post it for Pi
- **Offer Services** - Share your skills and earn Pi (design, writing, tutoring, etc.)
- **Skill Categories** - Design, Programming, Writing, Marketing, Education, and more
- **Gamified System** - Earn badges, build reputation, level up your profile

### 🛍️ **Marketplace**
- **Buy Products** - Electronics, fashion, collectibles, digital goods
- **Sell Items** - Turn your unused items into Pi
- **Secure Transactions** - Built-in escrow system for safe trading
- **Local & Global** - Find items nearby or shop worldwide

### 🔄 **Circular Economy**
- **Earn Pi** → Complete tasks, offer services
- **Spend Pi** → Buy products, hire others for tasks
- **Repeat** → Continuous Pi circulation in the ecosystem

## 💰 Pi SDK Integration

Orbit is fully integrated with the *official Pi Network SDK, enabling **real blockchain payments* on both *Testnet* and *Mainnet*.

### ✅ Implemented SDK Features
| Function | Description |
|-----------|-------------|
| authenticate() | Secure Pi user login with Pi Browser |
| createPayment() | Initiate U2A payments from users to app |
| approvePayment() | Backend verification for payment integrity |
| completePayment() | Confirm and record successful payments |
| A2U transfer | Send Pi rewards from app to users directly |

### 🔐 Backend Setup
The backend is built with:
- Node.js + Express
- Pi SDK (pi-backend) for blockchain interactions
- Hosted on Render

[live backend URL](https://pi-payment-server.onrender.com/)

- *Environment Variables:*
  ```bash
  PI_API_KEY=your_pi_api_key_here
  PI_WALLET_SEED=your_pi_wallet_seed_here
  PORT=5000

## Routes Implemented
- /approve-paymnet -> U2A approval
- /complete-payment -> U2A completion
- /send-pi -> A2U reward transfers

## 🎯 Target Audience

- **Pi Network Pioneers** looking for real Pi utility
- **Freelancers** in regions where traditional platforms are hard to access
- **Small businesses** wanting to accept Pi payments
- **Students & professionals** looking to monetize their skills
- **Anyone** wanting to participate in the Pi economy

## 📱 Features Overview

### 🎯 **Tasks & Services**
- Browse available microjobs
- Post your own task requests
- Offer ongoing services
- Proposal and ordering system

### 🛒 **Marketplace**
- Product listings with images
- Category filtering
- Condition tracking (New, Like New, Good, etc.)

### 👤 **User Profiles**
- Unified profile showing tasks, services, and products
- Badge system (Fast Responder, Top Designer, etc.)
- Rating and review system

### 💬 **Messaging System**
- In-app chat for buyers and sellers
- Task/service/product contextual messaging

### 💰 **Pi Integration**
- Mock Pi authentication (for demo purposes)
- Pi balance display
- Pi payment simulation (no real transactions)

## 🎨 Design System

### Color Themes
  --color-primary: #2F9BC1;     
  --color-primary-dark: #1A5F7A;
  --color-success: #10B981;     
  --color-text: #1A1A1A;       
  --color-text-light: #4B5563;  
  --color-text-lighter: #9CA3AF;
  --color-background: #F3F4F6;  
  --color-card: #FFFFFF;   

## UI Highlights
- Responsive for mobile-first users
- Clean card-based layouts
- Glassmorphism effects for modern look
- Intuitive navigation and user flows
- Optimzed for Pi Browser dispay and mobile-first layouts

### Components
- Responsive design for all screen sizes
- Consistent card layouts
- glassmorphism effects
- Intuitive navigation and user flows


## Tech Stack
- Frontend: HTML, CSS, Vanila JS (Pi SDK integrated)
- Backend: Node.js + Express 
- Database: JSON files (for demo purposes)
- Payments: Pi Network SDK (U2A + A2U)
- Hosting: Pi Browser compatible server

## Hackathon Submission Status
- Core functionality built
- Pi Auth working via Pi SDK
- U2A Payments: working and tested
- A2U Transfers: functional and confirmed
- Mainnet Checklist: 9/10 completed (A2U count in progress)

## Note: Orbit is fully functional on Testnet and has completed 9/10 Mainnet requirements. A2U transaction confirmations are currently ongoing to finalize full Mainnet readiness. Despite this, all SDK flows (Login, U2A, A2U) have been successfully implemented and tested.

## Demo Video
[Watch the demo video here](https://youtu.be/MTEaL_z6Hjk?si=tw2yjs-qyZID8wsX)

## 🔮 Roadmap

### Phase 1: Core Platform ✅
	•	Microtask system (PiTask)
	•	Marketplace listings (PiMart)
	•	Pi SDK integration (U2A + A2U)
	•	Responsive UI design

## Phase 2: Ecosystem Expansion 🚧
	•	Escrow-based smart contracts
	•	Advanced search and filters
	•	Multi-language support
	•	Notifications and chat system

## Phase 3: Ecosystem Growth 🔮
	•	Business accounts
	•	Community task pools
	•	Third-party API integrations

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the Pi Open Source (PiOS) License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Pi Network for inspiring the project
- Open-source Community for inspiration and tools
- Pi SDK Library (pi-backend) - for seemless bloackchain integration
- Replit - for hosting the live backend

---

**Built with ❤️ for the Pi Network community**

*Making Pi useful, one transaction at a time.*

*Pi, Pi Network and the Pi logo are trademarks of the Pi Community Company.*