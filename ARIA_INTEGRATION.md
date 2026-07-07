# ARIA Integration (Added to main)

All ARIA components have been added directly to main:
- src/components/ARIA/ReadinessWidget.tsx
- src/components/ARIA/QuizRenderer.tsx
- src/components/ARIA/ARIAAgent.tsx (full chat)
- src/components/ARIA/ARIAModal.tsx

Usage:
import { ReadinessWidget, ARIAModal } from './src/components/ARIA';

<ReadinessWidget progress={progress} onStartQuiz={() => setShow(true)} />
<ARIAModal isOpen={show} onClose={() => setShow(false)} user={user} />

Backend: Deploy https://github.com/apavlik02-blip/passpro-aria then update apiUrl in ARIAAgent.