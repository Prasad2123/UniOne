// Firebase Test Numbers Helper
// These are special phone numbers that Firebase provides for testing

export const FIREBASE_TEST_NUMBERS = [
  {
    number: "+1-555-123-4567",
    otp: "123456",
    description: "Standard test number"
  },
  {
    number: "+1-555-987-6543",
    otp: "654321",
    description: "Alternative test number"
  },
  {
    number: "+1-555-000-0000",
    otp: "000000",
    description: "Zero test number"
  }
];

// Check if a phone number is a Firebase test number
export const isFirebaseTestNumber = (phoneNumber) => {
  return phoneNumber.startsWith('+1-555-');
};

// Get OTP for Firebase test number (for development only)
export const getTestOTP = (phoneNumber) => {
  const testNumber = FIREBASE_TEST_NUMBERS.find(
    test => test.number === phoneNumber
  );
  return testNumber ? testNumber.otp : null;
};

// Display test number instructions
export const displayTestNumberInstructions = () => {
  console.log("🧪 FIREBASE TEST NUMBERS:");
  console.log("📋 Use these numbers for unlimited testing:");
  FIREBASE_TEST_NUMBERS.forEach((test, index) => {
    console.log(`${index + 1}. ${test.number} → OTP: ${test.otp}`);
  });
  console.log("💡 These numbers don't send real SMS - OTP is always the same");
  console.log("🔧 For custom test numbers, check Firebase Console → Authentication → Sign-in method → Phone → Test phone numbers");
};
