type Question = {
  id: number;
  title: string;
  isSolved: boolean;
  solvedAt?: string | null;
  link?: string;
  youtube?: string;
};

// Save new topic (POST request)
export const saveTopics = async (topic: { name: string; description: string }) => {
  try {
    const response = await fetch("https://cracked-backend-4b74.vercel.app/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topic),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving topic:", error);
    throw error;
  }
};

// Save new question (POST request)
export const saveQuestion = async (question: { title: string; isSolved: boolean; link?: string; youtube?: string; topicId: number }) => {
  try {
    const { topicId, ...questionData } = question; // Extract topicId and question details
    const response = await fetch(`https://cracked-backend-4b74.vercel.app/api/topics/${topicId}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData), // Send question details in the request body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving question:", error);
    throw error;
  }
};

// Fetch all questions by Topic ID (GET request)
export const getQuestionsByTopicId = async (topicId: number) => {
  try {
    const response = await fetch(`https://cracked-backend-4b74.vercel.app/api/topics/${topicId}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error fetching questions for topic ${topicId}:`, error);
    throw error;
  }
};

// Delete a question
export const deleteQuestion = async (questionId: number, topicId: number) => {
  try {
    console.log(`Sending DELETE request for questionId: ${questionId}, topicId: ${topicId}`);
    const response = await fetch(`https://cracked-backend-4b74.vercel.app/api/topics/${topicId}/questions/${questionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      if (response.status === 404) {
        throw new Error('Question not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Delete request succeeded');
    return await response.json();
  } catch (error) {
    console.error(`Error deleting question ${questionId}:`, error);
    throw error;
  }
};

// Fetch dashboard metrics
export const fetchDashboardMetrics = async () => {
  try {
    const response = await fetch(`https://cracked-backend-4b74.vercel.app/api/metrics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result; // Return the metrics data from the backend
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    throw error;
  }
};

// Update a question
export const updateQuestion = async (questionId: number, topicId: number, data: Partial<Question>) => {
  try {
    const response = await fetch(`https://cracked-backend-4b74.vercel.app/api/topics/${topicId}/questions/${questionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};
