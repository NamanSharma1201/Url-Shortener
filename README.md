

---

# URL Shortener Application

This URL shortener application allows users to shorten long URLs, making them easier to share and manage. The application is built using Node.js, Express.js, and a templating engine like EJS.

## Features

- User authentication (login required to access certain features)
- Shorten long URLs
- Redirect from shortened URLs to the original URLs
- View a list of all shortened URLs (for authenticated users)
- Simple and intuitive user interface
![image](https://github.com/NamanSharma1201/Url-Shortener/assets/120219878/cabb1885-ea81-4a7c-be76-41dcb34449c2)
![image](https://github.com/NamanSharma1201/Url-Shortener/assets/120219878/398ce30d-1508-4cb1-ba4d-945efcb4a01a)
![image](https://github.com/NamanSharma1201/Url-Shortener/assets/120219878/af547b7c-e4cf-443e-a786-dd8b5fab33cf)
![image](https://github.com/NamanSharma1201/Url-Shortener/assets/120219878/0c935ada-0a64-4167-a0b9-1043cb7aa385)

## Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables. Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. Start the application:

   ```bash
   npm start
   ```

   The application should now be running on `http://localhost:8000`.

## Usage

1. Open your browser and navigate to `http://localhost:8000`.
2. Register for a new account or log in with an existing account.
3. Use the form to enter a long URL and click "Shorten".
4. Copy the shortened URL and share it.


## Middleware

### Authentication Middleware

The authentication middleware checks if a user is authenticated before allowing access to certain routes.

```javascript
import { getUser } from "../service/auth.js";

export async function restrictToLoginUserOnly(req, res, next) {
  const userId = req.cookies?.uid;
  if (!userId) return res.render("login");

  const user = getUser(userId);
  if (!user) return res.render("login");

  req.user = user;
  next();
}

export default restrictToLoginUserOnly;
```

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the contributors of [Express.js](https://expressjs.com/).
- Thanks to the developers of [MongoDB](https://www.mongodb.com/) for the database solution.
- Special thanks to [EJS](https://ejs.co/) for the templating engine.

---

Feel free to modify this README to better fit the specifics of your project.
