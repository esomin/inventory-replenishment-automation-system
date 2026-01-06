# macOS (Apple Silicon, M1 Pro) ML 개발 환경 설정 가이드

## 1) 필수 도구 설치
- Xcode Command Line Tools: `xcode-select --install`
- Homebrew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

## 2) 시스템 패키지
brew update
brew install python@3.11 cmake libomp
# 선택: gcc (LightGBM 빌드 시 필요할 수 있음)
brew install gcc

# Windows 11 ML 개발 환경 설정 가이드

## 1) 필수 도구 설치
- Visual Studio Build Tools (C++)
  - https://visualstudio.microsoft.com/visual-cpp-build-tools/
  - → Desktop development with C++ 선택

- 패키지 매니저(택1)
  - Winget (기본 내장)
  - Chocolatey (선택)

## 2) 시스템 패키지
 - Python
   - winget install Python.Python.3.11

- CMake
  - winget install Kitware.CMake

- OpenMP
  - Windows에서는 MSVC에 기본 포함 (별도 설치 불필요)

- gcc
  - 불필요 (MSVC 사용)