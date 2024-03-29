
let input = document.querySelector('.search-input');
let form = document.querySelector('.search');
const keyboardShow = document.getElementById('search-tia-id');


const keyLayout_russian = [
    "ё","!1", "\"2", "№3", ";4", "%5", "^6", "&7", "*8", "(9", ")0", "_-", "+=", "Backspace",
    "Tab","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "/\\", "Del",
    "Caps Lock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter",
    "Shift", "\\", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "/", "↑", "Shift",
    "ChangeLang", "Win", "Alt", "Space", "Alt", "Ctrl", "←", "↓", "→"
];


const keyLayout_english = [
    "~`","!1", "@2", "#3", "$4", "%5", ":6", "?7", "*8", "(9", ")0", "_-", "+=", "Backspace",
    "Tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "/\\", "Del",
    "Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
    "Shift", "\\", "z", "x", "c", "v", "b", "n", "m", ".", ",", "/", "↑", "Shift",
    "ChangeLang", "Win", "Alt", "Space", "Alt", "Ctrl", "←", "↓", "→"
];




const keyCode = [
    "Backquote","Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace",
    "Tab","KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete",
    "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter",
    "ShiftLeft", "Backslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Period", "Comma", "Slash", "ArrowUp", "ShiftRight",
    "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"
];


const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    properties: {
        capsLock: false
    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        this.elements.main.classList.add("keyboard-area", "visuallyhidden", "hidden");
        this.elements.main.setAttribute('id', 'keyboard-area-id');
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);
        form.appendChild(this.elements.main);
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        let keyLayout;
        const CurrentKeyboardType = localStorage.getItem('keyboard_type');
        if (CurrentKeyboardType === null || CurrentKeyboardType === "english") {
            keyLayout = keyLayout_english;
        } else {
            keyLayout = keyLayout_russian;
        }

        keyLayout.forEach((key, index) => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["Backspace", "Del", "Enter", "Shift"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "~`":
                    keyElement.innerHTML = `<sup>${key[0]}</sup> <sub>${key[1]}</sub>`;
                    keyElement.addEventListener("click", () => {
                        input.value += this.properties.capsLock ? key[0] : key[1];
                    });

                    break;
                    
                case "←`":           
                    KeyElement.textContent = key;         
                    keyElement.addEventListener("click", () => {
                       return getCaretPosition() - 1;
                    });

                    break;
                case "→`":
                    KeyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        return getCaretPosition() + 1;
                        
                    });

                    break;

                case "_-":
                    keyElement.innerHTML = `<sup>${key[0]}</sup> <sub>${key[1]}</sub>`;
                    keyElement.addEventListener("click", () => {
                        input.value += this.properties.capsLock ? key[0] : key[1];
                    });

                    break;

                case "Del":
                case "Win":
                case "Alt":
                    keyElement.textContent = key;

                    break;
                case "ChangeLang":
                    
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        CallChangeLanguage();
                    });

                    break;

                case "Tab":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        input.value += "    ";
                    });

                    break;

                case "Backspace":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        input.value = input.value.substring(0, input.value.length - 1);
                    });

                    break;

                case "Shift":
                case "Caps Lock":
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                    });

                    break;

                case "Enter":
                    keyElement.textContent = key;
                    keyElement.classList.add("enter");
                    keyElement.style.outline = 'none';
                    keyElement.setAttribute('type', 'submit');
                    keyElement.addEventListener("click", () => {
                        input.value += "\n";
                    });

                    break;

                case "Space":
                    keyElement.classList.add("wide");
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        input.value += " ";
                    });

                    break;
                
                

                default:
                    let isDoubleValue = (index >=1 && index<14)&& index !== 11 || index === 27;

                    if (isDoubleValue){
                       

                        keyElement.innerHTML = `<sup>${key[0]}</sup> ${key[1]}`;
                        keyElement.addEventListener("click", () => {
                            input.value += this.properties.capsLock ? key[0] : key[1];
                        });

                    }else {
                        

                        keyElement.textContent = key;
                        keyElement.addEventListener("click", () => {
                            input.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        });
                    }

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak && index !== 42) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            const FixedText = ["Backspace", "Tab", "Del", "Caps Lock", "Enter", "Shift", "ChangeLang", "Win", "Alt", "Space"];
            const isTransforming = FixedText.indexOf(key.textContent) === -1;
            if (key.childElementCount === 0 && isTransforming) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    keyPress(index) {
        this.elements.keys[index].classList.add('physical-key-press');
    },

    keyRelease(index) {
        this.elements.keys[index].classList.remove('physical-key-press');
    },

    changeLanguage() {
        
        while (this.elements.keysContainer.firstChild) {
            this.elements.keysContainer.removeChild(this.elements.keysContainer.firstChild);
        }
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    }

};


window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init(); 
    let virtualKeyboard = document.querySelector('.keyboard-area');

    keyboardShow.addEventListener('click', function () {
  
  if (virtualKeyboard.classList.contains('hidden')) {
    virtualKeyboard.classList.remove('hidden');
    setTimeout(function () {
      virtualKeyboard.classList.remove('visuallyhidden');
    }, 20);
  } else {
    virtualKeyboard.classList.add('visuallyhidden');    
    virtualKeyboard.addEventListener('transitionend', function(e) {
      virtualKeyboard.classList.add('hidden');
    }, {
      capture: false,
      once: true,
      passive: false
    });
  }
  
}, false);
});


let pressed = [];
document.addEventListener('keydown', (e) => {
    const IndexOfPressedKey = keyCode.indexOf(e.code);
    Keyboard.keyPress(IndexOfPressedKey);
    pressed.push(e.code);

});

document.addEventListener('keyup', (e) => {
    const IndexOfPressedKey = keyCode.indexOf(e.code);
    Keyboard.keyRelease(IndexOfPressedKey);
    if (pressed.indexOf("ControlLeft")>=0){
        CallChangeLanguage();
    }
    pressed = [];
});

function CallChangeLanguage() {
    const KeyboardType = localStorage.getItem('keyboard_type');
    if (KeyboardType === null || KeyboardType === "english") {
        localStorage.setItem('keyboard_type','russian');
    } else {
        localStorage.setItem('keyboard_type','english');
    }

    Keyboard.changeLanguage();
};

window.addEventListener('blur', function() {
    pressed.forEach(function(element) {
        const IndexOfPressedKey = keyCode.indexOf(element);
        Keyboard.keyRelease(IndexOfPressedKey);
    });
    pressed = [];
});
var cursorPos = null;
function getCaretPosition(obj){
    
    if (document.selection){
        var range = document.selection.createRange();
        range.moveStart('textedit', -1);
        cursorPos = range.text.length;
    }
    else 
    {
        cursorPos = obj.selectionStart;
    }
}