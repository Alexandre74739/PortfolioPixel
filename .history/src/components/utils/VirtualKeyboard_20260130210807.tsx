import { motion } from "framer-motion";

interface KeyboardProps {
  keys: string[][];
  activeKey: string | null;
  onKeyPress: (key: string) => void;
}

const VirtualKeyboard = ({ keys, activeKey, onKeyPress }: KeyboardProps) => (
  <div className="virtual-keyboard">
    {keys.map((row, rowIndex) => (
      <div key={rowIndex} className="keyboard-row">
        {row.map(key => (
          <motion.button
            key={key}
            className={`key-button ${activeKey === key.toLowerCase() ? 'active' : ''} ${['del', 'enter'].includes(key) ? 'special' : ''}`}
            onClick={() => onKeyPress(key)}
            whileTap={{ scale: 0.95 }}
          >
            {key === 'del' ? '⌫' : key === 'enter' ? '↵' : key === 'arrowleft' ? '←' : key === 'arrowright' ? '→' : key.toUpperCase()}
          </motion.button>
        ))}
      </div>
    ))}
  </div>
);

export default VirtualKeyboard;