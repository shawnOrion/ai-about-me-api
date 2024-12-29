### **README: Command Cheat Sheet**
#### File Structure
my-project/
├── data/
│   ├── app_data.json   # Optional: JSON file for seed data
├── .env                # Environment variables (template provided)
├── index.js            # Main app entry point
├── Procfile            # Heroku process file
├── package.json        # Node.js package configuration
└── README.md           # Project setup and instructions


#### **1. Initialize Node.js Project and Install Dependencies**
1. Navigate to the project directory in your terminal:
   ```bash
   cd <project-folder>
   ```

2. Initialize a new Node.js project:
   ```bash
   npm init -y
   ```

3. Install necessary dependencies:
   ```bash
   npm install express pg dotenv cors
   ```


---

#### **2. Initialize Git Repository**
Go to github and create a new repo 
https://github.com/new

1. Initialize a new Git repository:
   ```bash
   git init
   ```


3. Stage and commit the initial files:
   ```bash
   git add .
   git commit -m "Initial project setup"
   ```

4. Set the remote repository:
   ```bash
   git remote add origin <your-github-repo-url>
   ```

5. Push the code to the remote repository:
   ```bash
   git branch -M main
   git push -u origin main
   ```

---

#### **3. Create the Database Locally Using PostgreSQL**
1. **Update `db/queries.js`**:
   - Add functions to create the required tables (e.g., `users`, `comments`) for the project.
   - Include proper error handling and meaningful logs for debugging.

2. **Update `db/populate_db.js`**:
   - Use functions from `queries.js` to create the tables.
   - Add initial data.
   - Include logs to confirm successful operations or errors.

---


#### **4. Set Up Heroku Database**
1. **Create Heroku App and Add Database**:
   - Log in to Heroku CLI:
     ```bash
     heroku login
     ```
   - Create a new Heroku app:
     ```bash
     heroku create <your-app-name>
     ```
   - Add a Heroku Postgres add-on:
     ```bash
     heroku addons:create heroku-postgresql:essential-0 --app <your-app-name>
     ```
   - Retrieve the `DATABASE_URL`(db can take a min to setup, be patient) :
     ```bash
     heroku config --app <your-app-name>
     ```
   - Add the `DATABASE_URL` to your local `.env` file:
     ```plaintext
     DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>
     ```

2. **Populate the Database Locally**:
   - Run the `populate_db.js` script locally to create tables and insert sample data:
     ```bash
     node db/populate_db.js
     ```


#### **5. Deploy and Test on Heroku**
1. Push the code to Heroku:
   ```bash
   git push heroku main
   ```

2. Run the `populate_db.js` script on Heroku to populate the remote database:
   ```bash
   heroku run node db/populate_db.js --app <your-app-name>
   ```

3. Verify the database tables and data:
   ```bash
   heroku pg:psql --app <your-app-name>
   \dt  -- List tables
   SELECT * FROM movies;  -- Check data
   ```

4. Open the app in your browser to verify it works:
   ```bash
   heroku open --app <your-app-name>
   ```

---

#### **6. Test the App**
1. Open the app in your browser:
   ```bash
   heroku open --app <your-app-name>
   ```

2. Test API endpoints using tools like `curl` or Postman:
   ```bash
   curl https://<your-app-name>.herokuapp.com/api/users
   ```

3. Check logs for debugging:
   ```bash
   heroku logs --tail --app <your-app-name>
   ```

---
