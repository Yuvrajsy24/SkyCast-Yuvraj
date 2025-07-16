import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  Eye, 
  Thermometer, 
  Droplets, 
  Wind,
  MapPin,
  Clock,
  AlertCircle,
  Sunrise,
  Sunset,
  Gauge,
  Navigation
} from 'lucide-react';

interface WeatherData {
  name: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  main: string;
  feelsLike: number;
  pressure: number;
  visibility: number;
  sunrise: number;
  sunset: number;
}

interface RecentSearch {
  city: string;
  timestamp: Date;
}

// Animated particles component
const WeatherParticles = ({ weatherType }: { weatherType: string }) => {
  const getParticles = () => {
    switch (weatherType.toLowerCase()) {
      case 'rain':
      case 'drizzle':
        return Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-8 bg-blue-300/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`,
              transform: `rotate(15deg)`,
            }}
          />
        ));
      case 'snow':
        return Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/80 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ));
      case 'clear':
        return Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300/60 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {getParticles()}
    </div>
  );
};

// Floating weather card component
const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div 
    className="transform hover:scale-105 transition-all duration-500 hover:rotate-1"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('skycast-recent-searches');
    if (saved) {
      const parsed = JSON.parse(saved);
      setRecentSearches(parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      })));
    }
  }, []);

  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('skycast-recent-searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const API_KEY = '1881b8eda2e35046f5f67e0754cd9482';

  /**
   * Get weather icon component based on weather condition
   */
  const getWeatherIcon = (main: string, size: number = 64) => {
    const iconProps = { size, className: "drop-shadow-2xl animate-pulse" };
    
    switch (main.toLowerCase()) {
      case 'clear':
        return <Sun {...iconProps} className="text-yellow-400 drop-shadow-2xl animate-spin" style={{ animationDuration: '8s' }} />;
      case 'clouds':
        return <Cloud {...iconProps} className="text-gray-100 drop-shadow-2xl animate-bounce" style={{ animationDuration: '3s' }} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain {...iconProps} className="text-blue-300 drop-shadow-2xl animate-pulse" />;
      case 'snow':
        return <CloudSnow {...iconProps} className="text-blue-100 drop-shadow-2xl animate-bounce" style={{ animationDuration: '2s' }} />;
      case 'thunderstorm':
        return <Zap {...iconProps} className="text-yellow-400 drop-shadow-2xl animate-pulse" />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <Eye {...iconProps} className="text-gray-300 drop-shadow-2xl animate-pulse" />;
      default:
        return <Cloud {...iconProps} className="text-gray-100 drop-shadow-2xl" />;
    }
  };

  /**
   * Get background gradient based on weather condition and time
   */
  const getBackgroundGradient = (main?: string) => {
    const hour = currentTime.getHours();
    const isNight = hour < 6 || hour > 18;
    
    if (!main) {
      return isNight 
        ? 'from-indigo-900 via-purple-900 to-pink-900' 
        : 'from-blue-400 via-cyan-500 to-teal-600';
    }
    
    switch (main.toLowerCase()) {
      case 'clear':
        return isNight 
          ? 'from-indigo-900 via-purple-800 to-pink-800' 
          : 'from-yellow-400 via-orange-500 to-red-500';
      case 'clouds':
        return isNight 
          ? 'from-gray-800 via-gray-900 to-black' 
          : 'from-gray-400 via-gray-600 to-gray-800';
      case 'rain':
      case 'drizzle':
        return 'from-blue-600 via-indigo-700 to-purple-800';
      case 'snow':
        return 'from-blue-200 via-blue-400 to-indigo-600';
      case 'thunderstorm':
        return 'from-gray-900 via-purple-900 to-black';
      case 'mist':
      case 'fog':
      case 'haze':
        return 'from-gray-500 via-gray-600 to-gray-700';
      default:
        return isNight 
          ? 'from-indigo-900 via-purple-900 to-pink-900' 
          : 'from-blue-400 via-cyan-500 to-teal-600';
    }
  };

  /**
   * Fetch weather data from OpenWeatherMap API
   */
  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        }
        throw new Error('Unable to fetch weather data. Please try again later.');
      }

      const data = await response.json();

      const weatherData: WeatherData = {
        name: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        icon: data.weather[0].icon,
        main: data.weather[0].main,
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: Math.round(data.visibility / 1000), // Convert to km
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      };

      setWeather(weatherData);
      
      // Add to recent searches (avoid duplicates)
      setRecentSearches(prev => {
        const filtered = prev.filter(search => 
          search.city.toLowerCase() !== cityName.toLowerCase()
        );
        return [
          { city: cityName, timestamp: new Date() },
          ...filtered
        ].slice(0, 5); // Keep only 5 most recent
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  /**
   * Handle recent search click
   */
  const handleRecentSearchClick = (searchCity: string) => {
    setCity(searchCity);
    fetchWeather(searchCity);
  };

  /**
   * Format timestamp for recent searches
   */
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  /**
   * Format time from timestamp
   */
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(weather?.main)} transition-all duration-1000 ease-in-out relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-white/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/7 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-white/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Weather Particles */}
      {weather && <WeatherParticles weatherType={weather.main} />}
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-7xl mx-auto space-y-6 lg:space-y-8">
          {/* Header with Time */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="mb-4">
              <div className="text-white/60 text-base lg:text-lg mb-2">
                {currentTime.toLocaleDateString([], { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="text-white/80 text-xl lg:text-2xl font-light">
                {currentTime.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                })}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 drop-shadow-2xl animate-in slide-in-from-top duration-1000">
              SkyCast
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/80 text-lg lg:text-xl">
              <Cloud className="animate-bounce" size={24} />
              <span>Real-Time Weather Insights</span>
              <Sun className="animate-spin" size={24} style={{ animationDuration: '8s' }} />
            </div>
          </div>

          {/* Search Form */}
          <div className="flex justify-center px-4">
            <FloatingCard>
              <form onSubmit={handleSubmit} className="relative w-full max-w-3xl">
                <div className="relative group">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Discover weather in any city..."
                    className="w-full px-6 py-4 lg:py-6 pl-14 lg:pl-16 pr-28 lg:pr-32 rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-white/60 text-lg lg:text-xl focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white/40 transition-all duration-500 group-hover:bg-white/15 shadow-2xl"
                    disabled={loading}
                  />
                  <Search className="absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 text-white/70 group-hover:text-white transition-colors duration-300" size={24} />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 px-6 lg:px-8 py-2 lg:py-3 rounded-2xl text-white font-semibold transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 text-sm lg:text-base"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">Searching...</span>
                      </div>
                    ) : (
                      'Explore'
                    )}
                  </button>
                </div>
              </form>
            </FloatingCard>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && !weather && !loading && (
            <div className="flex justify-center px-4">
              <FloatingCard delay={200}>
                <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl p-4 lg:p-6 border border-white/20 shadow-2xl">
                  <h3 className="text-white/80 text-base lg:text-lg font-semibold mb-4 flex items-center gap-3">
                    <Clock size={20} className="animate-pulse" />
                    Recent Explorations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search.city)}
                        className="text-left px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center justify-between group transform hover:scale-105 hover:rotate-1"
                      >
                        <span className="capitalize font-medium text-sm lg:text-base">{search.city}</span>
                        <span className="text-white/60 text-xs lg:text-sm group-hover:text-white/80">
                          {formatTimestamp(search.timestamp)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </FloatingCard>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex justify-center px-4">
              <FloatingCard>
                <div className="w-full max-w-3xl bg-red-500/20 backdrop-blur-xl border-2 border-red-400/30 rounded-3xl p-4 lg:p-6 text-white animate-in slide-in-from-top-2 duration-300 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <AlertCircle size={24} className="text-red-300 flex-shrink-0 animate-pulse" />
                    <p className="text-base lg:text-lg">{error}</p>
                  </div>
                </div>
              </FloatingCard>
            </div>
          )}

          {/* Weather Display */}
          {weather && (
            <div className="flex justify-center px-4">
              <div className="w-full max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start justify-center">
                  {/* Main Weather Card */}
                  <FloatingCard delay={100}>
                    <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/30 shadow-2xl">
                      {/* Location */}
                      <div className="text-center mb-6 lg:mb-8">
                        <div className="flex items-center justify-center gap-3 text-white/80 mb-3">
                          <MapPin size={20} className="animate-pulse" />
                          <span className="text-xl lg:text-2xl font-semibold">{weather.name}, {weather.country}</span>
                        </div>
                        <p className="text-white/70 capitalize text-base lg:text-lg font-medium">{weather.description}</p>
                      </div>

                      {/* Main Temperature Display */}
                      <div className="text-center mb-8 lg:mb-10">
                        <div className="flex items-center justify-center mb-4 lg:mb-6">
                          {getWeatherIcon(weather.main, window.innerWidth >= 1024 ? 120 : 80)}
                        </div>
                        <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-thin text-white mb-4 drop-shadow-2xl">
                          {weather.temperature}°
                        </div>
                        <div className="text-white/80 text-lg lg:text-xl mb-2">Celsius</div>
                        <div className="text-white/60 text-base lg:text-lg">
                          Feels like {weather.feelsLike}°C
                        </div>
                      </div>

                      {/* Sun Times */}
                      <div className="grid grid-cols-2 gap-4 lg:gap-6">
                        <div className="text-center">
                          <div className="bg-white/10 rounded-2xl p-3 lg:p-4 mb-2">
                            <Sunrise className="mx-auto mb-2 text-yellow-300" size={24} />
                            <div className="text-white text-base lg:text-lg font-semibold">{formatTime(weather.sunrise)}</div>
                          </div>
                          <div className="text-white/70 text-xs lg:text-sm">Sunrise</div>
                        </div>
                        <div className="text-center">
                          <div className="bg-white/10 rounded-2xl p-3 lg:p-4 mb-2">
                            <Sunset className="mx-auto mb-2 text-orange-300" size={24} />
                            <div className="text-white text-base lg:text-lg font-semibold">{formatTime(weather.sunset)}</div>
                          </div>
                          <div className="text-white/70 text-xs lg:text-sm">Sunset</div>
                        </div>
                      </div>
                    </div>
                  </FloatingCard>

                  {/* Weather Details Sidebar */}
                  <FloatingCard delay={300}>
                    <div className="space-y-4 lg:space-y-6">
                      {/* Primary Stats */}
                      <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-4 lg:p-6 border border-white/30 shadow-2xl">
                        <h3 className="text-white/80 text-base lg:text-lg font-semibold mb-4">Weather Details</h3>
                        <div className="space-y-3 lg:space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Thermometer className="text-red-300" size={18} />
                              <span className="text-white/80 text-sm lg:text-base">Temperature</span>
                            </div>
                            <span className="text-white font-semibold text-base lg:text-lg">{weather.temperature}°C</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Droplets className="text-blue-300" size={18} />
                              <span className="text-white/80 text-sm lg:text-base">Humidity</span>
                            </div>
                            <span className="text-white font-semibold text-base lg:text-lg">{weather.humidity}%</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Wind className="text-gray-300" size={18} />
                              <span className="text-white/80 text-sm lg:text-base">Wind Speed</span>
                            </div>
                            <span className="text-white font-semibold text-base lg:text-lg">{weather.windSpeed} km/h</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Gauge className="text-purple-300" size={18} />
                              <span className="text-white/80 text-sm lg:text-base">Pressure</span>
                            </div>
                            <span className="text-white font-semibold text-base lg:text-lg">{weather.pressure} hPa</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Navigation className="text-green-300" size={18} />
                              <span className="text-white/80 text-sm lg:text-base">Visibility</span>
                            </div>
                            <span className="text-white font-semibold text-base lg:text-lg">{weather.visibility} km</span>
                          </div>
                        </div>
                      </div>

                      {/* Weather Comfort Index */}
                      <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-4 lg:p-6 border border-white/30 shadow-2xl">
                        <h3 className="text-white/80 text-base lg:text-lg font-semibold mb-4">Comfort Index</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm lg:text-base">Temperature</span>
                            <div className="flex-1 mx-3 bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-400 to-red-400 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min(Math.max((weather.temperature + 10) * 2.5, 0), 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm lg:text-base">Humidity</span>
                            <div className="flex-1 mx-3 bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-yellow-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${weather.humidity}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm lg:text-base">Wind</span>
                            <div className="flex-1 mx-3 bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-purple-400 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min(weather.windSpeed * 2, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FloatingCard>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-6 lg:pt-8">
            <p className="text-white/50 text-xs lg:text-sm">
              Powered by OpenWeatherMap API • Made with ❤️ for weather enthusiasts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;