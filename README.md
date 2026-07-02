# 🛡️ ThreatLens AI

live demo https://threat-lens-red.vercel.app/

> AI-Powered Fraudulent APK Analysis & Risk Intelligence Platform for Banking Security

ThreatLens AI is an intelligent cybersecurity platform that automates the reverse engineering, static analysis, dynamic analysis, and risk assessment of suspicious Android applications (APKs). Designed specifically for the banking sector, the platform leverages Generative AI to transform complex malware behavior into human-readable investigation reports, enabling security analysts to detect and respond to threats more efficiently.

---

## 📌 Problem Statement

**Harnessing Generative AI for Automated Reverse Engineering, Static & Dynamic Analysis, and Risk Scoring of Fraudulent Mobile Applications (APKs) and Malware.**

Fraudulent Android applications have become one of the leading causes of digital banking fraud. Existing malware analysis solutions often require extensive manual investigation, making incident response slow and resource-intensive.

ThreatLens AI addresses this challenge by combining AI-powered malware interpretation, static and dynamic APK analysis, threat intelligence, and explainable risk scoring into a unified investigation platform.

---

# ✨ Features

- 🤖 AI-Powered Reverse Engineering
- 📱 Static APK Analysis
- ⚡ Dynamic Behaviour Monitoring
- 🏦 Banking Fraud Detection
- 📊 Explainable Risk Scoring
- 🌐 Threat Intelligence Integration
- 📄 Automated Investigation Reports
- 📈 Security Analyst Dashboard
- 🔒 Secure APK Upload & Analysis
- 📂 Historical Investigation Repository

---

# 🏗️ System Workflow

1. Upload suspicious APK
2. Static APK Analysis
3. Dynamic Behaviour Monitoring
4. AI Malware Interpretation
5. Threat Intelligence Correlation
6. Risk Score Generation
7. AI Investigation Report
8. Dashboard Visualization

---

# 🧠 Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Motion
- Lucide React
- Recharts
- Zustand

## Backend

- Node.js
- Express.js
- TypeScript
- Multer
- Helmet
- CORS

## Artificial Intelligence

- Google Gemini API
- Custom Risk Scoring Engine

## Authentication

- Firebase Authentication

## Threat Intelligence

- VirusTotal API

## Deployment

- Docker
- Git
- GitHub

---

# 📂 Project Structure

```
ThreatLens-AI/
│
├── client/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   └── assets/
│
├── server/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── uploads/
│   └── utils/
│
├── shared/
│
├── Dockerfile
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/ThreatLens-AI.git
```

## Navigate

```bash
cd ThreatLens-AI
```

## Install Dependencies

```bash
npm install
```

## Configure Environment

Create a `.env` file.

```env
GEMINI_API_KEY=YOUR_API_KEY
VIRUSTOTAL_API_KEY=YOUR_API_KEY
FIREBASE_API_KEY=YOUR_API_KEY
```

## Start Development Server

```bash
npm run dev
```

---

# 📊 Core Modules

### APK Upload Module

Securely accepts suspicious Android APK files for investigation.

### Static Analysis Engine

- Manifest Analysis
- Permission Analysis
- API Detection
- URL Extraction
- Resource Inspection

### Dynamic Analysis Engine

- Runtime Monitoring
- Network Behaviour
- API Call Monitoring
- Overlay Detection
- Suspicious Activity Detection

### AI Threat Engine

Uses Google Gemini to:

- Explain malware behaviour
- Reverse engineer threats
- Generate investigation summaries
- Map banking fraud patterns

### Risk Scoring Engine

Assigns

- 🟢 Low
- 🟡 Medium
- 🟠 High
- 🔴 Critical

risk levels using explainable AI.

### Investigation Report

Automatically generates

- Malware Summary
- Indicators of Compromise
- Banking Fraud Risks
- AI Explanation
- Recommended Actions

### Security Dashboard

Provides

- Threat Overview
- Analysis History
- Risk Analytics
- Investigation Reports
- Alerts & Notifications

---

# 🎯 Use Cases

- Banking Security Operations Centers (SOC)
- Mobile Malware Investigation
- Fraud Detection Teams
- Incident Response
- Digital Banking Security
- Cybersecurity Research

---

# 🔮 Future Roadmap

- Real-time Malware Monitoring
- Zero-Day Malware Detection
- SIEM Integration
- Enterprise SOC Dashboard
- Cross-Platform Malware Analysis
- Cloud Sandbox Execution
- Advanced AI Risk Prediction
- National Threat Intelligence Integration

---

# 👥 Team

**Team Name:** CodeCRUD

- Mohd Afnan
- Mohammad Bashar
- Abhinav Dwivedi
- Ayan Ahmad

---

# 📜 License

This project was developed as part of a hackathon submission and is intended for educational and research purposes.

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
