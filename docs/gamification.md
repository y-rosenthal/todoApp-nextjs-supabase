# Gamification Feature

This document describes the gamification feature implemented in the task management application.

## Overview

The gamification feature awards users points for completing tasks. These points are displayed on the user's profile page.

## Implementation Details

### Database Changes

- A `points` column has been added to the `profiles` table to store the user's gamification points.

### Task Completion

- When a user marks a task as complete, they are awarded 10 points.
- The `useTaskManager` hook has been modified to handle this logic.
- The `toggleTaskComplete` function now calls the `updateUserProfile` function to update the user's points in the database.

### Profile Page

- The user's points are displayed on their profile page.
- The `app/profile/page.tsx` file has been updated to display the points.
