# SkyCast 🌤️ - Real-Time Weather Application

A beautiful, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information for any city worldwide with stunning visual effects and an intuitive user interface.

![SkyCast Preview](https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions for any city worldwide
- **Beautiful UI/UX**: Stunning gradients and animations that change based on weather conditions
- **Responsive Design**: Optimized for all devices - mobile, tablet, and desktop
- **Weather Particles**: Dynamic animated particles that match current weather conditions
- **Recent Searches**: Quick access to your recently searched cities
- **Detailed Weather Info**: Temperature, humidity, wind speed, pressure, visibility, and more
- **Sunrise/Sunset Times**: Know when the sun rises and sets in your location
- **Comfort Index**: Visual indicators for temperature, humidity, and wind conditions
- **Live Clock**: Real-time date and time display

## 🚀 Live Demo

Visit the live application: [SkyCast Weather App](https://skycast18.netlify.app)

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icon library
- **OpenWeatherMap API** - Weather data provider

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skycast-weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key
   - Replace the API key in `src/App.tsx`:
     ```typescript
     const API_KEY = 'your-api-key-here';
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎨 Features Overview

### Dynamic Weather Backgrounds
The application features dynamic background gradients that change based on:
- Current weather conditions (sunny, cloudy, rainy, etc.)
- Time of day (day/night themes)

### Weather Particles Animation
Interactive particle effects that match the current weather:
- **Rain/Drizzle**: Animated raindrops
- **Snow**: Floating snowflakes
- **Clear Sky**: Twinkling stars/sun rays
- **Clouds**: Subtle floating elements

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Friendly**: Perfect layout for tablets
- **Desktop Enhanced**: Full-featured desktop experience

### Recent Searches
- Stores up to 5 recent searches
- Persistent storage using localStorage
- Quick access with timestamps

## 📱 Screenshots

### Desktop View
Beautiful full-screen experience with side-by-side weather cards

### Mobile View
Optimized mobile layout with stacked cards and touch-friendly interface

## 🔧 Configuration

### API Configuration
The app uses OpenWeatherMap API. You can customize:
- API endpoints
- Units (metric/imperial)
- Language settings

### Styling
Built with Tailwind CSS for easy customization:
- Colors and gradients
- Animations and transitions
- Responsive breakpoints

## 🌟 Key Components

### Weather Display
- Current temperature with "feels like" indicator
- Weather condition with animated icons
- Sunrise and sunset times
- Location information

### Weather Details Sidebar
- Humidity levels
- Wind speed and direction
- Atmospheric pressure
- Visibility distance
- Comfort index with visual indicators

### Search Functionality
- Real-time city search
- Error handling for invalid cities
- Loading states with animations

## 🚀 Deployment

The application is deployed on Netlify and can be easily deployed to other platforms:

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Other Platforms
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Static site hosting
- **Firebase Hosting**: Google's hosting solution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing weather data
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [Pexels](https://pexels.com/) for stock images

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ for weather enthusiasts**

Enjoy exploring weather conditions around the world with SkyCast! 🌍⛅
