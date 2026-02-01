# Recipe Box – Technical Assessment

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
   - [Setup](#setup)
   - [Docker](#docker-required)
3. [Screenshots / GIFs](#screenshots--gifs)
4. [Tech Stack](#tech-stack)
5. [Folder Structure](#folder-structure)
6. [Accessibility (a11y)](#accessibility-a11y)
7. [UX Decisions](#ux-decisions)
8. [Assumptions](#assumptions)
9. [Trade-offs & Challenges](#trade-offs--challenges)
10. [Future Improvements](#future-improvements)
11. [Time Spent](#time-spent)
12. [Resources](#resources)
13. [Reflection](#reflection)

## Overview

This project is a front-end recipe application built as part of a technical assessment. The goal was to demonstrate not only technical proficiency, but also UX reasoning, design sensibility, and the ability to make pragmatic trade-offs under time constraints.

## Quick Start

### Setup

    git clone https://github.com/KaeTheDev/Recipe-Box.git
    cd recipe-box
    npm install

### Docker (Required)
You can start the application using **either** Docker Compose **or** standard Docker commands.

**Option 1: Docker CLI**

    docker build -t recipe-box .
    docker run -p 3000:3000 recipe-box
**Option 2: Docker Compose**

    docker-compose up --build

The application will be available at `http://localhost:3000`

## Screenshots / GIFs

#### 1. Recipe Creation
![Recipe Creation](assets/gifs/create-recipe.gif)

#### 2. Shopping List Aggregation
![Shopping List](assets/gifs/shopping-list.gif)

#### 3. Toast Feedback
![Toast](assets/gifs/dark-mode.gif)


## Tech Stack
-  **React** – Component-based UI development and state management
    
-  **TypeScript** – Type safety, scalability, and clearer mental models while building
    
-  **Tailwind CSS** – Rapid, consistent styling and responsive design

- **React Router DOM** – Client-side routing and navigation flow between views

- **Lucide React** – Lightweight, consistent icon system for clear visual cues
    
-  **LocalStorage** – Persistence layer for recipes and shopping lists
    
-  **react-hot-toast** – User feedback and interaction confirmation

### Why This Stack?
TypeScript with React helped enforce clear data contracts and reduced runtime errors as the application grew. Tailwind CSS allowed me to focus on layout, spacing, and responsiveness without slowing development, which was critical given the assessment timeline.

## Folder Structure
```
src/
  assets/
  components/
    AddRecipeForm/
      AddRecipeForm.tsx
    Cooking/
      AllStepsList/
      CookingIngredientsList/
      CookingModeHeader/
      CookingStepCard/
      RecipeCompleteModal/
    Cuisine/
      CuisineCard/
      ExploreCuisineSection/
    Home/
      AllRecipesSection/
      FeaturedRecipesSection/
      HeroSection/
      RecipeCard/
    QuickPick/
      QuickPickCard/
      QuickPickSection/
    RecipeDetail/
      RecipeActions/
      RecipeDetailHero/
      RecipeDetails/
      RecipeIngredients/
      RecipeInstructions/
    ServingAdjuster/
      ServingAdjuster.tsx
    Shared/
      Navbar/
        Navbar.tsx
    Shopping/
      CategorySection/
      EmptySection/
  config/
    cuisineImages.ts
  data/
    seedData.ts
  pages/
    AddRecipePage.tsx
    CookingPage.tsx
    CuisineRecipesPage.tsx
    FavoritePage.tsx
    HomePage.tsx
    QuickPickPage.tsx
    RecipeDetailPage.tsx
    ShoppingPage.tsx
  types/
    Recipe.ts
    RecipeProps.ts
    ShoppingList.ts
  utils/
    recipes.ts
    shoppingList.ts
  App.tsx
  index.css
  main.tsx

Project root
  .dockerignore
  .gitignore
  docker-compose.yml
  Dockerfile

```


# Project root
.dockerignore
.gitignore
docker-compose.yml
Dockerfile

## Accessibility (a11y)
- Ensured sufficient contrast for text and interactive elements
- Focus states are visible on buttons and links
- Used semantic HTML elements (buttons, headings, lists) for better screen reader support
- Aria labels added for interactive icons (e.g., favorite button, navigation icons)
- Mobile-first design supports touch interactions and one-handed use

## UX Decisions

 - **Design-first flow**: I initially structured each page (Home, Recipe Details, Cooking View) with static content to validate navigation, hierarchy, and mobile usability before wiring up state and CRUD logic. This ensured that the core user journey (discover → cook → save) felt intuitive.
 
 - **Mobile-first cooking experience**: Typography size, spacing, and contrast were intentionally optimized for one-handed use and quick scanning while cooking.
 
 - **Skeleton & Loading States**: Treated as a core feature rather than a “nice to have” because seeded data can load slowly from localStorage. Skeletons improve perceived performance and prevent layout shifts.
 
 - **Toast Feedback**: Used toast notifications to provide immediate, non-blocking feedback for user actions (save, delete, unavailable features), keeping users informed without interrupting flow.

## Assumptions

 - **Timeline**: Although the assignment allowed flexibility, I assumed a realistic delivery window of **3–6 days**, based on prior experience building projects of similar scope in a 16-week bootcamp.
 
 - **Scope Control**: Given the time constraint, I assumed that delivering a smaller set of features with strong UX and polish would be more valuable than implementing all features superficially.

 - **Frontend Focus**: I assumed this iteration would remain frontend-only, influencing decisions around persistence, image handling, and the deferral of user-specific analytics.

These assumptions directly informed technology choices, feature prioritization, and trade-offs.

## Trade-offs & Challenges

### Deferred Features (Not in v1.0)

 - **Recipe Suggestions**: Omitted because meaningful suggestions based on available ingredients would require more advanced matching logic and/or backend support. This is better suited for a later iteration.
 
 - **Personal Statistics**: Deferred due to the need for user accounts and historical usage tracking, which would significantly expand scope into full-stack territory.
 
 - **Recipe Sharing**: Shareable URLs could not be reliably implemented using HashRouter with GitHub Pages within the time constraint. Instead, the UI communicates intent via a "Coming Soon" toast.

- **Dark Mode**: Considered and designed for accessibility and contrast, but implementation (Tailwind JS toggle + preference syncing) was beyond the timeline. Fully supported in future updates.


### URL Sharing

 - **Issue**: HashRouter and GitHub Pages limitations prevented reliable shareable URLs.
 
 - **Outcome**: Implemented a clear “Coming Soon” toast rather than removing the feature, preserving UX clarity.

### Seeded Data Validation

 - **Issue**: Seeded recipes initially violated validation rules used in the Add Recipe form (tags structure).
 
 - **Solution**: Updated seed data to match the same contracts enforced for user-generated data.

### Shopping List Aggregation

 - **Issue**: Aggregating shared ingredients without duplication.

 - **Solution**: Implemented logic to sum identical items across recipes.
 
 - **Limitation**: Semantically similar but differently named ingredients (e.g., “Eggs” vs. “Super Eggs”) are treated as separate entries.

### Image Handling

 - **Issue**: Uploaded images stored in localStorage break on refresh.

 - **Attempt**: Base64 encoding fixed persistence but exceeded storage limits.

 - **Final Decision**: Use image URLs as the `img`  `src`, which provides reliable persistence for a frontend-only app.

 - **Future Approach**: In a full-stack version, support both uploads and URLs via cloud storage.

## Future Improvements

 - User authentication and dashboards
 - Personal cooking statistics and insights
 - Shareable recipe URLs using HashRouter-compatible routing
 - Ingredient normalization for more accurate shopping list aggregation
 - Backend persistence and cloud image uploads
 - Recipe suggestion engine based on available ingredients
 - Dark Mode
 
 ## Time Spent
 - **Total**: ~25–30 hours
    
-  **Timeline**: January 26 – January 31
    
-  **Daily Effort**: ~5+ hours per day

While the project initially appeared small in scope, planning and implementation revealed meaningful complexity. Scope creep was a constant risk, making early UX and design decisions was critical to staying on track.

## Resources
- **Critical**
  - Dockerizing a React App: https://www.docker.com/blog/how-to-dockerize-react-app/
  - TailwindCSS Documentation: https://tailwindcss.com/docs/installation/using-vite
  - React Documentation: https://react.dev/learn
  - TypeScript Documentation: https://www.typescriptlang.org/docs/
  - Local Storage - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

- **Helpful**
  - Aggregation in JavaScript: https://www.geeksforgeeks.org/javascript/aggregation-in-javascript/
  - Aggregate Array of Objects: https://5k.io/aggregate-array-of-objects-by-key-in-javascript/
  - React Hot Toast: https://react-hot-toast.com
  - Local Storage - https://blog.logrocket.com/localstorage-javascript-complete-guide/

## Reflection
This project helped clarify my evolving development process. In hindsight, starting with core CRUD functionality before polishing UI would have been more efficient. However, knowing that UX and design were a major evaluation criterion influenced my decision to prioritize layout and flow early. This assessment reinforced the importance of balancing design, functionality, and time constraints in real-world development.
