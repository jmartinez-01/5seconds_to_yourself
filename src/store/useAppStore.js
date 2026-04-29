import { create } from 'zustand'

const useAppStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  onboardingStep: 0,
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  
  onboardingData: {
    name: '',
    goals: [],
    mood: ''
  },
  setOnboardingData: (data) => set((state) => ({ 
    onboardingData: { ...state.onboardingData, ...data } 
  })),

  streak: 0,
  setStreak: (streak) => set({ streak }),

  // Simple UI state
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab })
}))

export default useAppStore
