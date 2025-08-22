const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export interface QuizConfig {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount?: number;
}

export interface QuizResponse {
  success: boolean;
  data: {
    topic: string;
    difficulty: string;
    questionCount: number;
    questions: Question[];
  };
}

export interface QuizSubmission {
  questions: Question[];
  userAnswers: string[];
  topic: string;
  difficulty: string;
}

export interface QuizResults {
  success: boolean;
  data: {
    topic: string;
    difficulty: string;
    totalQuestions: number;
    correctAnswers: number;
    score: string;
    performanceLevel: string;
    results: Array<{
      questionIndex: number;
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      explanation: string;
    }>;
  };
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<{ status: string; message: string }> {
    return this.request('/api/health');
  }

  async generateQuiz(config: QuizConfig): Promise<QuizResponse> {
    return this.request('/api/generate-quiz', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async submitQuiz(submission: QuizSubmission): Promise<QuizResults> {
    return this.request('/api/submit-quiz', {
      method: 'POST',
      body: JSON.stringify(submission),
    });
  }
}

export const apiService = new ApiService();
export default apiService;