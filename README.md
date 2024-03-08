# Genifer

## Overview

Genifer is a project that leverages the OpenAI API to generate search terms, summarize content, and generate UI based on user input. It uses Next.js as the main framework, and Tailwind CSS for styling.

## Getting Started

#### Prerequisites

- Node.js
- Yarn

#### Installation

1. Clone the repository.
2. Install the dependencies using yarn install.
3. Create a .env.local file in the root directory and add your OpenAI API key, SERPAPI API key, and Supabase keys. Refer to next.config.mjs for the variable names.

## Project Structure

##### pages

This directory contains the main pages of the application. The index.tsx file is the main entry point of the application, and api directory contains the serverless functions.

#### components

This directory contains the React components used in the application. The Chat.tsx component is the main chat interface.

#### utils

This directory contains utility functions that interact with the OpenAI API and perform various tasks such as generating search terms, summarizing content, and checking if the content fulfills the user's request.

#### services

This directory contains the configurations for the OpenAI, SERPAPI, and Supabase services.

#### Key Files

- `pages/index.tsx`: The main page of the application. It renders the Chat component.
- components/Chat.tsx: The chat interface. It uses the useChat hook from the ai/react package to handle the chat interactions.
- `utils/generateSearchTerm.ts`: Generates a search term based on the user's last message.
- `utils/summarizeContent.ts`: Summarizes the content of a webpage.
- `utils/doesFulfillRequest.ts`: Checks if the summarized content fulfills the user's request.
- `utils/generateUI.ts`: Generates a UI based on the content.
- `services/openai.ts`: Configuration for the OpenAI service.
- `services/serpapi.ts`: Configuration for the SERPAPI service.
- `services/supabase.ts`: Configuration for the Supabase service.

## Running the Application

To run the application in development mode, use the command `yarn dev`. For production, first build the application using yarn build, then start the server using yarn start.

## Testing

Linting is set up in the project using ESLint. To run the linter, use the command yarn lint.
Deployment
The project is ready to be deployed on Vercel. It uses serverless functions which are compatible with the Vercel platform.

## Contributing

When contributing to this project, please ensure that any changes made pass the linter and that all existing functionality continues to work as expected.
