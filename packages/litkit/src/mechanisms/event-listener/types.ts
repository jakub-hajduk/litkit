export type KeyboardEventCode =
  | 'Backquote'
  | 'Backslash'
  | 'Backspace'
  | 'BracketLeft'
  | 'BracketRight'
  | 'Comma'
  | 'Digit0'
  | 'Digit1'
  | 'Digit2'
  | 'Digit3'
  | 'Digit4'
  | 'Digit5'
  | 'Digit6'
  | 'Digit7'
  | 'Digit8'
  | 'Digit9'
  | 'Equal'
  | 'IntlBackslash'
  | 'IntlRo'
  | 'IntlYen'
  | 'KeyA'
  | 'KeyB'
  | 'KeyC'
  | 'KeyD'
  | 'KeyE'
  | 'KeyF'
  | 'KeyG'
  | 'KeyH'
  | 'KeyI'
  | 'KeyJ'
  | 'KeyK'
  | 'KeyL'
  | 'KeyM'
  | 'KeyN'
  | 'KeyO'
  | 'KeyP'
  | 'KeyQ'
  | 'KeyR'
  | 'KeyS'
  | 'KeyT'
  | 'KeyU'
  | 'KeyV'
  | 'KeyW'
  | 'KeyX'
  | 'KeyY'
  | 'KeyZ'
  | 'Minus'
  | 'Period'
  | 'Quote'
  | 'Semicolon'
  | 'Slash'
  | 'AltLeft'
  | 'AltRight'
  | 'CapsLock'
  | 'ContextMenu'
  | 'ControlLeft'
  | 'ControlRight'
  | 'Enter'
  | 'MetaLeft'
  | 'MetaRight'
  | 'ShiftLeft'
  | 'ShiftRight'
  | 'Space'
  | 'Tab'
  | 'Convert'
  | 'KanaMode'
  | 'Lang1'
  | 'Lang2'
  | 'Lang3'
  | 'Lang4'
  | 'Lang5'
  | 'NonConvert'
  | 'Delete'
  | 'End'
  | 'Help'
  | 'Home'
  | 'Insert'
  | 'PageDown'
  | 'PageUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'NumLock'
  | 'Numpad0'
  | 'Numpad1'
  | 'Numpad2'
  | 'Numpad3'
  | 'Numpad4'
  | 'Numpad5'
  | 'Numpad6'
  | 'Numpad7'
  | 'Numpad8'
  | 'Numpad9'
  | 'NumpadAdd'
  | 'NumpadBackspace'
  | 'NumpadClear'
  | 'NumpadClearEntry'
  | 'NumpadComma'
  | 'NumpadDecimal'
  | 'NumpadDivide'
  | 'NumpadEnter'
  | 'NumpadEqual'
  | 'NumpadHash'
  | 'NumpadMemoryAdd'
  | 'NumpadMemoryClear'
  | 'NumpadMemoryRecall'
  | 'NumpadMemoryStore'
  | 'NumpadMemorySubtract'
  | 'NumpadMultiply'
  | 'NumpadParenLeft'
  | 'NumpadParenRight'
  | 'NumpadStar'
  | 'NumpadSubtract'
  | 'Escape'
  | 'Fn'
  | 'FnLock'
  | 'PrintScreen'
  | 'ScrollLock'
  | 'Pause'
  | 'BrowserBack'
  | 'BrowserFavorites'
  | 'BrowserForward'
  | 'BrowserHome'
  | 'BrowserRefresh'
  | 'BrowserSearch'
  | 'BrowserStop'
  | 'Eject'
  | 'LaunchApp1'
  | 'LaunchApp2'
  | 'LaunchMail'
  | 'MediaPlayPause'
  | 'MediaSelect'
  | 'MediaStop'
  | 'MediaTrackNext'
  | 'MediaTrackPrevious'
  | 'Power'
  | 'Sleep'
  | 'AudioVolumeDown'
  | 'AudioVolumeMute'
  | 'AudioVolumeUp'
  | 'WakeUp'
  | 'ZoomToggle'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | 'F13'
  | 'F14'
  | 'F15'
  | 'F16'
  | 'F17'
  | 'F18'
  | 'F19'
  | 'F20'
  | 'F21'
  | 'F22'
  | 'F23'
  | 'F24'
  | (string & {});

export type EventName = keyof HTMLElementEventMap | (string & {});

export interface ListenOptions extends AddEventListenerOptions {
  /**
   * The HTML element to which the event listener will be attached.
   * If not provided, a default element (e.g., `document`) might be used depending on the context.
   */
  element?: HTMLElement;
  /**
   * An optional identifier for the event listener, useful for debugging.
   */
  eventId?: string;
}

export interface DetachableEventReturn {
  /**
   * An optional identifier for the event for easier debugging.
   * It is provided by {@link ListenOptions.eventId}.
   */
  id: string | undefined;
  /**
   * The details of the event listener.
   */
  details: {
    /**
     * The name of the event (e.g., 'click', 'keydown', 'mouseup').
     */
    name: string;
    /**
     * The event handler function or object.
     */
    handler: EventListenerOrEventListenerObject;
    /**
     * Generic event options, including `capture`, `once`, `passive`, and the `element` to attach to.
     */
    options: ListenOptions;
  };
  /**
   * A function that attaches the event listener to its specified element.
   */
  attach: () => void;
  /**
   * A function that removes the event listener from its specified element.
   */
  detach: () => void;
}
