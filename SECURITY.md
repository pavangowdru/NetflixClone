# Netflix Clone - Security Setup

## 🔐 Environment Variables Setup

This project uses environment variables to keep sensitive information secure. Follow these steps:

### 1. Copy the environment file

```bash
cp .env.example .env
```

### 2. Get your TMDB API Key

1. Go to [TMDB API](https://www.themoviedb.org/settings/api)
2. Create an account and request an API key
3. Copy your API Read Access Token
4. Add it to your `.env` file:

```
VITE_TMDB_API_KEY=your_actual_api_key_here
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Go to Project Settings > General > Your apps
4. Copy the configuration values
5. Add them to your `.env` file:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Start the development server

```bash
npm run dev
```

## ⚠️ Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already included in `.gitignore`
- Use `.env.example` as a template for other developers
- Rotate your API keys regularly

## 🚨 If you accidentally committed secrets

1. Immediately revoke/rotate the exposed keys
2. Remove them from git history:

```bash
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env' --prune-empty --tag-name-filter cat -- --all
```

3. Force push to update remote repository
