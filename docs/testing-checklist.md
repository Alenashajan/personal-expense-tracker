# Testing Checklist — Personal Expense Tracker

Record the date, tester, steps, expected result and actual result for each test. Do not mark a test as passed until you have run it.

| ID | Test | Expected result | Result |
|---|---|---|---|
| T01 | Start server with valid MongoDB URI | Server connects and starts on configured port | Not run |
| T02 | Open `/api/health` | JSON health response | Not run |
| T03 | Create expense with all required fields | HTTP 201 and saved record returned | Not run |
| T04 | Submit empty title | HTTP 400 with safe validation message | Not run |
| T05 | Submit zero or negative amount | HTTP 400; record is not saved | Not run |
| T06 | Submit unsupported category/payment mode | HTTP 400; record is not saved | Not run |
| T07 | List expenses | HTTP 200 with data and pagination metadata | Not run |
| T08 | Update an existing expense | Updated fields are returned and persisted | Not run |
| T09 | Delete an existing expense | Success message and record removed | Not run |
| T10 | Request an unknown ID | HTTP 404 if valid-format ID does not exist | Not run |
| T11 | Search title/notes | Only matching records appear | Not run |
| T12 | Filter by category | Only selected category appears | Not run |
| T13 | Filter by month | Only selected month appears | Not run |
| T14 | Open summary endpoint | Correct total, count and category totals | Not run |
| T15 | No expenses match filters | Friendly empty state appears | Not run |
| T16 | Stop backend and use UI | Clear error and retry option appear | Not run |
| T17 | Use 320px-wide viewport | Layout remains usable without clipped page content | Not run |
| T18 | Refresh page and re-open | Saved records persist in MongoDB | Not run |

## Manual integration flow
1. Start MongoDB, server and client.
2. Add a food expense of ₹250 and a transport expense of ₹80 with dates in the selected month.
3. Confirm the monthly total is ₹330 and transaction count is 2.
4. Edit one amount and verify the summary updates.
5. Search for a title and filter by category.
6. Delete one record and confirm totals update.
7. Test an invalid amount and a blank title.
8. Repeat at a narrow mobile viewport.

## Evidence to add for final submission
- Screenshot of dashboard with sample/demo data
- Screenshot of add/edit form and validation
- Screenshot of category summary
- API request/response evidence from Postman or Thunder Client
- Deployment URL and successful live test notes, if deployed
