# NextRole

**NextRole** is a modern, full-stack job portal designed to streamline the job application process for both recruiters and candidates. Built with a robust tech stack, it offers a seamless experience for job posting, application management, and candidate tracking.

🔗 **Live Demo**: [next-role-xi.vercel.app](https://next-role-xi.vercel.app)

---

## 🚀 Features

- **User Authentication**: Secure sign-up and login functionality using Clerk.
- **Role-Based Access**: Distinct dashboards and functionalities for recruiters and candidates.
- **Job Management**:
  - Recruiters can post, edit, and delete job listings.
  - Toggle hiring status between open and closed.
- **Application Tracking**:
  - Candidates can apply to jobs and track their application status.
  - Recruiters can view and manage applications for their postings.
- **Company Profiles**: Recruiters can create and manage company profiles with logos and descriptions.
- **Saved Jobs**: Candidates can save jobs for future reference.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Lucide Icons](https://lucide.dev/)
  - [React Hook Form](https://react-hook-form.com/)
  - [Clerk](https://clerk.dev/) for authentication

- **Backend**:
  - [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)

- **Deployment**:
  - [Vercel](https://vercel.com/)

---

## 📸 Screenshots

![Homepage](https://next-role-xi.vercel.app/screenshots/homepage.png)
*Homepage showcasing featured jobs.*

![Job Details](https://next-role-xi.vercel.app/screenshots/job-details.png)
*Detailed view of a job listing.*

![Recruiter Dashboard](https://next-role-xi.vercel.app/screenshots/recruiter-dashboard.png)
*Dashboard for recruiters to manage job postings.*

![Candidate Dashboard](https://next-role-xi.vercel.app/screenshots/candidate-dashboard.png)
*Dashboard for candidates to track applications.*

---

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Abhishek-17h/NextRole.git
   cd NextRole
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create a `.env` file in the root directory and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```
NextRole/
├── public/             # Static assets
├── src/
│   ├── api/            # API calls to Supabase
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── App.jsx         # Root component
│   └── main.jsx        # Entry point
├── .env                # Environment variables
├── package.json        # Project metadata and scripts
└── vite.config.js      # Vite configuration
```

---

## 🙌 Acknowledgements

- [Clerk](https://clerk.dev/) for seamless authentication.
- [Supabase](https://supabase.com/) for backend services.
- [Lucide Icons](https://lucide.dev/) for beautiful icons.
- [React Hook Form](https://react-hook-form.com/) for efficient form handling.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
