# ICT ACADEMY OF KERALA
## Summer Internship Report
### Full Stack Application Development with ReactJS

**Project title:** Personal Expense Tracker — MERN Stack  
**Student name:** [Enter your name]  
**Institution:** [Enter your institution]  
**Submission date:** [Enter date]

> Student note: Replace all bracketed fields, add your own screenshots and test evidence, and revise the report to reflect what you actually implemented. Do not claim deployment or test results that you have not verified.

## EXECUTIVE SUMMARY
The Personal Expense Tracker is a web application designed to help users record and review day-to-day spending in one place. It provides forms for adding and updating expenses, a transaction list, search and category/month filters, and a monthly summary that groups spending by category. The project uses React for the user interface, Node.js and Express for the REST API, and MongoDB with Mongoose for persistent storage. Its primary objective is to demonstrate full-stack application development, including client/server integration, CRUD operations, data validation, database aggregation, responsive design and basic testing. The final outcomes and test evidence should be completed after the application has been run and verified.

## INTRODUCTION
Keeping track of small daily purchases can be difficult when records are spread across notes, messages or receipts. Without a consistent record, it may be hard to understand spending patterns or compare expenses across categories. The Personal Expense Tracker addresses this problem by providing a simple interface for recording expenses and reviewing a selected month's spending. The project is built with the MERN stack: MongoDB stores expense records, Express and Node.js provide API endpoints, and React renders the interactive interface. The system is intended as a learning project and does not claim to provide bank integration, financial advice or production-grade multi-user account security.

## OBJECTIVES
1. Build a responsive React interface for recording and managing expenses.
2. Implement create, read, update and delete operations through a REST API.
3. Store expense data persistently in MongoDB using Mongoose schemas and validation.
4. Provide search and category/month filtering.
5. Calculate monthly totals and category-wise totals using backend aggregation.
6. Practise environment configuration, error handling, API testing and project documentation.
7. Prepare the project for version control and possible deployment.

## SCOPE AND DELIVERABLES
### Included in the MVP
- Dashboard with monthly total, transaction count, categories used and average expense.
- Expense fields: title, category, amount, date, payment mode and optional notes.
- Add, edit and delete operations.
- Search by title or notes and filter by category/month.
- Monthly category breakdown.
- Express API with validation, consistent JSON responses and error handling.
- MongoDB persistence and responsive styling.
- README, environment examples and test checklist.

### Outside the current scope
User registration, authentication, per-user data separation, bank account connectivity, recurring payments, budget alerts, CSV export and advanced analytics are future enhancements.

### Deliverables
- React client source code.
- Express backend source code.
- Mongoose expense model and REST API.
- Setup instructions and environment examples.
- Testing checklist and project documentation.
- [Add verified screenshots, GitHub repository URL and live URL.]

## METHODOLOGY
The project follows an incremental development approach. First, the problem, target user, minimum viable features and expense fields are defined. Next, the application is separated into a React client and an Express API. The API exposes resource-based endpoints, validates incoming data, and uses a Mongoose model to read and write records in MongoDB. The React client sends HTTP requests through a central API service and updates the interface based on the response. The monthly summary is calculated on the backend using aggregation, avoiding reliance on a client-only total. Finally, CRUD operations, validation, filters, error states and responsive layouts should be tested and documented.

## PROJECT ACTIVITIES
### 1. Requirement analysis
The required expense fields and main user actions were identified. The MVP was kept focused on expense records and monthly reporting to avoid adding features before the core flow works.

### 2. User interface development
React components were created for the dashboard, summary cards, transaction list and add/edit form. The layout uses a green visual theme and adapts to narrower screens. Loading, empty and error states are included in the interface.

### 3. Backend development
An Express application was created with expense routes, controller functions and centralized error handling. The API supports listing, creating, retrieving, updating and deleting expense records, as well as a monthly summary endpoint.

### 4. Database design
A Mongoose schema defines title, category, amount, date, payment mode and notes. Required fields, allowed categories/payment modes, amount limits and text length constraints are applied. Date and category indexes support common queries.

### 5. Integration
The React API service sends requests to the Express backend using an environment-configured base URL. The API responds with JSON, and the interface displays updated records or safe error messages.

### 6. Testing and debugging
Use the accompanying testing checklist to verify valid and invalid inputs, CRUD operations, filters, summary totals, server errors and mobile layout. Add the actual outcomes and screenshots after executing each test.

## RESULTS & FINDINGS
The intended deliverable is a working expense-management application with persistent records, filtered transaction views and monthly/category summaries. The project demonstrates how a React interface can communicate with an Express REST API and how MongoDB aggregation can calculate summary information. Final findings must be based on tests actually performed.

**Verified test results:** [Add passed/failed test counts and evidence after testing.]

**Screenshots:** [Insert dashboard, add/edit form, filtered transactions and category summary screenshots.]

**Known limitations:** The current MVP does not include user authentication or separate data for multiple users. It should be run with demo data only until access control is implemented. Deployment is not considered complete until the client, API and database have been configured and tested online.

## CONCLUSION
The Personal Expense Tracker provides a practical way to demonstrate core MERN stack concepts through a focused full-stack application. It brings together React components, REST API design, server-side validation, MongoDB persistence, CRUD operations and aggregation-based summaries. The project also highlights the importance of clear folder structure, environment variables, error handling, responsive design and repeatable testing. Further improvements could include secure authentication, user-specific records, budget limits, recurring expenses, CSV export and visual comparisons over time. The final conclusion should be updated to reflect the actual implementation, testing results and any deployment completed by the student.

## APPENDIX
### Suggested screenshots
1. Main dashboard and monthly summary
2. Add expense form
3. Edit expense form
4. Search/category filter results
5. Validation message for invalid input
6. API test evidence
7. Mobile/responsive view

### Submission links
- GitHub repository: [Add URL]
- Live frontend: [Add URL if deployed]
- Live API health endpoint: [Add URL if deployed]
