# Country Explorer
Country Explorer is a React application that allows users to search for countries and view detailed information about each one, such as the capital, region, languages spoken, and currency. The application also includes a weather details feature for each country, which expands when clicked.

## Features
-Search for countries by name.
-Sort countries alphabetically in ascending or descending order.
-View detailed country information such as:
 -Name
 -Capital
 -Region (Continent)
 -Languages spoken
 -Currency
-Weather details: Expand and collapse weather information for the country's capital.

## Tech Stack
- **React**: Frontend library for building user interfaces.
- **Apollo Client**: To fetch country data using GraphQL.
- **GraphQL**: Queries country data from the GraphQL API.
- **Bootstrap (React-Bootstrap)**: Provides responsive UI components.
- **React-Country-Flag**: Displays country flags based on the country code.

## Prerequisites
To run this project locally, you need to have the following installed:
- **Node.js**: Download and install from [here](https://nodejs.org/en).
- **npm or yarn**: Comes bundled with Node.js.

## Getting Started
1.Clone the repository:
git clone https://github.com/your-username/country-explorer.git
cd country-explorer

2.Install dependencies:

**Using npm**:
npm install

**Using yarn**:
yarn install

## Start the development server:

**Using npm**:
npm start

**Using yarn**:
yarn start
The app will be available at http://localhost:3000.

**Folder Structure**
.
├── public/                  # Static assets like index.html
├── src/
│   ├── components/
│   │   ├── CountrySearch.tsx # Main component for country search
│   │   ├── WeatherInfo.tsx   # Weather information component
│   ├── types/
│   │   └── CountryTypes.ts   # Type definitions for countries
│   ├── App.tsx               # Main entry point
│   └── index.tsx             # Renders the app
├── .gitignore
├── package.json
├── README.md

## Dependencies
Here are the main dependencies used in the project:

**React**: ^18.2.0
**React-Bootstrap**: ^2.7.2
**Apollo Client**: ^3.7.1
**React-Country-Flag**: ^3.0.5
**GraphQL**: ^16.6.0

## Development
To modify and enhance the project, follow these steps:

1.Clone the repository.
2.Make changes to the components in the src/components/ folder.
3.Test your changes locally by running the development server.
