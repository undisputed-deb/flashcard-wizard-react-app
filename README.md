# Web Development Project 3 - *Flashcard Learning App*

Submitted by: **Debashrestha Nandi**

This web app: **An interactive flashcard application that helps users study and learn through a guessing game format. Users can test their knowledge on various topics, track their learning progress with streak counters, and master cards by removing them from the study pool. The app features fuzzy matching for answers, shuffle functionality, and a comprehensive statistics system.**

Time spent: **28** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The user can enter their guess into an input box *before* seeing the flipside of the card**
  - Application features a clearly labeled input box with a submit button where users can type in a guess
  - Clicking on the submit button with an **incorrect** answer shows visual feedback that it is wrong 
  - Clicking on the submit button with a **correct** answer shows visual feedback that it is correct
- [x] **The user can navigate through an ordered list of cards**
  - A forward/next button displayed on the card navigates to the next card in a set sequence when clicked
  - A previous/back button displayed on the card returns to the previous card in the set sequence when clicked
  - Both the next and back buttons should have some visual indication that the user is at the beginning or end of the list (for example, graying out and no longer being available to click), not allowing for wrap-around navigation

The following **optional** features are implemented:

- [x] Users can use a shuffle button to randomize the order of the cards
  - Cards should remain in the same sequence (**NOT** randomized) unless the shuffle button is clicked 
  - Cards should change to a random sequence once the shuffle button is clicked
- [x] A user's answer may be counted as correct even when it is slightly different from the target answer
  - Answers are considered correct even if they only partially match the answer on the card 
  - Examples: ignoring uppercase/lowercase discrepancies, ignoring punctuation discrepancies, matching only for a particular part of the answer rather than the whole answer
- [x] A counter displays the user's current and longest streak of correct responses
  - The current counter increments when a user guesses an answer correctly
  - The current counter resets to 0 when a user guesses an answer incorrectly
  - A separate counter tracks the longest streak, updating if the value of the current streak counter exceeds the value of the longest streak counter 
- [x] A user can mark a card that they have mastered and have it removed from the pool of displayed cards
  - The user can mark a card to indicate that it has been mastered
  - Mastered cards are removed from the pool of displayed cards and added to a list of mastered cards

The following **additional** features are implemented:

* [x] **Card flip animation** - Smooth 3D flip transition when revealing answers
* [x] **Comprehensive statistics tracking** - Displays current streak, longest streak, and mastered cards count
* [x] **Reset functionality** - Users can reset all progress and restore mastered cards
* [x] **Responsive design** - Works seamlessly on desktop and mobile devices
* [x] **Visual feedback system** - Color-coded input fields and messages for correct/incorrect answers
* [x] **Show answer option** - Users can reveal the answer without guessing
* [x] **Progress completion detection** - Displays completion message when all cards are mastered
* [x] **17 diverse flashcards** - Covering topics from geography to science to literature

Video Walkthrough 
https://files.fm/u/w385wqtvza



## Notes

Describe any challenges encountered while building the app.

**Key Challenges Faced:**

- **State Management Complexity**: Managing multiple interconnected state variables (current card, streaks, mastered cards, shuffle order) required careful planning to avoid conflicts and ensure consistent user experience.

- **Fuzzy Matching Algorithm**: Implementing intelligent answer matching that handles case sensitivity, punctuation, and partial matches while avoiding false positives was challenging and required extensive testing.

- **CSS Animation Timing**: Creating smooth card flip animations that work across different browsers and devices required fine-tuning of CSS transforms and transitions.

- **Responsive Design**: Ensuring the app works well on both desktop and mobile devices, especially with the complex card flip animations and button layouts.

- **Edge Case Handling**: Managing scenarios like reaching the end of cards, handling empty states, and preventing duplicate shuffles required thorough testing and debugging.

## License

    Copyright [2024] [Debashrestha Nandi]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
