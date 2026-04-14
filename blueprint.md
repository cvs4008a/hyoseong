# **Project Blueprint: Partnership Inquiry Form**

## **Overview**
A professional, high-performance web page featuring a partnership inquiry form integrated with Formspree (`https://formspree.io/f/mqewanqn`). The design focuses on modern web standards (Baseline), responsiveness, and accessibility, providing an intuitive and visually polished user experience.

## **Project Documentation**
*   **Purpose:** Allow users to submit partnership inquiries directly to the project owner.
*   **Technologies:**
    *   **HTML5:** Semantic structure with appropriate form elements and ARIA attributes for accessibility.
    *   **CSS3 (Baseline):** Modern layouts using Flexbox/Grid, container queries, `oklch` for vibrant colors, and custom properties for theming.
    *   **JavaScript (ES Modules):** Asynchronous form submission using the `fetch` API to provide a seamless feedback loop without page reloads.
    *   **External Services:** [Formspree](https://formspree.io/) for backend form handling.
*   **Design Language:** Professional layout with clean typography, subtle background textures, and high-quality interactive elements (e.g., "glow" effects on buttons, soft deep shadows).

## **Current Plan: Partnership Inquiry Form Implementation**
### **1. Structure (HTML)**
*   Create a clean, semantic `<form>` element.
*   Include fields: `Full Name`, `Email Address`, `Organization`, `Subject`, and `Message`.
*   Ensure each input has a corresponding `<label>` and proper `id`.
*   Add a visual "Success" and "Error" message container (hidden by default).

### **2. Styling (CSS)**
*   Apply a "Professional Layout" theme.
*   Use `oklch` for perceptually uniform colors.
*   Implement container queries to ensure the form looks great regardless of parent size.
*   Add a subtle noise texture to the background and multi-layered shadows for depth.
*   Design custom focus states and interactive "glow" effects for the submit button.

### **3. Interactivity (JavaScript)**
*   Implement a submit event listener on the form.
*   Use `fetch` to POST data to the Formspree endpoint.
*   Handle the server response and display appropriate feedback messages to the user.
*   Clear the form on successful submission.

### **4. Verification**
*   Check for accessibility issues (WCAG compliance).
*   Verify responsiveness across multiple viewports.
*   Test form submission logic and error handling.
