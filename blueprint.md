# **Project Blueprint: Animal Face Test (Dog vs Cat)**

## **Overview**
A visually appealing and interactive "Animal Face Test" website that classifies a user's face as either a "Dog" or a "Cat" using a Teachable Machine model. The site leverages modern web standards (Baseline), responsiveness, and polished UI/UX for a delightful user experience.

## **Project Documentation**
*   **Purpose:** Allow users to upload a photo and get a fun prediction about their "animal face" type.
*   **Technologies:**
    *   **HTML5 & CSS3 (Baseline):** Semantic structure and modern styling with `oklch`, container queries, and layered shadows.
    *   **JavaScript (ES Modules):** Asynchronous model loading and image processing.
    *   **TensorFlow.js & Teachable Machine Image SDK:** For in-browser machine learning inference.
    *   **Model URL:** `https://teachablemachine.withgoogle.com/models/PyV6NUzwi/`
*   **Design Language:** Centered interaction card, glassmorphism-inspired elements, smooth transitions, and vibrant colors.

## **Current Plan: Animal Face Test Implementation**
### **1. Structure (HTML)**
*   Include TensorFlow.js and the Teachable Machine Image library from CDN.
*   Create a header section with a title and a brief description.
*   Implement an upload/capture section with an image drop zone.
*   Include a results section to display the prediction and probability bars.
*   Retain the Disqus comment section for user community interaction.

### **2. Styling (CSS)**
*   Use `oklch` for a modern, vibrant color palette.
*   Apply a subtle noise texture to the background and deep multi-layered shadows to the main card.
*   Design a responsive and interactive image drop zone with hover and focus effects.
*   Create animated result bars to visualize probabilities.

### **3. Interactivity (JavaScript)**
*   Load the Teachable Machine model asynchronously from the provided URL.
*   Handle file selection and drop events, displaying a preview of the selected image.
*   Implement the prediction logic and update the UI with the top result.
*   Add loading states and error handling for model initialization.

### **4. Verification**
*   Test with various dog and cat images to ensure accuracy.
*   Verify responsiveness across multiple viewports.
*   Audit for accessibility (ARIA labels, keyboard navigation).
