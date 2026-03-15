# Fixoo — On-Demand Service Marketplace

**Enterprise-grade mobile platform connecting customers with verified professionals for instant home, automotive & emergency services.**

[![Expo](https://img.shields.io/badge/Expo-51.0-blue?style=flat-square&logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-green?style=flat-square&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Reanimated](https://img.shields.io/badge/Reanimated-3.16-purple?style=flat-square)](https://docs.swmansion.com/react-native-reanimated/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 🎯 Overview

**Fixoo** is a dual-app ecosystem (Customer + Worker) built for high-performance, real-time service delivery. It features:

- **Seamless OTP + Email login** with production-ready flows
- **Live tracking** with animated vehicle icons (Reanimated + SVG)
- **Real-time chat** with delivery status & media support
- **SOS safety system** with 5-second hold trigger + location sharing
- **Customer approval workflow** for additional charges (modal-driven)
- **Analytics dashboard** with Line + Pie charts
- **Multi-step worker onboarding** with document verification simulation

Built with modern architecture patterns, production-grade animations, and scalability in mind — ready for Socket.io, Firebase, or custom backend integration.

---

## ✨ Key Features

### Customer App (Expo Router)
- Phone OTP + Email/Password authentication
- Service booking with multi-select specs, photo upload (max 4), urgent/ASAP
- Live worker carousel with pulsing "online" indicator
- Real-time booking tracking + in-app chat
- Shopping catalog (tools + services) with cart
- Profile + booking history

### Worker App (React Navigation)
- Animated real-time map with moving delivery bike (Reanimated loop)
- Job request simulation every 30s + push-style notifications
- Customer verification modal for extra charges
- Job history with earnings analytics (Line + Pie charts)
- Full chat + voice note simulation
- SOS safety screen + emergency contacts
- Multi-step registration (Personal → Docs → Bank) with progress tracking

### Shared Excellence
- Beautiful custom SVG vehicle icons (Bike, Van, Emergency)
- Consistent design system (`ui/` components)
- Tailwind + dark-mode ready styling
- Offline-first ready architecture

---

## 🛠 Tech Stack

| Layer              | Technology                          | Purpose                              |
|--------------------|-------------------------------------|--------------------------------------|
| **Framework**      | React Native + Expo 51              | Cross-platform (iOS/Android)         |
| **Navigation**     | Expo Router (Customer) + React Navigation 6 (Worker) | Production routing             |
| **Animations**     | Reanimated 3 + react-native-svg     | Wheel rotation, pulsing, live map    |
| **Maps**           | react-native-maps + Marker.Animated | Real-time tracking                   |
| **Charts**         | react-native-chart-kit              | Earnings & completion analytics      |
| **UI**             | Tailwind + NativeWind + Custom UI   | Consistent, beautiful components     |
| **File Upload**    | expo-document-picker                | Worker document verification         |
| **State**          | Local + ready for Zustand/Redux     | Scalable global state                |
| **Backend Ready**  | Axios + Mock API (192.168.x.x)      | Plug-and-play with Node.js/Express   |

---

## 📁 Project Structure

```bash
fixoo/
├── customer-app/               # Expo Router version
│   ├── app/                    # Routes (Home, ServicesProvide, etc.)
│   ├── components/
│   ├── assets/
│   └── global.css
│
├── worker-app/                 # React Navigation version
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── RealTimeMap.tsx
│   │   ├── AnimatedBikeIcon.tsx
│   │   ├── VehicleIcons.tsx
│   │   ├── Safety.tsx
│   │   ├── Notifications.tsx
│   │   └── ui/                 # Reusable components
│   └── index.tsx               # Main entry
│
├── shared/                     # Future shared logic
├── README.md
└── LICENSE
 ```
Quick Start
Prerequisites

Node.js 20+
Expo CLI (npm install -g expo-cli)
iOS Simulator / Android Emulator

 ```bash
 # Clone the monorepo
git clone https://github.com/yourusername/fixoo.git
cd fixoo

# Customer App
cd customer-app
npm install
expo start

# Worker App (in new terminal)
cd ../worker-app
npm install
npx expo start   # or npm start

```
License
MIT © 2026 Fixoo Team

Built with passion for clean architecture, buttery animations, and real-world scalability.
Senior-level React Native engineering at its finest
