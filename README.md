# Auto Portfolio Template

A dynamic automotive photography portfolio built with vanilla HTML, CSS, and JavaScript on the frontend, powered by a Sanity.io headless CMS backend.

This template allows you to manage home page content, featured images, and an infinite-scroll photo feed directly from a custom Sanity Studio dashboard without touching the frontend code.

## Project Structure

* **/AutoPortfolio**: The frontend website (HTML, CSS, JS). This is what the public sees.
* **/auto-cms**: The Sanity CMS Studio. This is the backend dashboard where you upload photos and edit text.

## Prerequisites

To use this template and run the project locally, you will need:
* Node.js installed on your machine.
* A [Sanity.io](https://www.sanity.io/) account.
* A [Vercel](https://vercel.com/) account (for deployment).

## Setup & Installation

### 1. Clone the Repository
Open your terminal and clone the repository to your local machine:
```bash
git clone https://github.com/YOUR-USERNAME/AutoPortfolioTemplate.git
cd AutoPortfolioTemplate
```

### 2. Initialize Your Sanity CMS (Backend)
Because this is a template, you need to link the backend to your own Sanity account so you can manage your own photos.
```bash
# Navigate to the CMS directory
cd auto-cms

# Install the required dependencies
npm install

# Log in to your Sanity account
npx sanity login

# Initialize a new project connected to your account
npx sanity init --reconfigure
```
*Note: Follow the prompts to create a new project and use the default `production` dataset.*

### 3. Connect the Frontend to Your New Database
Once your Sanity project is created, locate your new **Project ID** (found in your `auto-cms/sanity.cli.js` file or on your [Sanity dashboard](https://manage.sanity.io)). 

You must update the frontend files so they pull from your database instead of the template's placeholder:
* Open `AutoPortfolio/home-script.js`
* Open `AutoPortfolio/feed.js`

Find the database connection string at the top of these files and replace the Project ID with your own:
```javascript
// Change to your new Project ID
let PROJECT_ID = "your_new_project_id";
let DATASET = "production";
```

### 4. Run the Project Locally
**Backend:**
Run the Sanity Studio locally to upload your initial photos and content.
```bash
cd auto-cms
npm run dev
```
Open `http://localhost:3333` in your browser.

**Frontend:**
Because the frontend uses vanilla HTML/JS, you don't need a build step. Use an extension like Live Server in VS Code. Right-click `AutoPortfolio/index.html` and select "Open with Live Server".

### 5. Configure CORS (Crucial for Images to Load)
Sanity blocks outside websites from reading your database by default. You need to whitelist your local and live URLs.
1. Go to [manage.sanity.io](https://manage.sanity.io).
2. Click on your project, then go to **API** -> **CORS Origins**.
3. Add your local development server (e.g., `http://127.0.0.1:5500`).
4. **Check the "Allow credentials" box.**

---

## Deployment (Vercel)

The frontend is perfectly configured to be deployed on Vercel directly from GitHub.

1. Push this customized monorepo to your own GitHub account.
2. Log in to Vercel and click **Add New Project**.
3. Import your GitHub repository.
4. **CRITICAL STEP:** In the Vercel project configuration, open the "Build and Output Settings" or "Root Directory" setting and change the **Root Directory** to `AutoPortfolio`. This tells Vercel to ignore the CMS backend and only host the website.
5. Click **Deploy**.
6. Once deployed, copy your new live URL (`https://your-site.vercel.app`) and add it to your Sanity **CORS Origins** (as done in Step 5) so your live site has permission to fetch your photos.

## How It Works

* **Home Page (`index.html` & `home-script.js`):** Fetches structured content (hero images, headline, featured car, and a bottom gallery) from the `homePage` Sanity schema.
* **Feed Page (`feed.html` & `feed.js`):** Acts as an infinite-scroll gallery. It fetches all images uploaded under the `carPics` Sanity schema and builds the grid dynamically.