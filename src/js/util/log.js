export default function log(...msg) {
  console.log(`[${new Date().toLocaleTimeString()}]`, ...msg);
}