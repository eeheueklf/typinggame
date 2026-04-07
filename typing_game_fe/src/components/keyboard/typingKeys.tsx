import { Keys } from '@/types/key-item';

const typingKeys: Keys = [
  [
    { code: "Escape", label: "Esc", color: 'red' },
    { code: "KeyQ", label: "ㅂ" },
    { code: "KeyW", label: "ㅈ" },
    { code: "KeyE", label: "ㅈ" },
    { code: "KeyR", label: "ㄷ" },
    { code: "KeyU", label: "ㅕ" },
    { code: "KeyI", label: "ㅑ" },
    { code: "KeyO", label: "ㅐ" },
    { code: "KeyP", label: "ㅔ" },
    { code: "Home", label: "Home", widthLevel: 2, href: '/' },
  ],
  [
    { code: "CapsLock", label: "글 목록", widthLevel: 2 },
    { code: "KeyA", label: "ㅁ" },
    { code: "KeyS", label: "ㄴ" },
    { code: "KeyD", label: "ㅇ" },
    { code: "KeyF", label: "ㄹ" },
    { code: "KeyJ", label: "ㅓ" },
    { code: "KeyK", label: "ㅏ" },
    { code: "KeyL", label: "ㅣ" },
    { code: "Backspace", label: "Backspace⌫", widthLevel: 0 },
  ],
  [
    { code: "ShiftLeft", label: "⇧ Shift", widthLevel: 3 },
    { code: "KeyZ", label: "ㅋ" },
    { code: "KeyX", label: "ㅌ" },
    { code: "KeyC", label: "ㅊ" },
    { code: "KeyV", label: "ㅍ" },
    { code: "Period", label: "." },
    { code: "Slash", label: "?" },
    { code: "Enter", label: "⏎ Enter", color: 'red', widthLevel: 0 },
  ],
  [
    { code: "ControlLeft", label: "Ctrl", widthLevel: 1 },
    { code: "MetaLeft", label: "🪟" },
    { code: "AltLeft", label: "Alt" },
    { code: "Space", label: "", widthLevel: 0 },
    { code: "Lang1", label: "한/영", widthLevel: 1 },
    { code: "ArrowLeft", label: "<" },
    { code: "ArrowRight", label: ">" },
  ],
];

export default typingKeys;
