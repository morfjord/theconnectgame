# The Connect Game

A small React Native app that shows random WordPress posts. Select a category and refresh the list to see more posts.

## Setup

Install dependencies:

```sh
npm install
```

Start the metro bundler:

```sh
npm start
```

Then run the app on a device or emulator:

```sh
npm run android  # or npm run ios
```

## Components

### App
Root component rendering the category selector and list of posts.

### CategoryPicker
Fetches WordPress categories and lets the user choose one.

### RandomPosts
Displays random posts from the selected category and includes a button to refresh the list.
