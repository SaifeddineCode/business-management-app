import prisma from './config/prisma.js';

async function testConnection() {
  try {
    console.log('🔄 Testing Prisma connection...');
    console.log(`📦 Database: ${process.env.DB_NAME}`);
    console.log(`🖥️  Host: ${process.env.DB_HOST}`);
    
    const result = await prisma.$queryRaw`SELECT 1 as status`;
    console.log('✅ Prisma Connected to Database Successfully!');
    console.log('Result:', result);
  } catch (error) {
    console.log('❌ Connection Failed!');
    console.log('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
