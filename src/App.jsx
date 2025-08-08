import { useState, useEffect } from 'react'
import './App.css'

// Search Component
const SearchRide = ({ onSearch, currentLocation, searchData }) => {
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [dropoffDate, setDropoffDate] = useState('')
  const [dropoffTime, setDropoffTime] = useState('')

  // Generate time options (24-hour format)
  const generateTimeOptions = () => {
    const times = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        times.push(timeString)
      }
    }
    return times
  }

  const timeOptions = generateTimeOptions()

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const handleSearch = () => {
    if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime) {
      alert('Please fill in all fields before searching!')
      return
    }

    const searchData = {
      pickup: {
        date: pickupDate,
        time: pickupTime
      },
      dropoff: {
        date: dropoffDate,
        time: dropoffTime
      }
    }

    // Validate that dropoff is after pickup
    const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`)
    const dropoffDateTime = new Date(`${dropoffDate}T${dropoffTime}`)

    if (dropoffDateTime <= pickupDateTime) {
      alert('Dropoff date and time must be after pickup date and time!')
      return
    }

    onSearch(searchData)
    alert(`Searching rides from ${pickupDate} ${pickupTime} to ${dropoffDate} ${dropoffTime}`)
  }

  return (
    <div className="search-ride-container">
      <div className="search-ride-split-layout">
        {/* Left Half: Search Your Next Ride */}
        <div className="search-ride-left">
          <div className="search-ride-card">
            <h2 className="search-title">🔍 Search your next ride</h2>
            
            <div className="search-form">
              <div className="search-sections-container">
                {/* Pickup Section */}
                <div className="search-section">
                  <h3 className="section-title">📍 Pickup</h3>
                  <div className="input-group">
                    <div className="input-field">
                      <label>Date</label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        min={getTodayDate()}
                        className="date-input"
                      />
                      {!pickupDate && <span className="placeholder-text">Please select Date!</span>}
                    </div>
                    <div className="input-field">
                      <label>Time</label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="time-select"
                      >
                        <option value="">Please select Time!</option>
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Dropoff Section */}
                <div className="search-section">
                  <h3 className="section-title">📍 Dropoff</h3>
                  <div className="input-group">
                    <div className="input-field">
                      <label>Date</label>
                      <input
                        type="date"
                        value={dropoffDate}
                        onChange={(e) => setDropoffDate(e.target.value)}
                        min={pickupDate || getTodayDate()}
                        className="date-input"
                      />
                      {!dropoffDate && <span className="placeholder-text">Please select Date!</span>}
                    </div>
                    <div className="input-field">
                      <label>Time</label>
                      <select
                        value={dropoffTime}
                        onChange={(e) => setDropoffTime(e.target.value)}
                        className="time-select"
                      >
                        <option value="">Please select Time!</option>
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="search-button-container">
                <button className="search-button" onClick={handleSearch}>
                  🔍 Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Half: Find Your Perfect Ride */}
        <div className="search-ride-right">
          <div className="perfect-ride-section">
            <h1>Find Your Perfect Ride in {currentLocation}</h1>
            <p>Discover amazing bikes available for rent in your city</p>
            {searchData && (
              <div className="search-results-info">
                <p>🔍 Searching for rides from {searchData.pickup.date} {searchData.pickup.time} to {searchData.dropoff.date} {searchData.dropoff.time}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Chat Support Component
const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])

    // Add bot response after a short delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "Thank you for your message! Our chatbot is still in the training phase and full functionality is not available yet. For immediate assistance, please contact us at support@vizygo.in or call +91 9182762800.",
        sender: "bot",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)

    setInputMessage('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="chat-support">
      {/* Chat Toggle Button */}
      <button 
        className={`chat-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">🤖</div>
              <div className="chat-title">
                <h4>Vizygo Support</h4>
                <span className="chat-status">• Online</span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="chat-input-field"
            />
            <button 
              className="chat-send-btn"
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Sample bike data
const sampleBikes = [
  // Bikes Category
  {
    id: 2,
    name: 'Bajaj Avenger 220',
    type: 'bikes',
    category: 'Bikes',
    image: './assets/bikesimages/bikes/bajajavenger220.png',
    available: false,
    location: 'Indiranagar',
    pricing: {
      daily: { price: 150, kmLimit: 60 },
      weekly: { price: 120, kmLimit: 60 },
      biweekly: { price: 110, kmLimit: 60 },
      monthly: { price: 100, kmLimit: 60 }
    },
    timeSlots: {
      weekdays: {
        label: 'Mon-Thu',
        minBooking: 10,
        rates: [
          { duration: '0-24 hrs', price: 28 },
          { duration: '>24 hrs', price: 25 }
        ]
      },
      weekends: {
        label: 'Fri-Sun',
        minBooking: 24,
        rates: [
          { duration: '>24hrs', price: 30 }
        ]
      }
    },
    extras: {
      kmLimit: 6.0,
      excessKmCharges: 4.5
    }
  },
  {
    id: 3,
    name: 'CB Hornet 160',
    type: 'bikes',
    category: 'Bikes',
    image: './assets/bikesimages/bikes/cbhornet160.png',
    available: false,
    location: 'BTM Layout',
    pricing: {
      daily: { price: 140, kmLimit: 55 },
      weekly: { price: 115, kmLimit: 55 },
      biweekly: { price: 105, kmLimit: 55 },
      monthly: { price: 95, kmLimit: 55 }
    },
    timeSlots: {
      weekdays: {
        label: 'Mon-Thu',
        minBooking: 10,
        rates: [
          { duration: '0-24 hrs', price: 26 },
          { duration: '>24 hrs', price: 23 }
        ]
      },
      weekends: {
        label: 'Fri-Sun',
        minBooking: 24,
        rates: [
          { duration: '>24hrs', price: 28 }
        ]
      }
    },
    extras: {
      kmLimit: 5.5,
      excessKmCharges: 4.2
    }
  },
  {
    id: 4,
    name: 'FZ V3',
    type: 'bikes',
    category: 'Bikes',
    image: './assets/bikesimages/bikes/fzv3.png',
    available: false,
    location: 'Electronic City',
    pricing: {
      daily: { price: 160, kmLimit: 65 },
      weekly: { price: 130, kmLimit: 65 },
      biweekly: { price: 120, kmLimit: 65 },
      monthly: { price: 110, kmLimit: 65 }
    },
    timeSlots: {
      weekdays: {
        label: 'Mon-Thu',
        minBooking: 10,
        rates: [
          { duration: '0-24 hrs', price: 30 },
          { duration: '>24 hrs', price: 27 }
        ]
      },
      weekends: {
        label: 'Fri-Sun',
        minBooking: 24,
        rates: [
          { duration: '>24hrs', price: 32 }
        ]
      }
    },
    extras: {
      kmLimit: 6.5,
      excessKmCharges: 4.8
    }
  },
  // Premium Category
  {
    id: 5,
    name: 'CB 350',
    type: 'premium',
    category: 'Premium',
    image: './assets/bikesimages/premium/cb350.png',
    available: false,
    location: 'Koramangala',
    pricing: {
      daily: { price: 200, kmLimit: 70 },
      weekly: { price: 170, kmLimit: 70 },
      biweekly: { price: 160, kmLimit: 70 },
      monthly: { price: 150, kmLimit: 70 }
    },
    timeSlots: {
      weekdays: {
        label: 'Mon-Thu',
        minBooking: 10,
        rates: [
          { duration: '0-24 hrs', price: 40 },
          { duration: '>24 hrs', price: 37 }
        ]
      },
      weekends: {
        label: 'Fri-Sun',
        minBooking: 24,
        rates: [
          { duration: '>24hrs', price: 42 }
        ]
      }
    },
    extras: {
      kmLimit: 8.0,
      excessKmCharges: 5.0
    }
  },
  {
    id: 6,
    name: 'Classic 350',
    type: 'premium',
    category: 'Premium',
    image: './assets/bikesimages/premium/classic.png',
    available: false,
    location: 'Whitefield',
    pricing: {
      daily: { price: 220, kmLimit: 75 },
      weekly: { price: 190, kmLimit: 75 },
      biweekly: { price: 180, kmLimit: 75 },
      monthly: { price: 170, kmLimit: 75 }
    },
    timeSlots: {
      weekdays: {
        label: 'Mon-Thu',
        minBooking: 10,
        rates: [
          { duration: '0-24 hrs', price: 45 },
          { duration: '>24 hrs', price: 42 }
        ]
      },
      weekends: {
        label: 'Fri-Sun',
        minBooking: 24,
        rates: [
          { duration: '>24hrs', price: 47 }
        ]
      }
    },
    extras: {
      kmLimit: 9.0,
      excessKmCharges: 5.5
    }
  },
  // Scooties Category
  {
    id: 7,
    name: 'Activa 6G',
    type: 'scooties',
    category: 'Scooties',
    image: './assets/bikesimages/scooties/activa6g.png',
    available: false,
    location: 'Jayanagar',
    pricing: {
      daily: { price: 100, kmLimit: 40 },
      weekly: { price: 80, kmLimit: 40 },
      biweekly: { price: 70, kmLimit: 40 },
      monthly: { price: 60, kmLimit: 40 }
    },
    timeSlots: {
      weekdays: {
        label: 'Mon-Thu',
        minBooking: 10,
        rates: [
          { duration: '0-24 hrs', price: 18 },
          { duration: '>24 hrs', price: 15 }
        ]
      },
      weekends: {
        label: 'Fri-Sun',
        minBooking: 24,
        rates: [
          { duration: '>24hrs', price: 20 }
        ]
      }
    },
    extras: {
      kmLimit: 4.0,
      excessKmCharges: 3.5
    }
  },
  {
    id: 8,
    name: 'Access 125',
    type: 'scooties',
    category: 'Scooties',
    image: './assets/bikesimages/scooties/access125.png',
    available: false,
    location: 'HSR Layout',
    pricing: {
      daily: { price: 110, kmLimit: 45 },
      weekly: { price: 90, kmLimit: 45 },
      biweekly: { price: 80, kmLimit: 45 },
      monthly: { price: 70, kmLimit: 45 }
    },
    timeSlots: {
      weekdays: {
        label: 'Mon-Thu',
        minBooking: 10,
        rates: [
          { duration: '0-24 hrs', price: 20 },
          { duration: '>24 hrs', price: 17 }
        ]
      },
      weekends: {
        label: 'Fri-Sun',
        minBooking: 24,
        rates: [
          { duration: '>24hrs', price: 22 }
        ]
      }
    },
    extras: {
      kmLimit: 4.5,
      excessKmCharges: 3.8
    }
  },
  {
    id: 1,
    name: 'TVS NTORQ 125',
    type: 'scooties',
    category: 'Scooties',
    image: './assets/bikesimages/scooties/TVSNTORQ125.png',
    available: false,
    location: 'Koramangala',
    pricing: {
      daily: { price: 120, kmLimit: 50 },
      weekly: { price: 100, kmLimit: 50 },
      biweekly: { price: 90, kmLimit: 50 },
      monthly: { price: 80, kmLimit: 50 }
    },
    timeSlots: {
      weekdays: {
        label: 'Mon-Thu',
        minBooking: 10,
        rates: [
          { duration: '0-24 hrs', price: 23 },
          { duration: '>24 hrs', price: 20 }
        ]
      },
      weekends: {
        label: 'Fri-Sun',
        minBooking: 24,
        rates: [
          { duration: '>24hrs', price: 25 }
        ]
      }
    },
    extras: {
      kmLimit: 5.0,
      excessKmCharges: 4.0
    }
  }
]

// Login/Signup Component
const AuthModal = ({ isVisible, onClose, onLogin }) => {
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'
  const [authStep, setAuthStep] = useState('phone') // 'phone', 'details', 'otp'
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    occupation: '',
    city: '',
    gender: '',
    dateOfBirth: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const resetForm = () => {
    setPhoneNumber('')
    setOtp('')
    setGeneratedOtp('')
    setUserDetails({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      occupation: '',
      city: '',
      gender: '',
      dateOfBirth: ''
    })
  }

  const handleModeSwitch = (mode) => {
    setAuthMode(mode)
    setAuthStep(mode === 'signup' ? 'details' : 'phone')
    resetForm()
  }

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number')
      return
    }

    setIsLoading(true)
    const newOtp = generateOtp()
    setGeneratedOtp(newOtp)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (authMode === 'signup') {
        setAuthStep('details')
      } else {
        setAuthStep('otp')
      }
      alert(`OTP sent to +91${phoneNumber}\nFor demo: ${newOtp}`)
    }, 1500)
  }

  const handleVerifyOtp = () => {
    if (otp !== generatedOtp) {
      alert('Invalid OTP. Please try again.')
      return
    }

    if (authMode === 'signup') {
      // Signup complete after OTP verification
      const userData = {
        phoneNumber: `+91${userDetails.phoneNumber}`,
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
        occupation: userDetails.occupation,
        city: userDetails.city,
        gender: userDetails.gender,
        dateOfBirth: userDetails.dateOfBirth,
        isLoggedIn: true
      }
      
      onLogin(userData)
      onClose()
      resetForm()
      alert('Account created successfully! Welcome to VIZYGO!')
    } else {
      // Login successful
      const userData = {
        phoneNumber: `+91${phoneNumber}`,
        name: 'User', // In real app, this would come from backend
        isLoggedIn: true
      }
      onLogin(userData)
      onClose()
      resetForm()
    }
  }

  const handleDetailsComplete = () => {
    if (!userDetails.firstName || !userDetails.lastName || !userDetails.email || !userDetails.phoneNumber || !userDetails.occupation || !userDetails.city) {
      alert('Please fill in all required fields')
      return
    }

    // Validate phone number
    if (userDetails.phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number')
      return
    }

    // Generate and send OTP
    setIsLoading(true)
    const newOtp = generateOtp()
    setGeneratedOtp(newOtp)
    setPhoneNumber(userDetails.phoneNumber) // Set phone number for OTP verification
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setAuthStep('otp')
      alert(`OTP sent to +91${userDetails.phoneNumber}\nFor demo: ${newOtp}`)
    }, 1500)
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  if (!isVisible) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <h2>{authMode === 'login' ? '🔐 Login' : '📝 Sign Up'}</h2>
          <button className="close-modal" onClick={handleClose}>×</button>
        </div>

        <div className="auth-body">
          {/* Mode Toggle */}
          <div className="auth-mode-toggle">
            <button 
              className={`mode-btn ${authMode === 'login' ? 'active' : ''}`}
              onClick={() => handleModeSwitch('login')}
            >
              Login
            </button>
            <button 
              className={`mode-btn ${authMode === 'signup' ? 'active' : ''}`}
              onClick={() => handleModeSwitch('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* User Details Step (Signup only) */}
          {authStep === 'details' && authMode === 'signup' && (
            <div className="auth-step">
              <h3>👤 Complete your profile</h3>
              <p>Please fill in your details. We'll send an OTP to verify your account after this step.</p>
              <div className="details-form">
                <div className="form-row">
                  <div className="input-with-icon">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      value={userDetails.firstName}
                      onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value})}
                      placeholder="First Name *"
                      className="form-input"
                    />
                  </div>
                  <div className="input-with-icon">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      value={userDetails.lastName}
                      onChange={(e) => setUserDetails({...userDetails, lastName: e.target.value})}
                      placeholder="Last Name *"
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="input-with-icon">
                  <span className="input-icon">📱</span>
                  <div className="phone-input-container">
                    <span className="country-code">+91</span>
                    <input
                      type="tel"
                      value={userDetails.phoneNumber}
                      onChange={(e) => setUserDetails({...userDetails, phoneNumber: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                      placeholder="Enter 10-digit mobile number *"
                      className="phone-input"
                      maxLength="10"
                    />
                  </div>
                </div>
                
                <div className="input-with-icon">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                    placeholder="Email Address *"
                    className="form-input full-width"
                  />
                </div>
                
                <div className="input-with-icon">
                  <span className="input-icon">💼</span>
                  <select
                    value={userDetails.occupation}
                    onChange={(e) => setUserDetails({...userDetails, occupation: e.target.value})}
                    className="form-input full-width"
                  >
                    <option value="">Select Occupation *</option>
                    <option value="student">🎓 Student</option>
                    <option value="software-engineer">💻 Software Engineer</option>
                    <option value="business-analyst">📊 Business Analyst</option>
                    <option value="consultant">🤝 Consultant</option>
                    <option value="teacher">👩‍🏫 Teacher</option>
                    <option value="doctor">👨‍⚕️ Doctor</option>
                    <option value="entrepreneur">🚀 Entrepreneur</option>
                    <option value="freelancer">💼 Freelancer</option>
                    <option value="government-employee">🏛️ Government Employee</option>
                    <option value="private-employee">🏢 Private Employee</option>
                    <option value="other">🔧 Other</option>
                  </select>
                </div>
                
                <div className="input-with-icon">
                  <span className="input-icon">🏙️</span>
                  <select
                    value={userDetails.city}
                    onChange={(e) => setUserDetails({...userDetails, city: e.target.value})}
                    className="form-input full-width"
                  >
                    <option value="">Select City *</option>
                    <option value="bangalore">🌆 Bangalore</option>
                    <option value="hyderabad">🏙️ Hyderabad</option>
                    <option value="mumbai">🌊 Mumbai</option>
                    <option value="delhi">🏛️ Delhi</option>
                    <option value="chennai">🌴 Chennai</option>
                    <option value="pune">🎭 Pune</option>
                    <option value="kolkata">🎨 Kolkata</option>
                    <option value="ahmedabad">🏗️ Ahmedabad</option>
                    <option value="other">🗺️ Other</option>
                  </select>
                </div>
                
                <div className="input-with-icon">
                  <span className="input-icon">⚧️</span>
                  <select
                    value={userDetails.gender}
                    onChange={(e) => setUserDetails({...userDetails, gender: e.target.value})}
                    className="form-input full-width"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">♂️ Male</option>
                    <option value="female">♀️ Female</option>
                    <option value="other">⚧️ Other</option>
                    <option value="prefer-not-to-say">🤐 Prefer not to say</option>
                  </select>
                </div>
                
                <div className="input-with-icon">
                  <span className="input-icon">📅</span>
                  <input
                    type="date"
                    value={userDetails.dateOfBirth}
                    onChange={(e) => setUserDetails({...userDetails, dateOfBirth: e.target.value})}
                    className="form-input full-width"
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="details-actions">
                <button 
                  className="auth-btn primary"
                  onClick={handleDetailsComplete}
                  disabled={isLoading}
                >
                  {isLoading ? '📤 Sending OTP...' : '📤 Verify Details'}
                </button>
              </div>
            </div>
          )}

          {/* Phone Number Step (Login only) */}
          {authStep === 'phone' && authMode === 'login' && (
            <div className="auth-step">
              <h3>📱 Enter your mobile number</h3>
              <div className="phone-input-container">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit mobile number"
                  className="phone-input"
                  maxLength="10"
                />
              </div>
              <button 
                className="auth-btn primary"
                onClick={handleSendOtp}
                disabled={isLoading || phoneNumber.length !== 10}
              >
                {isLoading ? '📤 Sending...' : '📤 Get OTP'}
              </button>
            </div>
          )}

          {/* OTP Verification Step */}
          {authStep === 'otp' && (
            <div className="auth-step">
              <h3>🔢 Enter OTP</h3>
              <p>OTP sent to +91{authMode === 'signup' ? userDetails.phoneNumber : phoneNumber}</p>
              {authMode === 'signup' && (
                <div className="signup-summary">
                  <p><strong>Account Details:</strong></p>
                  <p>👤 {userDetails.firstName} {userDetails.lastName}</p>
                  <p>✉️ {userDetails.email}</p>
                  <p>💼 {userDetails.occupation}</p>
                  <p>🏙️ {userDetails.city}</p>
                </div>
              )}
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                className="otp-input"
                maxLength="6"
              />
              <div className="otp-actions">
                <button 
                  className="auth-btn primary"
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6}
                >
                  {authMode === 'signup' ? '🎉 Create Account' : '✅ Verify & Login'}
                </button>
                <button 
                  className="auth-btn secondary"
                  onClick={() => setAuthStep(authMode === 'signup' ? 'details' : 'phone')}
                >
                  ← Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Navigation Component
const Navbar = ({ currentLocation, onLocationChange, onSidebarToggle, currentPage, onNavigation, user, onShowAuth, onLogout }) => {
  const locations = ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Chennai', 'Pune']

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side - Hamburger menu */}
        <div className="navbar-left">
          <button className="hamburger-menu" onClick={onSidebarToggle}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="brand-logo" onClick={() => onNavigation('explore')}>
            <span className="logo-icon">🚴‍♀️</span>
            <span className="brand-name">Vizygo</span>
          </div>
        </div>

        {/* Center - Navigation links */}
        <div className="navbar-center">
          <ul className="nav-links">
            <li>
              <a 
                href="#explore" 
                className={`nav-link ${currentPage === 'explore' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); onNavigation('explore'); }}
              >
                Explore
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); onNavigation('about'); }}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="#stories" 
                className={`nav-link ${currentPage === 'stories' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); onNavigation('stories'); }}
              >
                Stories
              </a>
            </li>
            <li>
              <a 
                href="#offers" 
                className={`nav-link ${currentPage === 'offers' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); onNavigation('offers'); }}
              >
                Offers
              </a>
            </li>
            <li>
              <a 
                href="#marketplace" 
                className={`nav-link ${currentPage === 'marketplace' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); onNavigation('marketplace'); }}
              >
                Marketplace
              </a>
            </li>
          </ul>
        </div>

        {/* Right side - Location dropdown and Auth */}
        <div className="navbar-right">
          <div className="location-selector">
            <span className="location-icon">📍</span>
            <select 
              value={currentLocation} 
              onChange={(e) => onLocationChange(e.target.value)}
              className="location-dropdown"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          {/* Auth Section */}
          <div className="auth-section">
            {user.isLoggedIn ? (
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-icon">👤</span>
                  <span className="user-name">{user.name}</span>
                </div>
                <button className="logout-btn" onClick={onLogout}>
                  🚪 Logout
                </button>
              </div>
            ) : (
              <button className="login-btn" onClick={onShowAuth}>
                🔐 Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

// About Us Page Component
const AboutUsPage = () => {
  const reviews = [
    {
      id: 1,
      name: "Raju Vallapu",
      initial: "R",
      title: "Awesome customer service",
      review: "Awesome customer service and timely response for every query. Special mention for Vizygo for his helping and polite nature towards customer. Would highly recommend Vizygo to everyone in need of two wheelers in Bangalore. Very much satisfied and happy customer.",
      rating: 5
    },
    {
      id: 2,
      name: "Ashish Rao",
      initial: "A",
      title: "The service was absolutely amazing.",
      review: "The service was absolutely amazing. The vehicle was really useful and the customer support is equally great. Will surely book through Vizygo again.",
      rating: 5
    },
    {
      id: 3,
      name: "Raju Vallapu",
      initial: "R",
      title: "I was satisfied from my end.",
      review: "I don't know what happened from others. It was my first experience, I was took bike from this end. Bike condition was fine. Those bike's are new one's. I was satisfied from my end.",
      rating: 4
    }
  ]

  const features = [
    {
      icon: "🕒",
      title: "24/7 Customer Support",
      description: "Our support team is available round the clock to assist customers."
    },
    {
      icon: "💰",
      title: "No Security Deposit",
      description: "Rent a bike without paying any security deposit upfront."
    },
    {
      icon: "↩️",
      title: "No Questions Asked Refund",
      description: "We ensure customers receive full refund without any questions asked."
    }
  ]

  const faqs = [
    {
      question: "How do I rent a bike from Vizygo?",
      answer: "Renting a bike from Vizygo is easy! Simply visit the Vizygo Web App or DM us on our instagram page, create an account, browse available bikes, and choose the one that suits your needs. Complete the booking process."
    },
    {
      question: "What documents are required to rent a bike?",
      answer: "To rent a bike from Vizygo, you will need to provide a valid driver's licence, aadhar and current address proof. These documents are required to verify your identity and eligibility to rent and operate a bike."
    },
    {
      question: "Can I rent a bike for just one day?",
      answer: "No, Minimum rental period for Vizygo rentals is 1 month."
    },
    {
      question: "How much does it cost to rent a bike from Vizygo?",
      answer: "The cost of renting a bike from Vizygo varies based on the bike model starting from rupees 3000 per month. You can view the pricing details for each bike in the Vizygo application before making a booking."
    }
  ]

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="page-hero about-hero">
        <div className="hero-content">
          <h1>🚲 About Vizygo</h1>
          <p className="hero-subtitle">Revolutionizing Urban Mobility</p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>🌟 Our Mission</h2>
              <p>
                Vizygo is revolutionizing the daily commute in metropolitan cities with its innovative bike sharing platform. 
                Our mission is clear: to offer convenient, affordable, and sustainable transportation solutions that cater to 
                the needs of urban dwellers. With a focus on redefining urban mobility, Vizygo provides a seamless rental 
                experience designed to accommodate a diverse range of users.
              </p>
              <p>
                Whether it's professionals commuting to work, families visiting loved ones, couples enjoying leisurely rides, 
                or friends exploring the city together, Vizygo ensures a hassle-free and enjoyable journey for all.
              </p>
              <p>
                Accessibility and affordability are fundamental principles at Vizygo. We strive to make every ride a seamless 
                and economical choice for our customers, enhancing lifestyles and fostering community connections along the way. 
                Our commitment goes beyond transportation; it's about empowering individuals to embrace sustainable alternatives 
                and contribute to a greener urban landscape.
              </p>
              <p>
                While currently operating on a bike rental model, Vizygo is dedicated to innovation and expansion. In the near 
                future, we plan to introduce a bike sharing model that will further empower individuals and communities to adopt 
                sustainable transportation practices. Join us as we revolutionize urban mobility, one ride at a time, and 
                experience the freedom, convenience, and joy of riding with Vizygo.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <h3>📈 1000+</h3>
                <p>Bikes Available</p>
              </div>
              <div className="stat-card">
                <h3>📍 3</h3>
                <p>Locations in Bangalore</p>
              </div>
              <div className="stat-card">
                <h3>⭐ 4.8</h3>
                <p>Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>✨ Why Choose Vizygo?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <h2>💬 Customer Reviews</h2>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-avatar">{review.initial}</div>
                  <div className="reviewer-info">
                    <h4>{review.name}</h4>
                    <div className="rating">
                      {"⭐".repeat(review.rating)}
                    </div>
                  </div>
                </div>
                <h5>{review.title}</h5>
                <p>{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="journey-section">
        <div className="container">
          <div className="journey-content">
            <h2>🎯 You Made the Right Choice</h2>
            <p>
              Vizygo aims to make bike rental easy and solve India's mobility problems. Starting with 20 bikes at one 
              location in 2021, we now have 1000+ bikes at 3 locations in Bangalore, serving our customers with reliable 
              and hassle-free rental services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>❓ Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Stories Page Component
const StoriesPage = () => {
  const [showShareModal, setShowShareModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [storyTitle, setStoryTitle] = useState('')
  const [storyContent, setStoryContent] = useState('')
  const [storyImage, setStoryImage] = useState(null)
  const [storyLikes, setStoryLikes] = useState({})

  const stories = [
    {
      id: 1,
      title: "My First Solo Ride Through Bangalore's Heritage",
      author: "Priya Sharma",
      location: "Cubbon Park to Lalbagh",
      content: "Exploring Bangalore on two wheels opened my eyes to the city's hidden gems. From the peaceful morning rides through Cubbon Park to discovering local breakfast spots, every journey tells a story. The freedom to stop wherever curiosity strikes is unmatched!",
      image: "🌳",
      date: "2 days ago",
      category: "exploration",
      initialLikes: 42
    },
    {
      id: 2,
      title: "Beating Bangalore Traffic: My Daily Commute Story",
      author: "Rajesh Kumar",
      location: "Electronic City to Koramangala",
      content: "Switching to bike rides for my daily commute has been life-changing. What used to be a stressful 2-hour journey in traffic is now a refreshing 45-minute ride. Plus, I discovered some amazing filter coffee spots along the way!",
      image: "🚦",
      date: "5 days ago",
      category: "commute",
      initialLikes: 38
    },
    {
      id: 3,
      title: "Weekend Food Trail: Bangalore's Street Food on Wheels",
      author: "Anita Reddy",
      location: "VV Puram to Brigade Road",
      content: "Nothing beats exploring Bangalore's famous food streets on a bike! From VV Puram's traditional South Indian breakfast to Brigade Road's chaat corners - the mobility gives you the perfect food hopping experience.",
      image: "🍛",
      date: "1 week ago",
      category: "food",
      initialLikes: 56
    },
    {
      id: 4,
      title: "Monsoon Rides: Dancing with Bangalore Weather",
      author: "Karthik Nair",
      location: "Ulsoor Lake Circuit",
      content: "Bangalore monsoons and bike rides - a perfect combination! The cool breeze, fresh air, and the city washed clean after rain creates magical moments. Just need to be prepared for those sudden showers!",
      image: "🌧️",
      date: "2 weeks ago",
      category: "weather",
      initialLikes: 29
    },
    {
      id: 5,
      title: "Early Morning Rides: Bangalore's Best Kept Secret",
      author: "Meera Iyer",
      location: "Nandi Hills Route",
      content: "5 AM rides from the city to Nandi Hills have become my weekend ritual. The empty roads, cool morning air, and watching sunrise from the hills - it's therapeutic. Bangalore mornings are pure magic on two wheels!",
      image: "🌅",
      date: "3 weeks ago",
      category: "adventure",
      initialLikes: 73
    },
    {
      id: 6,
      title: "Tech Parks to Parks: My Work-Life Balance Journey",
      author: "Arjun Mehta",
      location: "Whitefield to Bannerghatta",
      content: "Working in tech can be draining, but my evening rides from Whitefield to different parks around Bangalore have restored my work-life balance. Nature therapy combined with the joy of riding - perfect stress buster!",
      image: "🏢",
      date: "1 month ago",
      category: "lifestyle",
      initialLikes: 31
    }
  ]

  // Initialize likes state
  useEffect(() => {
    const initialLikes = {}
    stories.forEach(story => {
      initialLikes[story.id] = story.initialLikes
    })
    setStoryLikes(initialLikes)
  }, [])

  const handleLike = (storyId) => {
    setStoryLikes(prev => ({
      ...prev,
      [storyId]: (prev[storyId] || 0) + 1
    }))
  }

  const handleShareStory = () => {
    if (!storyTitle || !storyContent) {
      alert('Please fill in both title and story content!')
      return
    }
    
    // Reset form
    setStoryTitle('')
    setStoryContent('')
    setStoryImage(null)
    setShowShareModal(false)
    
    // Show success modal instead of alert
    setShowSuccessModal(true)
  }

  const getCategoryIcon = (category) => {
    const icons = {
      exploration: "🗺️",
      commute: "🚦",
      food: "🍛",
      weather: "🌧️",
      adventure: "🏔️",
      lifestyle: "🌟"
    }
    return icons[category] || "📖"
  }

  const getCategoryColor = (category) => {
    const colors = {
      exploration: "#28a745",
      commute: "#17a2b8",
      food: "#fd7e14",
      weather: "#6f42c1",
      adventure: "#dc3545",
      lifestyle: "#20c997"
    }
    return colors[category] || "#667eea"
  }

  return (
    <div className="stories-page">
      {/* Hero Section */}
      <section className="page-hero stories-hero">
        <div className="hero-content">
          <h1>📖 Bangalore Stories</h1>
          <p className="hero-subtitle">Real experiences from real people exploring the Garden City</p>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="stories-disclaimer">
        <div className="container">
          <div className="disclaimer-card">
            <h3>💡 About Our Stories</h3>
            <p>
              Welcome to our community stories! Here you'll find authentic experiences from people exploring Bangalore. 
              While many stories feature bike adventures (since we're passionate about two-wheeled exploration!), 
              we welcome all genuine experiences about discovering the city - from hidden cafes and scenic routes to 
              daily commute tips and weekend adventures. Share your Bangalore journey with us!
            </p>
          </div>
        </div>
      </section>

      {/* Share Story Section */}
      <section className="share-story-section">
        <div className="container">
          <div className="share-story-card">
            <h2>✨ Have a Bangalore Story to Share?</h2>
            <p>Whether it's a memorable ride, a hidden gem you discovered, or just an interesting day in the city - we'd love to hear about it!</p>
            <button className="share-story-btn" onClick={() => setShowShareModal(true)}>
              📝 Share Your Story
            </button>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="stories-section">
        <div className="container">
          <h2>🌟 Community Stories</h2>
          <div className="stories-grid">
            {stories.map((story) => (
              <div key={story.id} className="story-card">
                <div className="story-header">
                  <div className="story-emoji">{story.image}</div>
                  <div className="story-category" style={{ backgroundColor: getCategoryColor(story.category) }}>
                    {getCategoryIcon(story.category)} {story.category}
                  </div>
                </div>
                <h3>{story.title}</h3>
                <div className="story-meta">
                  <span className="story-author">👤 {story.author}</span>
                  <span className="story-location">📍 {story.location}</span>
                  <span className="story-date">🕒 {story.date}</span>
                </div>
                <p className="story-content">{story.content}</p>
                <div className="story-actions">
                  <button className="like-btn" onClick={() => handleLike(story.id)}>
                    ❤️ {storyLikes[story.id] || story.initialLikes}
                  </button>
                  <button className="comment-btn disabled" title="Comments are not available at this time">� 0</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Story Modal */}
      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="share-story-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📝 Share Your Bangalore Story</h2>
              <button className="close-modal" onClick={() => setShowShareModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="story-title">Story Title *</label>
                <input
                  id="story-title"
                  type="text"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  placeholder="Give your story a catchy title..."
                  className="story-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="story-content">Your Story *</label>
                <textarea
                  id="story-content"
                  value={storyContent}
                  onChange={(e) => setStoryContent(e.target.value)}
                  placeholder="Share your experience, discovery, or adventure in Bangalore..."
                  className="story-textarea"
                  rows="6"
                />
              </div>
              <div className="form-group">
                <label htmlFor="story-image">Add a Photo (Optional)</label>
                <input
                  id="story-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setStoryImage(e.target.files[0])}
                  className="story-file-input"
                />
                <p className="file-hint">Choose an image that captures your story moment</p>
              </div>
              <div className="story-guidelines">
                <h4>📋 Quick Guidelines</h4>
                <ul>
                  <li>Share authentic, personal experiences</li>
                  <li>Keep it positive and engaging</li>
                  <li>Stories can be about any Bangalore experience</li>
                  <li>Include specific locations if relevant</li>
                  <li>Be respectful of people and places</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button className="submit-story-btn" onClick={handleShareStory}>
                📤 Submit Story
              </button>
              <button className="cancel-btn" onClick={() => setShowShareModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-content">
              <div className="success-icon">🎉</div>
              <h2>Story Submitted Successfully!</h2>
              <div className="success-message">
                <p>Thank you for sharing your Bangalore experience! 📖</p>
                <div className="success-details">
                  <div className="success-step">
                    <span className="step-icon">📤</span>
                    <span>Your story has been sent to our admin team</span>
                  </div>
                  <div className="success-step">
                    <span className="step-icon">👥</span>
                    <span>Our team will review it within 24-48 hours</span>
                  </div>
                  <div className="success-step">
                    <span className="step-icon">✨</span>
                    <span>Once approved, it will be shared with the community</span>
                  </div>
                </div>
                <p className="success-note">
                  We'll notify you via email when your story goes live! Keep sharing your amazing Bangalore adventures with us.
                </p>
              </div>
              <button className="success-close-btn" onClick={() => setShowSuccessModal(false)}>
                🎯 Awesome!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Marketplace Page Component
const MarketplacePage = () => {
  const upcomingFeatures = [
    {
      icon: "🏍️",
      title: "Second-Hand Riding Gear",
      description: "Buy and sell pre-owned helmets, jackets, gloves, and protective gear at great prices."
    },
    {
      icon: "🛠️",
      title: "Bike Accessories",
      description: "Discover a wide range of bike accessories from phone mounts to cargo carriers."
    },
    {
      icon: "🎒",
      title: "Travel Equipment",
      description: "Find essential travel gear for your bike journeys - bags, tools, and camping equipment."
    },
    {
      icon: "💰",
      title: "Rental Options",
      description: "Don't want to buy? Rent expensive gear for specific trips or occasions."
    },
    {
      icon: "📱",
      title: "Easy Listing",
      description: "Simple process to list your items for sale or rent with photo uploads and descriptions."
    },
    {
      icon: "🔒",
      title: "Secure Transactions",
      description: "Safe and secure payment system with buyer and seller protection."
    }
  ]

  return (
    <div className="marketplace-page">
      {/* Hero Section */}
      <section className="page-hero marketplace-hero">
        <div className="hero-content">
          <h1>🛒 Marketplace</h1>
          <p className="hero-subtitle">Your One-Stop Shop for Riding Gear & Travel Equipment</p>
        </div>
      </section>

      {/* Under Construction Notice */}
      <section className="construction-notice">
        <div className="container">
          <div className="notice-card">
            <div className="notice-header">
              <h2>🔨 Under Construction</h2>
              <p>We're building something amazing for you!</p>
            </div>
            <div className="notice-content">
              <p>
                Our Marketplace is currently under development and will be available soon. This will be your 
                go-to destination for buying, selling, and renting riding gear and travel equipment.
              </p>
              <div className="timeline">
                <div className="timeline-item">
                  <span className="timeline-icon">📋</span>
                  <span>Planning & Design - Completed</span>
                </div>
                <div className="timeline-item active">
                  <span className="timeline-icon">⚙️</span>
                  <span>Development - In Progress</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-icon">🧪</span>
                  <span>Testing & Review - Coming Next</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-icon">🚀</span>
                  <span>Launch - Stay Tuned!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Coming Section */}
      <section className="features-preview">
        <div className="container">
          <h2>🌟 What's Coming to Marketplace</h2>
          <div className="features-grid">
            {upcomingFeatures.map((feature, index) => (
              <div key={index} className="feature-preview-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notification Signup */}
      <section className="notify-section">
        <div className="container">
          <div className="notify-card">
            <h2>📧 Get Notified When We Launch</h2>
            <p>Be the first to know when our Marketplace goes live! Get exclusive early access and special launch offers.</p>
            <div className="notify-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="notify-input"
              />
              <button className="notify-btn">🔔 Notify Me</button>
            </div>
            <p className="notify-disclaimer">
              We'll only send you updates about the Marketplace launch. No spam, we promise! 📨
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="marketplace-contact">
        <div className="container">
          <div className="contact-card">
            <h2>💬 Have Ideas or Suggestions?</h2>
            <p>We'd love to hear your thoughts on what you'd like to see in our Marketplace!</p>
            <div className="contact-options">
              <a href="mailto:marketplace@vizygo.in" className="contact-option">
                <span className="contact-icon">✉️</span>
                <span>marketplace@vizygo.in</span>
              </a>
              <a href="tel:+919182762800" className="contact-option">
                <span className="contact-icon">📱</span>
                <span>+91 9182762800</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Coupon Notification Component
const CouponNotification = ({ isVisible, onClose }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText('NEWUSER')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isVisible) return null

  return (
    <div className="coupon-notification">
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <div className="coupon-content">
        <div className="coupon-icon">🎉</div>
        <h3>Special Offer!</h3>
        <p>Get ₹500 off on your first booking</p>
        <div className="coupon-code-section">
          <div className="coupon-code" onClick={handleCopyCode}>
            <span className="code-text">NEWUSER</span>
            <span className="copy-icon">{copied ? '✓' : '📋'}</span>
          </div>
          <p className="copy-hint">{copied ? 'Copied!' : 'Click to copy'}</p>
        </div>
        <p className="coupon-terms">*Valid for new users only</p>
      </div>
    </div>
  )
}

// Footer Component
const Footer = ({ onNavigation }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Section */}
        <div className="footer-section">
          <h3>🏢 Company</h3>
          <p className="company-name">SOLACE TECHNOLOGIES AND COMMUTE PRIVATE LIMITED</p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>🔗 Quick Links</h3>
          <ul className="footer-links">
            <li><a onClick={() => onNavigation('about')}>About Us</a></li>
            <li><a onClick={() => onNavigation('privacy')}>Privacy Policy</a></li>
            <li><a onClick={() => onNavigation('terms')}>Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3>📞 Contact</h3>
          <div className="contact-info">
            <p>📱 +91 9182762800</p>
            <p>📱 +91 8011993337</p>
            <p>✉️ support@vizygo.in</p>
          </div>
        </div>

        {/* Address Section */}
        <div className="footer-section">
          <h3>📍 Follow Us on</h3>
          <div className="address">
            <p>UNIT 101 OXFORD TOWERS,</p>
            <p>139 HAL OLD AIRPORT RD,</p>
            <p>H.A.L II Stage, Bangalore,</p>
            <p>North, Bangalore- 560008,</p>
            <p>Karnataka</p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; 2025 Vizygo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Privacy Policy Page Component
const PrivacyPolicyPage = () => {
  return (
    <div className="policy-page">
      <div className="container">
        <h1>🔒 Privacy Policy</h1>
        
        <div className="policy-header">
          <p className="last-updated"><strong>Last updated:</strong> August 7, 2025</p>
        </div>
        
        <section className="policy-section">
          <h2>Sharing with Other Users</h2>
          <p>When you share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If you interact with other users or register through a Third-Party Social Media Service, your contacts on the Third-Party Social Media Service may see your name, profile, pictures, and description of your activity. Similarly, other users will be able to view descriptions of your activity, communicate with you, and view your profile.</p>
        </section>

        <section className="policy-section">
          <h2>With Your Consent</h2>
          <p>We may disclose your personal information for any other purpose with your consent.</p>
        </section>

        <section className="policy-section">
          <h2>Retention of Your Personal Data</h2>
          <p>The Company will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
          <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.</p>
          <p>If you wish to request deletion of your personal data, you may do so by sending us an email at <strong>contact@vizygo.in</strong> and we will comply with your request within 30 working days.</p>
        </section>

        <section className="policy-section">
          <h2>Transfer of Your Personal Data</h2>
          <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. This means that this information may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those from your jurisdiction.</p>
          <p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer. The Company will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>
        </section>

        <section className="policy-section">
          <h2>Disclosure of Your Personal Data</h2>
          
          <h3>Business Transactions</h3>
          <p>If the Company is involved in a merger, acquisition or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
          
          <h3>Law Enforcement</h3>
          <p>Under certain circumstances, the Company may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</p>
          
          <h3>Other Legal Requirements</h3>
          <p>The Company may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
          <ul>
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of the Company</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>Protect the personal safety of Users of the Service or the public</li>
            <li>Protect against legal liability</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Security of Your Personal Data</h2>
          <p>We take appropriate security measures to protect against unauthorized access to or alteration, disclosure, or destruction of data including accidental or intentional manipulation, loss from access by unauthorized parties. These include internal reviews of our data collection, storage and processing practices and security measures, including appropriate encryption and physical security measures to guard against unauthorized access to systems where we store personal data.</p>
          <p>All information gathered on the Vizygo App is securely stored within the controlled database. Access to the servers is password-protected and is strictly limited. Our security measures are regularly reviewed and updated to reflect technological developments.</p>
          <p>Regardless of where your personal information is transferred or stored, we take all steps reasonably necessary to ensure that personal information is kept secure; however, please understand that no transmission of data over the internet or any other public network can be guaranteed to be 100% secure.</p>
          <p>We seek to ensure compliance with the requirements of the applicable data protection laws to ensure the protection and preservation of the User's privacy and personal information. We have physical, electronic, and procedural safeguards that comply with the laws prevalent in specific jurisdictions to protect User's Personal Information.</p>
          <p>By accepting the terms of this Policy, you agree that the standards and practices being implemented by us are reasonable and sufficient for the protection of your personal information.</p>
          <p>We will contact you regarding any breach of the security, confidentiality, or integrity of your unencrypted electronically stored Personal Information to you via email or any other feasible manner in the most expedient time possible and without unreasonable delay, insofar as consistent with the legitimate needs of law enforcement and will undertake all measures necessary to determine the scope of the breach and restore the reasonable integrity of the data system.</p>
        </section>

        <section className="policy-section">
          <h2>Links to Other Websites</h2>
          <p>Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
        </section>

        <section className="policy-section">
          <h2>Changes to this Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.</p>
          <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
        </section>
      </div>
    </div>
  )
}

// Terms and Conditions Page Component
const TermsAndConditionsPage = () => {
  return (
    <div className="policy-page">
      <div className="container">
        <h1>📋 Terms and Conditions</h1>
        
        <section className="policy-section">
          <h2>General Conditions</h2>
          <ul>
            <li>The minimum booking period for rental bikes is one month.</li>
            <li>If a customer decides to return the vehicle before the completion of one month, no refund will be provided for the remaining period.</li>
            <li>In the event of early termination after the first month, the rental charges will be calculated based on the number of days the vehicle was used, and any remaining amount will be refunded accordingly.</li>
            <li>Customers are advised to thoroughly inspect the condition of the vehicle before taking possession. Any pre-existing damages or discrepancies should be documented and brought to the attention of the rental company to avoid disputes later.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Safety and Usage</h2>
          <ul>
            <li>Customers must be 18 years old or above and possess a valid Driving License.</li>
            <li>Customers are required to present their Driving License and Aadhar Card during the bike handover process.</li>
            <li>Users are responsible for maintaining the bike. Basic maintenance, such as servicing once every three months, will be covered by the company. However, any additional damages or repairs resulting from negligence or misuse will be the responsibility of the customer.</li>
            <li>It is the responsibility of the customer to ensure safe and lawful usage of the bike, adhering to all traffic regulations and safety guidelines.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Damages and Charges</h2>
          <ul>
            <li>Customers are accountable for any bike damage incurred during the rental period. In case of damages, repair costs will be borne by the customer, subject to inspection and assessment by authorised personnel.</li>
            <li>The company reserves the right to charge the customer for any damages or excessive wear beyond reasonable usage.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Support</h2>
          <ul>
            <li>Vizygo provides support services to facilitate the rental process and address any concerns or issues.</li>
            <li>Customers can reach out to our support team for assistance regarding bookings, maintenance, or any queries related to the rental agreement.</li>
            <li>We strive to ensure a seamless rental experience for our customers and are committed to resolving any issues promptly and efficiently.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Agreement</h2>
          <p>By renting a bike from Vizygo, customers agree to abide by these terms and conditions outlined above. Failure to comply may result in penalties, termination of the rental agreement, or legal action, as deemed appropriate by the company.</p>
        </section>
      </div>
    </div>
  )
}

function App() {
  const [bikes, setBikes] = useState([])
  const [selectedBike, setSelectedBike] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [filterLocation, setFilterLocation] = useState('all')
  const [filterPriceRange, setFilterPriceRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [currentLocation, setCurrentLocation] = useState('Bangalore')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('explore') // New state for page navigation
  const [showCouponNotification, setShowCouponNotification] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [user, setUser] = useState({ isLoggedIn: false, name: '', phoneNumber: '', email: '' })
  const [searchData, setSearchData] = useState(null)
  const [bikeDurations, setBikeDurations] = useState({}) // Store selected duration for each bike

  useEffect(() => {
    setBikes(sampleBikes)
  }, [])

  // Show coupon notification when user navigates to explore page
  useEffect(() => {
    if (currentPage === 'explore') {
      const timer = setTimeout(() => {
        setShowCouponNotification(true)
      }, 1000) // Show notification 1 second after entering explore page
      
      return () => clearTimeout(timer)
    } else {
      setShowCouponNotification(false)
    }
  }, [currentPage])

  const filteredBikes = bikes.filter(bike => {
    // Filter by category
    const categoryMatch = filterType === 'all' || bike.type === filterType
    
    // Filter by location
    const locationMatch = filterLocation === 'all' || bike.location === filterLocation
    
    // Filter by price range (using daily pricing)
    let priceMatch = true
    if (filterPriceRange !== 'all') {
      const dailyPrice = bike.pricing.daily.price
      switch (filterPriceRange) {
        case 'budget':
          priceMatch = dailyPrice <= 100
          break
        case 'mid':
          priceMatch = dailyPrice > 100 && dailyPrice <= 150
          break
        case 'premium':
          priceMatch = dailyPrice > 150
          break
        default:
          priceMatch = true
      }
    }
    
    return categoryMatch && locationMatch && priceMatch
  })

  // Helper function to clear all filters
  const clearAllFilters = () => {
    setFilterType('all')
    setFilterLocation('all')
    setFilterPriceRange('all')
  }

  const handleRentBike = (bikeId) => {
    setBikes(prev => prev.map(bike => 
      bike.id === bikeId ? { ...bike, available: false } : bike
    ))
    setSelectedBike(null)
    alert('Bike rented successfully! 🎉')
  }

  const handleLocationChange = (location) => {
    if (location !== 'Bangalore') {
      setShowLocationModal(true)
      // Keep the location as Bangalore for now
      return
    }
    setCurrentLocation(location)
    // You can add logic here to filter bikes by location
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleNavigation = (page) => {
    setCurrentPage(page)
    setSidebarOpen(false) // Close sidebar when navigating
  }

  const closeCouponNotification = () => {
    setShowCouponNotification(false)
  }

  const handleShowAuth = () => {
    setShowAuthModal(true)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setUser({ isLoggedIn: false, name: '', phoneNumber: '', email: '' })
    alert('👋 Logged out successfully!')
  }

  const handleSearch = (searchParams) => {
    setSearchData(searchParams)
    // Here you can add logic to filter bikes based on search parameters
    console.log('Search params:', searchParams)
  }

  const handleCloseLocationModal = () => {
    setShowLocationModal(false)
    // Reset location back to Bangalore
    setCurrentLocation('Bangalore')
  }

  return (
    <div className="bike-rental-app">
      {/* Navigation Bar */}
      <Navbar 
        currentLocation={currentLocation}
        onLocationChange={handleLocationChange}
        onSidebarToggle={toggleSidebar}
        currentPage={currentPage}
        onNavigation={handleNavigation}
        user={user}
        onShowAuth={handleShowAuth}
        onLogout={handleLogout}
      />

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <h3>Menu</h3>
              <button className="close-sidebar" onClick={toggleSidebar}>×</button>
            </div>
            <div className="sidebar-content">
              <ul className="sidebar-links">
                <li>
                  <a 
                    onClick={(e) => { e.preventDefault(); handleNavigation('explore'); }}
                    className={currentPage === 'explore' ? 'active' : ''}
                  >
                    🏠 Explore
                  </a>
                </li>
                <li>
                  <a 
                    onClick={(e) => { e.preventDefault(); handleNavigation('about'); }}
                    className={currentPage === 'about' ? 'active' : ''}
                  >
                    ℹ️ About Us
                  </a>
                </li>
                <li>
                  <a 
                    onClick={(e) => { e.preventDefault(); handleNavigation('stories'); }}
                    className={currentPage === 'stories' ? 'active' : ''}
                  >
                    📖 Stories
                  </a>
                </li>
                <li>
                  <a 
                    onClick={(e) => { e.preventDefault(); handleNavigation('offers'); }}
                    className={currentPage === 'offers' ? 'active' : ''}
                  >
                    🎉 Offers
                  </a>
                </li>
                <li>
                  <a 
                    onClick={(e) => { e.preventDefault(); handleNavigation('marketplace'); }}
                    className={currentPage === 'marketplace' ? 'active' : ''}
                  >
                    🛒 Marketplace
                  </a>
                </li>
                <li><hr className="sidebar-divider" /></li>
                <li><a href="#profile">👤 My Profile</a></li>
                <li><a href="#rentals">🚲 My Rentals</a></li>
                <li><a href="#favorites">❤️ Favorites</a></li>
                <li><a href="#settings">⚙️ Settings</a></li>
                <li><a href="#help">❓ Help & Support</a></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Page Content based on current page */}
      {currentPage === 'explore' && (
        <div className="main-content">
          {/* Search Ride Component */}
          <SearchRide onSearch={handleSearch} currentLocation={currentLocation} searchData={searchData} />

          {/* Enhanced Filter Section */}
          <div className="enhanced-filter-section">
            <div className="filter-header">
              <div className="filter-title">
                <h3>🔍 Filters</h3>
                <span className="results-count">
                  {filteredBikes.length} bike{filteredBikes.length !== 1 ? 's' : ''} found
                </span>
              </div>
              <div className="filter-actions">
                <button 
                  className="toggle-filters-btn"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <span className="filter-icon">⚙️</span>
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                  <span className={`chevron ${showFilters ? 'up' : 'down'}`}>▼</span>
                </button>
                {(filterType !== 'all' || filterLocation !== 'all' || filterPriceRange !== 'all') && (
                  <button className="clear-filters-btn" onClick={clearAllFilters}>
                    ✕ Clear All
                  </button>
                )}
              </div>
            </div>

            {showFilters && (
              <div className="filter-content">
                <div className="filter-grid">
                  {/* Category Filter */}
                  <div className="filter-group">
                    <label className="filter-label">
                      <span className="filter-icon">🏷️</span>
                      Category
                    </label>
                    <select 
                      className="filter-select"
                      value={filterType} 
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="bikes">🏍️ Bikes</option>
                      <option value="premium">⭐ Premium</option>
                      <option value="scooties">🛵 Scooties</option>
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div className="filter-group">
                    <label className="filter-label">
                      <span className="filter-icon">📍</span>
                      Location in Bangalore
                    </label>
                    <select 
                      className="filter-select"
                      value={filterLocation} 
                      onChange={(e) => setFilterLocation(e.target.value)}
                    >
                      <option value="all">All Locations</option>
                      <option value="Koramangala">Koramangala</option>
                      <option value="Indiranagar">Indiranagar</option>
                      <option value="BTM Layout">BTM Layout</option>
                      <option value="Electronic City">Electronic City</option>
                      <option value="Whitefield">Whitefield</option>
                      <option value="Jayanagar">Jayanagar</option>
                      <option value="HSR Layout">HSR Layout</option>
                      <option value="Marathahalli">Marathahalli</option>
                      <option value="Bannerghatta Road">Bannerghatta Road</option>
                      <option value="Sarjapur Road">Sarjapur Road</option>
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div className="filter-group">
                    <label className="filter-label">
                      <span className="filter-icon">💰</span>
                      Price Range (Daily)
                    </label>
                    <select 
                      className="filter-select"
                      value={filterPriceRange} 
                      onChange={(e) => setFilterPriceRange(e.target.value)}
                    >
                      <option value="all">All Prices</option>
                      <option value="budget">💚 Budget (₹0 - ₹100)</option>
                      <option value="mid">💛 Mid-Range (₹101 - ₹150)</option>
                      <option value="premium">💜 Premium (₹151+)</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(filterType !== 'all' || filterLocation !== 'all' || filterPriceRange !== 'all') && (
                  <div className="active-filters">
                    <span className="active-filters-label">Active filters:</span>
                    <div className="filter-tags">
                      {filterType !== 'all' && (
                        <span className="filter-tag">
                          Category: {filterType}
                          <button onClick={() => setFilterType('all')}>×</button>
                        </span>
                      )}
                      {filterLocation !== 'all' && (
                        <span className="filter-tag">
                          Location: {filterLocation}
                          <button onClick={() => setFilterLocation('all')}>×</button>
                        </span>
                      )}
                      {filterPriceRange !== 'all' && (
                        <span className="filter-tag">
                          Price: {filterPriceRange}
                          <button onClick={() => setFilterPriceRange('all')}>×</button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bikes-grid">
            {filteredBikes.map(bike => {
              const selectedDuration = bikeDurations[bike.id] || 'daily'
              const currentPrice = bike.pricing[selectedDuration]
              
              const handleDurationChange = (bikeId, duration) => {
                setBikeDurations(prev => ({
                  ...prev,
                  [bikeId]: duration
                }))
              }

              return (
                <div key={bike.id} className={`enhanced-bike-card ${!bike.available ? 'unavailable' : ''}`}>
                  {/* Bike Image */}
                  <div className="bike-image-container">
                    <img 
                      src={bike.image} 
                      alt={bike.name}
                      className="bike-image"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjVmNWY1Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJpa2UgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg=='
                      }}
                    />
                    <div className="bike-category-badge">{bike.category}</div>
                  </div>

                  {/* Bike Info */}
                  <div className="bike-info">
                    <h3 className="bike-name">{bike.name}</h3>
                    <p className="bike-location">📍 {bike.location}</p>
                    
                    {/* Duration Selector */}
                    <div className="duration-selector">
                      <div className="duration-tabs">
                        {[
                          { key: 'daily', label: 'Daily' },
                          { key: 'weekly', label: '7 Days' },
                          { key: 'biweekly', label: '15 Days' },
                          { key: 'monthly', label: '30 Days' }
                        ].map(({ key, label }) => (
                          <button
                            key={key}
                            className={`duration-tab ${selectedDuration === key ? 'active' : ''}`}
                            onClick={() => handleDurationChange(bike.id, key)}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <div className="selected-price">
                        ₹{currentPrice.price}/day • {currentPrice.kmLimit}km limit
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="time-slots">
                      {/* Weekdays */}
                      <div className="time-slot-group">
                        <h4>{bike.timeSlots.weekdays.label}</h4>
                        <p className="min-booking">(Min {bike.timeSlots.weekdays.minBooking} hrs booking)</p>
                        <div className="booking-rates">
                          {bike.timeSlots.weekdays.rates.map((rate, index) => (
                            <div key={index} className="rate-item">
                              <span className="rate-duration">Booking Time ({rate.duration})</span>
                              <span className="rate-price">₹ {rate.price}/hr</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Weekends */}
                      <div className="time-slot-group">
                        <h4>{bike.timeSlots.weekends.label}</h4>
                        <p className="min-booking">(Min {bike.timeSlots.weekends.minBooking}hrs booking)</p>
                        <div className="booking-rates">
                          {bike.timeSlots.weekends.rates.map((rate, index) => (
                            <div key={index} className="rate-item">
                              <span className="rate-duration">Booking Time ({rate.duration})</span>
                              <span className="rate-price">₹ {rate.price}/hr</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Extras */}
                    <div className="extras-section">
                      <h4>Extras</h4>
                      <div className="extras-grid">
                        <div className="extra-item">
                          <span className="extra-label">Km limit</span>
                          <span className="extra-value">₹{bike.extras.kmLimit}/hr</span>
                        </div>
                        <div className="extra-item">
                          <span className="extra-label">Excess km charges</span>
                          <span className="extra-value">₹ {bike.extras.excessKmCharges}/km</span>
                        </div>
                      </div>
                    </div>

                    {/* Availability Status and Book Button */}
                    <div className="bike-footer">
                      <div className={`availability-status ${bike.available ? 'available' : 'unavailable'}`}>
                        {bike.available ? '✅ Available' : '❌ Not Available'}
                      </div>
                      <button 
                        className={`book-button ${!bike.available ? 'disabled' : ''}`}
                        onClick={() => bike.available && setSelectedBike(bike)}
                        disabled={!bike.available}
                      >
                        {bike.available ? 'Book Now' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {currentPage === 'about' && <AboutUsPage />}

      {currentPage === 'stories' && <StoriesPage />}

      {currentPage === 'marketplace' && <MarketplacePage />}

      {currentPage === 'privacy' && <PrivacyPolicyPage />}

      {currentPage === 'terms' && <TermsAndConditionsPage />}

      {currentPage === 'offers' && (
        <div className="offers-page">
          {/* Hero Section */}
          <section className="page-hero offers-hero">
            <div className="hero-content">
              <h1>🎉 Special Offers</h1>
              <p className="hero-subtitle">Amazing deals and discounts on bike rentals</p>
            </div>
          </section>

          {/* Coming Soon Section */}
          <section className="offers-coming-soon">
            <div className="container">
              <div className="coming-soon-card">
                <div className="coming-soon-icon">🚧</div>
                <h2>Coming Soon!</h2>
                <p>We're working on exciting offers and deals for you. Stay tuned for amazing discounts!</p>
                <div className="offers-preview">
                  <div className="preview-item">
                    <span className="preview-icon">💰</span>
                    <span>Early Bird Discounts</span>
                  </div>
                  <div className="preview-item">
                    <span className="preview-icon">🎯</span>
                    <span>Loyalty Rewards</span>
                  </div>
                  <div className="preview-item">
                    <span className="preview-icon">🎁</span>
                    <span>Referral Bonuses</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {selectedBike && (
        <div className="modal-overlay" onClick={() => setSelectedBike(null)}>
          <div className="rental-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Rent {selectedBike.name}</h2>
            <div className="modal-content">
              <div className="bike-emoji large">{selectedBike.image}</div>
              <p><strong>Type:</strong> {selectedBike.type}</p>
              <p><strong>Location:</strong> {selectedBike.location}</p>
              <p><strong>Price:</strong> ${selectedBike.price}/hour</p>
            </div>
            <div className="modal-actions">
              <button 
                className="confirm-button"
                onClick={() => handleRentBike(selectedBike.id)}
              >
                Confirm Rental
              </button>
              <button 
                className="cancel-button"
                onClick={() => setSelectedBike(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coupon Notification */}
      <CouponNotification 
        isVisible={showCouponNotification} 
        onClose={closeCouponNotification} 
      />

      {/* Authentication Modal */}
      <AuthModal 
        isVisible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />

      {/* Location Not Available Modal */}
      {showLocationModal && (
        <div className="modal-overlay" onClick={handleCloseLocationModal}>
          <div className="location-modal" onClick={(e) => e.stopPropagation()}>
            <div className="location-modal-header">
              <h2>🚧 Service Expansion in Progress</h2>
              <button className="close-modal" onClick={handleCloseLocationModal}>×</button>
            </div>
            <div className="location-modal-body">
              <div className="expansion-icon">🚀</div>
              <h3>We're Coming to Your City Soon!</h3>
              <p>
                We're still in the process of extending our bike rental services to this location. 
                Our team is working hard to bring Vizygo to more cities across India.
              </p>
              <div className="expansion-features">
                <div className="expansion-feature">
                  <span className="feature-icon">📍</span>
                  <span>Currently serving <strong>Bangalore</strong></span>
                </div>
                <div className="expansion-feature">
                  <span className="feature-icon">🗺️</span>
                  <span>Expanding to more cities in <strong>2025</strong></span>
                </div>
                <div className="expansion-feature">
                  <span className="feature-icon">🔔</span>
                  <span>Get notified when we launch in your city</span>
                </div>
              </div>
              <div className="notification-signup">
                <h4>📧 Stay Updated</h4>
                <p>Enter your email to be the first to know when we launch in your city:</p>
                <div className="email-signup">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="email-input"
                  />
                  <button className="signup-btn">🔔 Notify Me</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Support */}
      <ChatSupport />

      {/* Footer */}
      <Footer onNavigation={handleNavigation} />
    </div>
  )
}

export default App
