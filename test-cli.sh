#!/bin/bash

# Test script for create-react-native-app CLI
# Run this after npm link to test the CLI

set -e

echo "🧪 Testing create-react-native-app CLI"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test directory
TEST_DIR="/tmp/create-react-native-app-test"

echo "📁 Creating test directory..."
rm -rf "$TEST_DIR"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

echo ""
echo "${YELLOW}Test 1: Create app with pnpm${NC}"
echo "Running: create-react-native-app TestPnpm -p pnpm --skip-install --skip-git"
create-react-native-app TestPnpm -p pnpm --skip-install --skip-git

if [ -d "TestPnpm" ]; then
    echo "${GREEN}✅ Test 1 passed: TestPnpm created${NC}"
    
    # Check if placeholders were replaced
    if grep -q "TestPnpm" "TestPnpm/package.json"; then
        echo "${GREEN}✅ package.json has correct name${NC}"
    else
        echo "${RED}❌ package.json doesn't have correct name${NC}"
    fi
    
    if grep -q "TestPnpm" "TestPnpm/app.json"; then
        echo "${GREEN}✅ app.json has correct name${NC}"
    else
        echo "${RED}❌ app.json doesn't have correct name${NC}"
    fi
else
    echo "${RED}❌ Test 1 failed: TestPnpm not created${NC}"
    exit 1
fi

echo ""
echo "${YELLOW}Test 2: Create app with npm${NC}"
echo "Running: create-react-native-app TestNpm -p npm --skip-install --skip-git"
create-react-native-app TestNpm -p npm --skip-install --skip-git

if [ -d "TestNpm" ]; then
    echo "${GREEN}✅ Test 2 passed: TestNpm created${NC}"
else
    echo "${RED}❌ Test 2 failed: TestNpm not created${NC}"
    exit 1
fi

echo ""
echo "${YELLOW}Test 3: Check iOS directory renamed${NC}"
if [ -d "TestPnpm/ios/TestPnpm" ]; then
    echo "${GREEN}✅ iOS directory renamed correctly${NC}"
else
    echo "${RED}❌ iOS directory not renamed${NC}"
    exit 1
fi

echo ""
echo "${YELLOW}Test 4: Check Android package renamed${NC}"
if [ -d "TestPnpm/android/app/src/main/java/com/testpnpm" ]; then
    echo "${GREEN}✅ Android package renamed correctly${NC}"
else
    echo "${RED}❌ Android package not renamed${NC}"
    # List what we have
    ls -la TestPnpm/android/app/src/main/java/com/
    exit 1
fi

echo ""
echo "${YELLOW}Test 5: Check .gitignore exists${NC}"
if [ -f "TestPnpm/.gitignore" ]; then
    echo "${GREEN}✅ .gitignore created from _gitignore${NC}"
else
    echo "${RED}❌ .gitignore not created${NC}"
    exit 1
fi

echo ""
echo "${GREEN}🎉 All tests passed!${NC}"
echo ""
echo "Test projects created in: $TEST_DIR"
echo "You can manually check them:"
echo "  cd $TEST_DIR/TestPnpm"
echo "  pnpm install"
echo "  pnpm run ios"
echo ""
echo "To clean up test directory:"
echo "  rm -rf $TEST_DIR"

