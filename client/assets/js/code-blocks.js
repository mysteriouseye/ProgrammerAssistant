document.addEventListener('DOMContentLoaded', () => {
  const highlight = require('highlight.js')
  const codeBlocks = document.querySelectorAll('pre code')
  Array.prototype.forEach.call(codeBlocks, (code) => {
    highlight.highlightBlock(code)
  });
});
