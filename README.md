# docugen-hub 📄✨

Craft your academic files in seconds.

docugen-hub is a premium, lightning-fast web application designed to help university students instantly generate standard practical file covers and bonafide certificates. Built with a stunning modern glassmorphism UI, docugen-hub takes the hassle out of formatting academic submissions.

## 🚀 Features

* **Instant Generation:** Fill out your details once and generate high-resolution PDF covers in seconds.
* **Premium UI/UX:** Fluid, responsive split-screen design with glassmorphism effects, smooth micro-interactions, and a floating workspace dashboard.
* **Smart Auto-Fill:** Automatically maps your Course selection to the correct Faculty and Department.
* **Local Data Retention:** Securely saves your form inputs locally so you don't have to re-type them.
* **Dark Mode 🌙:** First-class dark mode support that adapts to system preferences.
* **In-App Preview:** View your generated PDF directly inside the app before downloading.

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Backend API:** Google Apps Script (Serverless PDF generation)
* **Deployment:** Vercel

## 💻 Getting Started

### Prerequisites

Make sure you have **Node.js** installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/shivaarajput/docugen-hub.git
cd docugen-hub
```

Install dependencies:

```bash
npm install
```

Ensure you have **lucide-react** installed for icons.

### Configure API Endpoint

Open `src/App.jsx` (or main component) and replace the placeholder:

```js
const API_ENDPOINT = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_URL/exec';
```

### Run development server

```bash
npm run dev
```

Open browser:

```
http://localhost:5173
```

## 🌍 Deployment (Vercel)

1. Push code to GitHub.
2. Go to Vercel → Add New Project.
3. Import repository.
4. Click **Deploy**.

(Optional) Update domain in Open Graph meta tags for better sharing preview.

## 🎨 Assets

* **Favicon:** `favicon.svg`
* **Social Preview:** `preview.svg` (1200x630 OG image)

## 📄 License

MIT License.

---

## ❤️ Credits

**Made with ❤️ by Shiva**
GitHub: [https://github.com/shivaarajput](https://github.com/shivaarajput)

Built for students, by students.
