# HR Information System

This Ubuntu HR is a Human Resources (HR) system that allows users to interact with various HR-related services, including job applications, attendance tracking, leave management, payroll, and more.

## Features

- Browse and apply for available job postings  
- Log working hours for attendance (Employees)  
- View and apply for leave (Employees)  
- View and download payslips (Employees)  
- HR dashboards with summary charts (HR Managers)  
- HR manager AI assistance (HR manager) 
- Employee and application management (HR Managers)  
- Leaves management (HR managers)

## User Roles

### 1. **Applicants**
- View job listings  
- Apply for jobs  

### 2. **Employees**
- Log hours for attendance  
- View and apply for leave  
- View and download payslips  
- View and apply for job posts  
- keep track of logged ours per week

### 3. **HR Managers**
- View summary charts and dashboards 
- Chat with ai to gain more insights 
- Add, edit, and delete employee records  
- Approve or decline leave requests  
- Create, edit, and manage job posts  
- Track job applications  
- Approve or decline job applications  
- Schedule interviews  
- Send payslips to employees  
- Add and manage internal projects  

## Front-end Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)  
- **Language:** TypeScript  

## Backend-end Tech Stack

- **Framework:** [ABP Zero Boilerplate](https://aspnetboilerplate.com/)
- **Language:** C# (.NET 9 SDK)
- **Architecture:** Modular Monolith
- **Patterns:** Domain-Driven Design (DDD), Unit of Work, Repository, Dependency Injection
- **Database:** Postgress SQL 


## Getting Started

To run the project locally, follow these steps:

### Prerequisites
Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0) (required for backend services)


### Front-end Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hlakudi200/hris-repo.git
   cd hris-repo/hris
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables. Example:
   ```
   NEXT_PUBLIC_API_BASE_URL=your_base_api_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.


## 🔧 Backend Setup (ABP Zero Boilerplate - Visual Studio)

Follow the steps below to get the backend up and running using **Visual Studio** and **ABP Zero Boilerplate**:

---

### 🧭 Step-by-Step Guide

1. **Open the Solution:**

   - Launch **Visual Studio 2022** or later.
   - Click on **Open a project or solution**.
   - Navigate to the `aspnet-core/` folder and open the solution file:
     ```
     YourProject.sln
     ```

2. **Set the Startup Project:**

   - In the **Solution Explorer**, right-click on:
     ```
     YourProject.Web.Host
     ```
   - Select **Set as Startup Project**.

3. **Configure Database Connection:**

   - Open the file:
     ```
     YourProject.Web.Host/appsettings.json
     ```
   - Update the connection string:
     ```json
     "ConnectionStrings": {
       "Default": "Server=localhost;Database=YourDatabase;User Id=your_user;Password=your_password;"
     }
     ```
   - Make any necessary changes to email, authentication, or other configurations.

4. **Apply Database Migrations:**

   - Open the **Package Manager Console** (found under `Tools > NuGet Package Manager`).
   - Make sure the **Default Project** is set to the `.EntityFrameworkCore` project (e.g., `YourProject.EntityFrameworkCore`).
   - Run the following command:
     ```powershell
     Update-Database
     ```

5. **Run the Backend:**

   - Press `F5` or click the **Start Debugging** button.
   - The backend should be running at:
     ```
     https://localhost:44311
     ```

---

### ✅ Notes

- Ensure SQL Server is running locally or accessible remotely.
- Verify that ports are not blocked by your firewall or antivirus.
- Enable CORS in `Startup.cs` or `appsettings.json` to allow requests from the frontend domain (`http://localhost:3000`).
- You can log into the admin panel via the `/Admin` route after running the backend.

---

## Repository

🔗 GitHub: [https://github.com/hlakudi200/hris-repo](https://github.com/hlakudi200/hris-repo)

## Domain model 
Domain model : [https://lucid.app/lucidchart/4cf2a767-5758-4807-9106-bec6b22158b2/edit?viewport_loc=-3713%2C249%2C2287%2C1079%2C0_0&invitationId=inv_3b9e82dd-a001-4917-a70d-719506799ef9](https://lucid.app/lucidchart/4cf2a767-5758-4807-9106-bec6b22158b2/edit?viewport_loc=-3713%2C249%2C2287%2C1079%2C0_0&invitationId=inv_3b9e82dd-a001-4917-a70d-719506799ef9)

## Wire frame 
wire frame : [https://www.figma.com/design/wwmsZTLcQ79WUgDGyjOusK/Untitled?node-id=0-1&t=VWuF56PZlYSfPWhG-1](https://www.figma.com/design/wwmsZTLcQ79WUgDGyjOusK/Untitled?node-id=0-1&t=VWuF56PZlYSfPWhG-1)
## Link to site 
hris-project-orpin.vercel.app/
