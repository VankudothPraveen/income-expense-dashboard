# 🌿 XYZ Company – Farmhouse Expense & Income Tracking System

A modern, enterprise-grade web application built using **Angular (Standalone Components)** to manage, track, and visualize **income and expenses** for two farmhouse properties owned by **XYZ Company**.

This system provides **real-time financial insights**, **property-wise comparisons**, and **interactive dashboards** to support better financial decision-making.

---

## 🚀 Features

### 🔐 Authentication
- Secure login system (mock authentication)
- Route protection using Angular Guards
- Logout functionality with session handling
---
### 🏠 Property Management
- Supports two properties:
  - **Earthy Escape**
  - **Millennium Farm House**
- Property-wise transaction filtering
- Centralized property selection state
---
### 💰 Transaction Management
- Add Income & Expense transactions
- Categorized transactions (Booking, Maintenance, Utilities, etc.)
- Property-specific transaction views
- Latest transactions displayed on dashboards
---
### 📊 Dashboards
- **Main Dashboard**
  - Total Income
  - Total Expenses
  - Net Profit
  - Best Performing Property
- **Income Dashboard**
  - Property-wise income overview
- **Expense Dashboard**
  - Property-wise expense breakdown
- Real-time updates when data changes
---
### 📈 Data Visualization
- Interactive charts using **Chart.js**
  - Income vs Expense (Bar Chart)
  - Expense Distribution (Pie Chart)
  - Property Profit Comparison
- Charts update dynamically based on backend data
---
### 📄 Reports
- Consolidated financial reports
- Property-wise insights
- Ready for CSV export enhancement

---

## 🛠️ Tech Stack

- **Angular (Latest Stable Version)**
- **Standalone Components**
- **Reactive Forms**
- **RxJS & Observables**
- **Chart.js**
- **JSON Server** (Mock Backend)
- **Pure CSS** (No Bootstrap / Material UI)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── income-dashboard/
│   │   ├── expense-dashboard/
│   │   ├── transactions/
│   │   ├── reports/
│   │   ├── login/
│   │   └── navbar/
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── transaction.service.ts
│   │   └── property.service.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── models/
│   └── app.routes.ts
├── assets/
└── db.json
---
##main Dashboard and charts:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5ed8caf6-186a-488b-8ff3-e9ba167bc2cf" />
---
##Income Dashboard and charts:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ca8c2b2f-85c9-4f1f-8247-905260b2738f" />
---
##Expenxe Dashboard and charts:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/152d918b-8b3f-4025-9956-483a39da7f80" />
---
##Earthy escape Transactions:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e51eea1c-2ca5-4644-b8a8-b88e253e6f4e" />
---
###millineium Farm house Transactions:
<img width="960" height="388" alt="image" src="https://github.com/user-attachments/assets/d7269203-1f92-440d-87ee-bd351bd13b51" />
---
###Add custom Transactions:
<img width="947" height="448" alt="image" src="https://github.com/user-attachments/assets/c878eafc-7691-4cdd-beaa-9fa3b1128218" />
---
###login form and authentication:
<img width="882" height="425" alt="image" src="https://github.com/user-attachments/assets/c9d2b0a0-241a-47e5-99df-27460216a3b8" />
---
###logout button at top right:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1b019823-48c9-43c5-a1d5-22e4b1661fa2" />











