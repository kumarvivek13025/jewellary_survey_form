document.addEventListener('DOMContentLoaded', () => {
  const nextButtons = document.querySelectorAll('.next-button');
  const progress = document.getElementById('progress');
  const questions = document.querySelectorAll('.question');
  const thankYouMessage = document.getElementById('thank-you-message');
  const modal = document.getElementById('modal');
  const modalOkButton = document.getElementById('modal-ok-button');

  let currentQuestionIndex = 0;
  const totalQuestions = questions.length;

  updateProgressBar();

  nextButtons.forEach(nextButton => {
    nextButton.addEventListener('click', () => {
      if (validateCurrentQuestion()) {
        const currentQuestion = questions[currentQuestionIndex];
        currentQuestionIndex++;
        const nextQuestion = questions[currentQuestionIndex];

        currentQuestion.classList.add('hidden');
        nextQuestion.classList.remove('hidden');

        updateProgressBar();
      } else {
        showModal(); 
      }
    });
  });

  modalOkButton.addEventListener('click', () => {
    hideModal(); // Hide the modal dialog
  });

  function validateCurrentQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const requiredInputs = currentQuestion.querySelectorAll('input[type="radio"]:required, input[type="checkbox"]:required, select[required]');
    for (const input of requiredInputs) {
      if (input.type === 'radio' || input.type === 'checkbox') {
        if (input.checked) {
          return true; 
        }
      } else if (input.tagName === 'SELECT') {
        if (input.value) {
          return true; // Select input has a value
        }
      }
    }
    return requiredInputs.length === 0; 
  }

  function updateProgressBar() {
    const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
    progress.style.width = `${progressPercentage}%`;
    progress.style.backgroundColor = 'blue'; 
  }

  function showModal() {
    modal.classList.remove('hidden');
    modal.style.display = 'flex'; 
  }

  function hideModal() {
    modal.classList.add('hidden');
    modal.style.display = 'none'; 
  }

  const form = document.getElementById('user-input-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const formContainer = document.querySelector('.form-container');

    if (title && description && formContainer && thankYouMessage) {
      title.style.display = 'none';
      description.style.display = 'none';
      formContainer.style.display = 'none';
      thankYouMessage.classList.remove('hidden');
      progress.style.width = '100%'; 
    } else {
      console.error('One or more elements not found.'); 
    }
  });

  const outfitUpload = document.getElementById('outfit-upload');
  const preview = document.getElementById('preview');

  outfitUpload.addEventListener('change', () => {
    const file = outfitUpload.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.innerHTML = `<img src="${e.target.result}" alt="Outfit preview" style="max-width: 100%; height: auto;">`;
      };
      reader.readAsDataURL(file);
    }
  });
});
