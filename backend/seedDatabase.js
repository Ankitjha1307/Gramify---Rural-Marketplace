const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Artisan = require('./models/Artisan');
const Booking = require('./models/Booking');
const seedData = require('../database/seedData.json');
require('dotenv').config(); // Add this to load .env

const seedDatabase = async () => {
  try {
    // Use the same connection string as your server
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gramify';
    
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await User.deleteMany({});
    await Artisan.deleteMany({});
    await Booking.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = [];
    
    for (const userData of seedData.users) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const user = new User({
        ...userData,
        password: hashedPassword
      });
      
      await user.save();
      createdUsers.push(user);
      console.log(`✅ Created user: ${user.name} (${user.email}) (${user.password})`);
    }

    // Create artisans and link to users
    console.log('🔧 Creating artisans...');
    for (const artisanData of seedData.artisans) {
      // Find the corresponding user
      const user = createdUsers.find(u => u.name === artisanData.name);
      
      if (user) {
        const artisan = new Artisan({
          userId: user._id,
          skills: artisanData.skills,
          bio: artisanData.bio,
          rating: artisanData.rating,
          totalJobs: artisanData.totalJobs,
          services: artisanData.services,
          isBlockchainVerified: user.isVerified || false
        });
        
        await artisan.save();
        console.log(`✅ Created artisan: ${artisanData.name}`);
      } else {
        console.log(`❌ User not found for artisan: ${artisanData.name}`);
      }
    }

    // Create bookings
    console.log('📋 Creating bookings...');
    for (const bookingData of seedData.bookings) {
      // Find customer and artisan users
      const customer = createdUsers.find(u => u.name === bookingData.customerName);
      const artisan = createdUsers.find(u => u.name === bookingData.artisanName);
      
      if (customer && artisan) {
        const booking = new Booking({
          customerId: customer._id,
          artisanId: artisan._id,
          serviceTitle: bookingData.serviceTitle,
          serviceDescription: bookingData.serviceDescription,
          amount: bookingData.amount,
          status: bookingData.status,
          paymentStatus: bookingData.paymentStatus,
          address: bookingData.address,
          scheduledDate: bookingData.scheduledDate
        });
        
        await booking.save();
        console.log(`✅ Created booking: ${bookingData.serviceTitle}`);
      } else {
        console.log(`❌ Users not found for booking: ${bookingData.serviceTitle}`);
      }
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Artisans: ${seedData.artisans.length}`);
    console.log(`   Bookings: ${seedData.bookings.length}`);
    
    console.log('\n🔑 Login Credentials:');
    Object.entries(seedData.loginCredentials).forEach(([key, cred]) => {
      console.log(`   ${cred.name}: ${cred.email} / ${cred.password}`);
    });

  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    console.log('💡 Make sure your MONGODB_URI in .env is correct and MongoDB Atlas is accessible');
  } finally {
    await mongoose.connection.close();
    console.log('📚 Database connection closed');
    process.exit(0);
  }
};

// Run the seed function
seedDatabase();