// This is a test file to debug connection issues
import axios from 'axios';
import API_BASE_URL, { TEST_API_URL } from './config/api.config';

// Test the actual endpoint from our backend
export async function testConnection() {
  const results = {
    mainEndpoint: await testEndpoint(`${TEST_API_URL}all`),
    rootEndpoint: await testEndpoint(API_BASE_URL.replace('/api', ''))
  };
  
  console.log('Connection test results:', results);
  return results;
}

async function testEndpoint(url) {
  try {
    console.log(`Testing connection to: ${url}`);
    const response = await axios.get(url);
    console.log(`Connection to ${url} successful:`, response.data);
    return { 
      success: true, 
      data: response.data,
      status: response.status
    };
  } catch (error) {
    console.error(`Connection to ${url} failed:`, error);
    return { 
      success: false, 
      error: error.message, 
      status: error.response?.status,
      statusText: error.response?.statusText,
      details: error.response?.data || 'No response data'
    };
  }
}

// Expose for testing in browser console
window.testConnection = testConnection;
