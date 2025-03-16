import React, { useState, useRef, useEffect } from 'react';
    import './Quiz.css';
    import QuizSkeleton from './QuizSkeleton';

    const questions = [
      {
        text: 'How often do you experience bloating?',
        options: ['Rarely or Never', 'Sometimes', 'Often', 'Constantly'],
        scores: [0, 1, 2, 3],
      },
      {
        text: 'How often do you eat processed foods?',
        options: ['Rarely or Never', '1-2 times a week', '3-5 times a week', 'Daily'],
        scores: [0, 1, 2, 3],
      },
      {
        text: 'How often do you consume fermented foods (e.g., yogurt, kimchi)?',
        options: ['Daily', 'A few times a week', 'Rarely', 'Never'],
        scores: [0, 1, 2, 3],
      },
      {
        text: 'How often do you feel stressed?',
        options: ['Rarely', 'Sometimes', 'Often', 'Constantly'],
        scores: [0, 1, 2, 3],
      },
      {
        text: 'How many servings of fruits and vegetables do you eat per day?',
        options: ['5+', '3-4', '1-2', 'Less than 1'],
        scores: [0, 1, 2, 3],
      },
      {
        text: 'How often do you experience heartburn or acid reflux?',
        options: ['Rarely or Never', 'Sometimes', 'Often', 'Constantly'],
        scores: [0, 1, 2, 3],
      },
      {
        text: 'How regular are your bowel movements?',
        options: ['Very Regular', 'Mostly Regular', 'Irregular', 'Very Irregular'],
        scores: [0, 1, 2, 3],
      },
      {
        text: 'Do you take antibiotics frequently?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often'],
        scores: [0, 1, 2, 3],
      },
      {
        text: 'How well do you sleep on average?',
        options: ['Very Well', 'Well', 'Poorly', 'Very Poorly'],
        scores: [0, 1, 2, 3],
      },
      {
        text: 'Do you have any known food sensitivities or allergies?',
        options: ['No', 'I suspect some', 'Yes, a few', 'Yes, many'],
        scores: [0, 1, 2, 3],
      },
    ];

    const simulateMailchimpSubscribe = (email, gutType) => {
      console.log(
        `Simulated Mailchimp API call: Subscribing user with email ${email} and gut type ${gutType}.`
      );
    };

    const simulateMailchimpSendCampaign = (email, campaignName) => {
      console.log(
        `Simulated Mailchimp API call: Sending campaign "${campaignName}" to ${email}.`
      );
    };

    const simulateGoogleAnalyticsEvent = (eventName, eventParams) => {
      console.log(
        `Simulated Google Analytics event: ${eventName}`,
        eventParams
      );
    };

    // Extract calculateResult to a separate function for testing
    export function calculateResult(answers, questions) {
      let totalScore = 0;
      for (let i = 0; i < questions.length; i++) {
        if (answers[i] !== null) {
          totalScore += questions[i].scores[answers[i]];
        }
      }

      if (totalScore <= 10) {
        return 'Probiotic Pro';
      } else {
        return 'Leaky Gut Warrior';
      }
    }
    export {questions}

    function Quiz() {
      const [currentQuestion, setCurrentQuestion] = useState(0);
      const [answers, setAnswers] = useState(Array(questions.length).fill(null));
      const [quizCompleted, setQuizCompleted] = useState(false);
      const [shareImage, setShareImage] = useState(null);
      const [showPopup, setShowPopup] = useState(false);
      const [email, setEmail] = useState('');
      const [savedEmails, setSavedEmails] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      const canvasRef = useRef(null);

      const handleAnswer = (answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answerIndex;
        setAnswers(newAnswers);

        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setQuizCompleted(true);
          setShowPopup(true);
        }
      };

      const handleShare = (gutType) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = 400;
        canvas.height = 200;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f0fff0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#2e8b57';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText('Gut Guardian', 20, 40);
        ctx.fillStyle = '#333';
        ctx.font = '20px sans-serif';
        ctx.fillText(`Your Gut Type: ${gutType}`, 20, 80);
        ctx.fillStyle = '#66cdaa';
        ctx.font = '16px sans-serif';
        ctx.fillText('gutguardian.com/quiz', 20, 120);
        const dataURL = canvas.toDataURL('image/png');
        setShareImage(dataURL);
      };

      const handleGetGuide = () => {
        if (email) {
          const updatedEmails = [...savedEmails, email];
          setSavedEmails(updatedEmails);
          localStorage.setItem('emails', JSON.stringify(updatedEmails));

          const gutType = calculateResult(answers, questions);
          simulateMailchimpSubscribe(email, gutType);
          simulateMailchimpSendCampaign(email, 'Your Gut Type Explained + Free Tips');

          setTimeout(() => {
            simulateMailchimpSendCampaign(email, `Top 3 Probiotics for ${gutType}`);
          }, 5000);

          setTimeout(() => {
            simulateMailchimpSendCampaign(email, "20% Off Our Partner's Detox Kit");
          }, 10000);

          setEmail('');
          setShowPopup(false);
        }
      };

      useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
      }, []);

      useEffect(() => {
        if (quizCompleted) {
          const gutType = calculateResult(answers, questions);
          if (canvasRef.current) {
            handleShare(gutType);
          }
          simulateGoogleAnalyticsEvent('quiz_completed', { gut_type: gutType });
        }
      }, [quizCompleted]);

      if (isLoading) {
        return <QuizSkeleton />;
      }

      if (quizCompleted) {
        const gutType = calculateResult(answers, questions);
        return (
          <div>
            <h2>Quiz Completed!</h2>
            <p>Your Gut Type: {gutType}</p>
            <button onClick={() => handleShare(gutType)}>Share Your Result</button>

            {showPopup && (
              <div className="popup">
                <h3>Get Your Free Gut Health Guide!</h3>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleGetGuide}>Get Guide</button>
                <p>
                  <strong>Note:</strong> Email saving and Mailchimp integration are simulated.
                </p>
              </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {shareImage && (
              <div>
                <h3>Shareable Image (Simulated)</h3>
                <img src={shareImage} alt="Gut Guardian Quiz Result" style={{ border: '1px solid #ddd' }} />
                <p>Right-click and save this image to share.</p>
              </div>
            )}
            {savedEmails.length > 0 && (
              <div>
                <h3>Simulated CSV Data:</h3>
                <pre>{`email\n${savedEmails.join('\n')}`}</pre>
              </div>
            )}
          </div>
        );
      }

      return (
        <div>
          <h2>Gut Health Quiz</h2>
          <p>Question {currentQuestion + 1} of {questions.length}</p>
          <h3>{questions[currentQuestion].text}</h3>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }

    export default Quiz;
