// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/PyV6NUzwi/";

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
const dogBar = document.getElementById('dog-bar');
const catBar = document.getElementById('cat-bar');
const dogPercent = document.getElementById('dog-percent');
const catPercent = document.getElementById('cat-percent');

/**
 * Initialize the Teachable Machine model
 */
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  try {
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    
    // Hide loading overlay
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
imageUpload.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      faceImage.src = event.target.result;
      
      // UI Transitions
      uploadZone.classList.add('hidden');
      previewContainer.classList.remove('hidden');
      actionArea.classList.remove('hidden');
      resultContainer.classList.add('hidden'); // Hide previous results
    };
    reader.readAsDataURL(file);
  }
});

/**
 * Reset and re-upload
 */
reUploadBtn.addEventListener('click', () => {
  imageUpload.value = '';
  uploadZone.classList.remove('hidden');
  previewContainer.classList.add('hidden');
  actionArea.classList.add('hidden');
  resultContainer.classList.add('hidden');
});

/**
 * Run prediction
 */
predictBtn.addEventListener('click', async () => {
  if (!model) return;

  predictBtn.disabled = true;
  predictBtn.textContent = '분석 중...';

  // Run prediction
  const prediction = await model.predict(faceImage);
  
  // Debug: Log predictions to console
  console.log("Predictions:", prediction);
  
  // Sort predictions by probability
  prediction.sort((a, b) => b.probability - a.probability);
  
  displayResults(prediction);
  
  predictBtn.disabled = false;
  predictBtn.textContent = '결과 확인하기';
});

/**
 * Display the results in the UI
 */
function displayResults(prediction) {
  resultContainer.classList.remove('hidden');
  
  const topResult = prediction[0];
  const dogProb = (prediction.find(p => p.className.toLowerCase() === "dog")?.probability || 0) * 100;
  const catProb = (prediction.find(p => p.className.toLowerCase() === "cat")?.probability || 0) * 100;

  // Update bars and percentages
  dogBar.style.width = `${dogProb}%`;
  catBar.style.width = `${catProb}%`;
  dogPercent.textContent = `${Math.round(dogProb)}%`;
  catPercent.textContent = `${Math.round(catProb)}%`;

  // Set result text based on top result class name
  if (topResult.className.toLowerCase() === "dog") {
    resultTitle.textContent = "🐶 당신은 귀여운 강아지상!";
    resultMessage.textContent = "다정다감하고 활발한 에너지를 가진 당신! 주변 사람들에게 긍정적인 기운을 전달하는 매력적인 강아지상을 닮았네요.";
  } else if (topResult.className.toLowerCase() === "cat") {
    resultTitle.textContent = "🐱 당신은 시크한 고양이상!";
    resultMessage.textContent = "도도하면서도 신비로운 분위기를 가진 당신! 차분하고 독립적인 매력이 돋보이는 고양이상을 닮았네요.";
  } else {
    resultTitle.textContent = "🤔 분석 결과를 알 수 없습니다.";
    resultMessage.textContent = "인공지능이 판단하기 어려운 신비로운 매력을 가지고 계시네요!";
  }

  // Scroll to result
  resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// Start the app
init();
