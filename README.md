# Valentine Question App

A fun, interactive React application that asks questions with animated responses and sound effects.

## Features

- Dynamic question flow with Yes/No responses
- Animated floating icons on button clicks
- Background music with play/pause controls
- Sound effects for interactions
- Animated stickers for visual feedback
- Mobile-responsive design

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start development server:
```bash
npm run dev
```

## Configuration

Edit `src/assets/data.json` to customize:

- Background image
- Text colors
- Sound effects URLs
- Icons for click effects
- Question flows and responses

### Data Structure

```json
{
  "config": {
    "background": "URL to background image",
    "textColor": "Text color in hex",
    "iconClickNo": "Icon for No clicks",
    "iconClickYes": "Icon for Yes clicks",
    "backgroundMusic": "URL to background music",
    "clickYesSound": "URL to Yes click sound",
    "clickNoSound": "URL to No click sound"
  },
  "start": [...],
  "Yes": [...],
  "No": [...]
}
```

## Tech Stack

- React
- Vite
- CSS3 Animations
- Web Audio API

## Development

Built with React + Vite. Uses modern React features including:
- Hooks (useState, useRef, useEffect)
- Custom animations
- Audio handling
- Dynamic state management
