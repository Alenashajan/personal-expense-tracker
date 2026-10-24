# Project Brief

## Problem statement
Daily expenses can be difficult to track consistently, making it hard to understand where money is spent each month.

## Target users
- Individual demo user: records and reviews expenses.
- Admin/reviewer: evaluates project behaviour using demo records.

The current MVP has no authentication, so it is not intended for real private multi-user use.

## User stories and acceptance criteria
1. As a user, I want to add an expense so that I can keep a record.
   - A title, category, positive amount, date and payment mode are required.
   - Invalid input returns a clear message and is not saved.
   - A successful save appears in the transaction list.
2. As a user, I want to edit or delete an expense so that I can correct mistakes.
   - The selected record is updated or removed.
   - Summary totals refresh after the operation.
3. As a user, I want to search and filter expenses so that I can find records.
   - Search matches title or notes.
   - Category and month filters narrow the result list.
4. As a user, I want a monthly summary so that I can review spending.
   - The API returns total, count and category totals for the selected month.
   - Empty months return zero totals and an empty category list.

## Data model
Expense: title (string), category (enum), amount (number > 0), date (date), paymentMode (enum), notes (string), createdAt and updatedAt (timestamps).

## Non-functional considerations
- Responsive interface, semantic labels and keyboard-usable controls.
- Server-side validation and safe error messages.
- Environment variables for configuration; no committed secrets.
- API pagination with a maximum page size.
- MongoDB indexes for date and category/date queries.

## Future scope
Authentication and authorization, user ownership checks, budgets, recurring expenses, exports and deployment.
