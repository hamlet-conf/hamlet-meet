# Hamlet Meet

## Overview

Hamlet Meet is a tool for facilitating meaningful interactions and collaborations at academic conferences. By providing a quick overview of research interests and potential discussion points, attendees can quickly identify common ground and initiate productive conversations. This app is open-source and can be customized for use at different conferences.

## Features

1. **Login Page:**
   - Users enter their own user ID to start the session.
   - The user ID is stored in local storage for the duration of the session.

2. **Home Page:**
   - **Logout Button:** Clears the user ID and reloads the login page.
   - **Profile Icon:** Displays the user's own profile summary.
   - **Partner ID Input:** Allows the user to enter a conversation partner's user ID.
   - **Research Focus Summary:** Displays the partner’s research focus, key stats, and potential talking points.

3. **Interactive Elements:**
   - **Research Icons:** Represent different aspects of the partner's research focus and are clickable for more information.
   - **Modals:** Provide additional details about research aspects when icons are clicked.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A UI component library for React that follows Material Design principles.
- **Font Awesome**: A library of icons used to visually represent research areas.
- **GitHub Pages**: For hosting the application.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server:**
   \`\`\`bash
   npm start
   \`\`\`

4. **Build the app for production:**
   \`\`\`bash
   npm run build
   \`\`\`

5. **Deploy to GitHub Pages:**
   \`\`\`bash
   npm run deploy
   \`\`\`

## Usage

1. **Login:**
   - Enter your user ID on the login page to start the session.
   
2. **Navigate to Home Page:**
   - Once logged in, use the input field to enter a partner’s ID to fetch their profile.
   - View the summary of their research focus and key stats.
   - Click on research icons for more detailed information in modals.

3. **Logout:**
   - Click the logout button to clear the user ID and end the session.

## Contributing

Contributions are welcome! If you have ideas for improvements or new features, feel free to fork the repository and submit a pull request. Please ensure that your code follows the project's coding standards and is well-documented.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
   \`\`\`bash
   git checkout -b feature-name
   \`\`\`
3. Commit your changes.
   \`\`\`bash
   git commit -m "Description of your changes"
   \`\`\`
4. Push to the branch.
   \`\`\`bash
   git push origin feature-name
   \`\`\`
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [Your Name] at [Your Email].

## Acknowledgements

- Special thanks to the contributors of React, Material-UI, and Font Awesome for providing the tools that made this project possible.

## Future Plans

- Add support for more detailed user profiles with publication history and recent activities.
- Implement real-time chat functionality for instant messaging between attendees.
- Add machine learning capabilities to suggest potential collaboration partners based on research interests and past publications.
