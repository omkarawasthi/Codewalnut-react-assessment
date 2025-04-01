# Timer App Assignment

Welcome to the Timer App Assignment! This project is designed to evaluate your skills in React development, focusing on **UI implementation**, **code quality**, **state management**, and **best practices**. The project uses **React**, **Vite**, **Tailwind CSS**, and **Vitest** for testing.

---

## **Objective**
Your task is to improve and enhance an existing Timer App based on the following requirements. The app currently has a partially implemented timer system, and your goal is to address the listed issues and extend its functionality.

---

## **Tech Stack**
- **Frontend Framework**: React (with Vite for fast development)
- **Styling**: Tailwind CSS
- **Testing Framework**: Vitest (for unit and component testing)

---

## **Steps to Complete**

1. **Fork or Clone the Repository**
   - Fork or clone the repository to your local machine.
   - Set up the project using the provided instructions.

2. **Complete the Following Tasks:**

   1. **Match the UI:**
      - Ensure the app's UI matches the given **screenshots**.
        
        ![Screenshot 2025-04-01 151244](https://github.com/user-attachments/assets/a25ef936-1a10-4e3f-8388-c2a725f7099f)

        ![Screenshot 2025-04-01 171251](https://github.com/user-attachments/assets/f86097b3-6b22-44f0-86cd-dddbb009dbba)

        ![Screenshot 2025-04-01 153135](https://github.com/user-attachments/assets/986a3015-2c05-41ea-bdf3-b8156d16a53e)

        ![Screenshot 2025-04-01 165102](https://github.com/user-attachments/assets/cf9c368f-8012-4625-bd6d-eade21b1f9b5)


   3. **Simultaneous Timers:**
      - Update the app to allow multiple timers to run simultaneously (currently, only one timer runs at a time).

   4. **Snack Bar Behavior:**
      - When a timer is completed:
        - A snack bar notification should display.
        - The notification sound should keep playing until the snack bar is dismissed.

   5. **Fix Snack Bar Console Error:**
      - Resolve the **console error** that occurs when the snack bar's **dismiss button** is clicked.

   6. **Extract Common Components:**
      - Extract the buttons in the **Add/Edit Timer Modal** as a **separate reusable component**.
      - Replace all instances of similar buttons in the app with this component.

   7. **Consolidate Modal Code:**
      - Refactor the code to use a **single modal component** for both adding and editing timers, eliminating duplication.

   8. **Validation Snack Bars:**
      - Currently, the **Submit button** is disabled when the form is invalid.
      - Show an **error snack bar** or notification when the form is submitted with invalid data.

   9. **Responsive Snack Bar Placement:**
      - For **desktop devices**: Display snack bars in the **top-right corner**.
      - For **mobile devices**: Display snack bars at the **bottom of the screen**.

   10. **Write Tests:**
      - Add **unit tests** for the `validation.ts` file to ensure all validation rules work as expected.
      - Write **component tests** for reusable components like `TimerItem` and `ModalButtons`.

   11. **Timer Persistence:**
       - Use **localStorage** to persist timers across page refreshes.

    12. **Use Google Font:**
       - Apply the **"Tinos"** font from [Google Fonts](https://fonts.google.com/specimen/Tinos) across the entire app for consistent typography.

   13. **Add Favicon Icon:**
       - Add a favicon to the app.
       - The icon is already present in the `public/icons` folder.
       - Ensure it displays correctly in browser tabs.

    14. **Add Stopwatch Feature with Responsive Navigation:**
       - Implement a new **Stopwatch** feature accessible via a **tabbed navigation**:
         - Tab 1: **Timers** – Displays the current timer interface.
         - Tab 2: **Stopwatch** – Includes:
           - **Start**, **Stop**, **Lap**, and **Restart** functionality.
           - A list of **lap times** displayed below the stopwatch.
       - On **mobile devices**, display the tab navigation as a **bottom navigation bar**.
       - On **desktop devices**, position the navigation bar as a **sidebar on the left**, matching the design shown in the attached screenshots.

      ![Screenshot 2025-04-01 133323](https://github.com/user-attachments/assets/fe09a047-b319-4517-9d2d-9550f7d95b9b)
      ![Screenshot 2025-04-01 133402](https://github.com/user-attachments/assets/506d658c-60ff-410f-96e7-075e17cec1f0)
      ![Screenshot 2025-04-01 133345](https://github.com/user-attachments/assets/574d49e1-2c4b-42f0-a62b-9ccfb1c543f7)
      ![Screenshot 2025-04-01 134943](https://github.com/user-attachments/assets/b1f9b465-0d36-42d2-be67-3da73160bb43)



---

## **Project Setup**

1. Clone the repository:  
   ```bash
   git clone https://github.com/CW-Codewalnut/timer.git
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Start the development server:  
   ```bash
   npm run dev
   ```

4. Run tests:  
   ```bash
   npm vitest
   ```

---

## **Evaluation Criteria**

You will be evaluated on the following points:

1. **UI Matching:**
   - The app's UI should match the provided screenshots.

2. **Code Quality:**
   - Clean, modular, and readable code.
   - Avoid code duplication and ensure reusable components are implemented.

3. **Functionality:**
   - Simultaneous timers, snack bar notifications, and localStorage persistence should work seamlessly.

4. **State Management:**
   - Effective use of React hooks or Context API for managing state.

5. **Testing:**
   - Comprehensive unit and component tests, especially for validation logic and reusable components.

6. **Error Handling:**
   - Resolve the existing snack bar console error and provide meaningful feedback to users for invalid forms.

7. **Responsiveness:**
   - Snack bar placement should adapt based on device type (desktop vs. mobile).

8. **Commit Messages:**
   - Follow **conventional commit standards** (e.g., `feat:`, `fix:`, `refactor:`).
   - Practice committing after each change rather than committing everything at once.

---

## **Deliverables**

1. A **GitHub repository link** to your completed project (forked from the original repo).  
2. Include a `README.md` describing:  
   - Steps to run your project.  
   - Any additional changes or enhancements you made.  

---

## **Time Constraint**

You are expected to complete this assignment in **4 hours** of focused effort.  

---

## **Contact**

If you have any questions or issues, feel free to reach out via the provided contact channels in the repository.

Good luck! 🚀
