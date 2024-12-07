window.onload = () => {
  addTitleToResponse();
  createSidebar();
  createScrollToTopButton();
};

let globalTitleCounter = 1;
let titleElements = [];

  // Add reference buttons to the response articles
function addTitleToResponse() {
  document.querySelectorAll('article[data-testid^="conversation-turn-"]').forEach((msg) => {
      const assistantDiv = msg.querySelector('div[data-message-author-role="assistant"]');
      if (assistantDiv && !msg.querySelector('div.response-title')) {
          const title = createTitleButton(globalTitleCounter);
          assistantDiv.prepend(title);
          titleElements.push({ id: globalTitleCounter, element: title });
          globalTitleCounter++;
          updateSidebar();
      }
  });
}

function createSidebar() {
  const sidebar = document.createElement('div');
  sidebar.id = 'sidebar';
  sidebar.style.cssText = `
    position: fixed;
    top: 50px;
    right: 20px;
    width: 150px;
    background: #f9f9f9;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
    z-index: 1000;
  `;
  document.body.appendChild(sidebar);
}

// 更新右侧 Sidebar 的按钮
function updateSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = ''; // 清空现有内容

  titleElements.forEach((titleObj) => {
    const btn = document.createElement('button');
    btn.textContent = `Go to Title ${titleObj.id}`;
    btn.style.cssText = `
      display: block;
      width: 100%;
      margin-bottom: 5px;
      padding: 5px;
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    `;
    btn.addEventListener('click', () => {
      document.getElementById(`title-${titleObj.id}`).scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    });
    sidebar.appendChild(btn);
  });
}

// Create the "Add to Reference" button with innerHTML
function createTitleButton(counter) {
  const title = document.createElement('div');
  title.className = 'response-title';
  title.id = `title-${counter}`;
  title.textContent = `Title ${counter}`;
  return title;
}
// MutationObserver setup
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' || mutation.type === 'subtree') {
        addTitleToResponse();  // Run function to check and attach buttons
      }
    }
  });
  
  observer.observe(document.body,{ childList: true, subtree: true });  