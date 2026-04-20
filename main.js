
document.addEventListener('DOMContentLoaded', () => {
  // Corrected Teachable Machine Model URL
  const URL = "https://teachablemachine.withgoogle.com/models/6JiGcs49z/";

  let model, maxPredictions;

  // DOM Elements
  const modelLoading = document.getElementById('model-loading');
  const uploadZone = document.getElementById('upload-zone');
  const imageUpload = document.getElementById('image-upload');
  const previewContainer = document.getElementById('image-preview-container');
  const faceImage = document.getElementById('face-image');
  const reUploadBtn = document.getElementById('re-upload-btn');
  const actionArea = document.getElementById('action-area');
  const predictBtn = document.getElementById('predict-btn');
  const resultContainer = document.getElementById('result-container');
  const resultTitle = document.getElementById('result-title');
  const resultMessage = document.getElementById('result-message');
  const resultBarsContainer = document.querySelector('.result-bars');

  // Animal-specific details (icons and colors) - CORRECTED LIST
  const animalDetails = {
    '강아지상': { icon: '🐶', color: 'dog-color' },
    '고양이상': { icon: '🐱', color: 'cat-color' },
    '토끼상': { icon: '🐰', color: 'rabbit-color' },
    '사슴상': { icon: '🦌', color: 'deer-color' },
    '원숭이상': { icon: '🐒', color: 'monkey-color' },
    '다람쥐상': { icon: '🐿️', color: 'squirrel-color' }
  };

  /**
   * Initialize the Teachable Machine model
   */
  async function init() {
    if (!modelLoading) {
      console.error("Critical Error: 'model-loading' element not found.");
      return; 
    }
    
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();
      
      modelLoading.classList.add('hidden');
      console.log("Model loaded successfully");
    } catch (error) {
      console.error("Error loading model:", error);
      modelLoading.innerHTML = `<p style="color: var(--error)">모델을 불러오는 중 오류가 발생했습니다.</p>`;
    }
  }

  /**
   * Handle image selection and preview
   */
  if(imageUpload) {
    imageUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          faceImage.src = event.target.result;
          
          uploadZone.classList.add('hidden');
          previewContainer.classList.remove('hidden');
          actionArea.classList.remove('hidden');
          resultContainer.classList.add('hidden');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  /**
   * Reset and re-upload
   */
  if(reUploadBtn) {
    reUploadBtn.addEventListener('click', () => {
      imageUpload.value = '';
      uploadZone.classList.remove('hidden');
      previewContainer.classList.add('hidden');
      actionArea.classList.add('hidden');
      resultContainer.classList.add('hidden');
    });
  }

  /**
   * Run prediction
   */
  if(predictBtn) {
    predictBtn.addEventListener('click', async () => {
      if (!model) return;

      predictBtn.disabled = true;
      predictBtn.textContent = '분석 중...';
      
      try {
        if (!faceImage.complete) {
          await new Promise(resolve => faceImage.onload = resolve);
        }
        
        await new Promise(resolve => setTimeout(resolve, 800));

        const prediction = await model.predict(faceImage);
        const sortedPrediction = [...prediction].sort((a, b) => b.probability - a.probability);
        
        displayResults(sortedPrediction);
      } catch (error) {
        console.error("Prediction Error:", error);
        alert("이미지 분석 중 오류가 발생했습니다. 다시 시도해 주세요.");
      } finally {
        predictBtn.disabled = false;
        predictBtn.textContent = '결과 확인하기';
      }
    });
  }

  /**
   * Display the results in the UI
   */
  function displayResults(predictions) {
    resultContainer.classList.remove('hidden');
    resultBarsContainer.innerHTML = ''; // Clear previous results

    // Create a bar for each prediction
    predictions.forEach(p => {
        const className = p.className;
        const probability = (p.probability * 100).toFixed(1);
        const detail = animalDetails[className] || { icon: '❓', color: '' };

        const labelContainer = document.createElement('div');
        labelContainer.className = 'label-container';
        const barFillClass = detail.color;

        labelContainer.innerHTML = `
            <span class="animal-label">${detail.icon} ${className}</span>
            <div class="bar-bg">
                <div class="bar-fill ${barFillClass}" style="width: ${probability}%"></div>
            </div>
            <span class="percent-label">${probability}%</span>
        `;
        resultBarsContainer.appendChild(labelContainer);
    });

    // Set the main title and message based on the top result
    const topResult = predictions[0];
    const topClass = topResult.className;
    const topProb = (topResult.probability * 100).toFixed(0);
    const topDetail = animalDetails[topClass] || { icon: '🤔' };

    resultTitle.textContent = `${topDetail.icon} 당신은 ${topClass}에 가깝군요!`;
    resultMessage.textContent = `가장 높은 확률은 ${topProb}%의 ${topClass}입니다! 각 동물상에 대한 더 자세한 특징이 궁금하다면, '다양한 동물상 특징' 페이지를 확인해보세요.`;

    resultContainer.scrollIntoView({ behavior: 'smooth' });
  }

  // Drag and Drop functionality
  const setupDragDrop = () => {
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
        imageUpload.files = files;
        const event = new Event('change', { bubbles: true });
        imageUpload.dispatchEvent(event);
        }
    });
  };

  // Start the app
  init();
  setupDragDrop();
});
