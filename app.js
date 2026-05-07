let nodes = [];
let connections = [];
let selectedNode = null;
let nodeIdCounter = 0;
let isDraggingFromToolbar = false;
let draggedType = null;
let isConnectingMode = false;
let firstNodeForConnection = null;

const canvas = document.getElementById('canvas');
const nodeText = document.getElementById('nodeText');
const emptyProperties = document.getElementById('empty-properties');
const propertiesContent = document.getElementById('properties-content');
const connectionsSvg = document.getElementById('connectionsSvg');
const connectBtn = document.getElementById('connectBtn');

// Initialize toolbar drag listeners
document.querySelectorAll('.tool-btn[data-type]').forEach(btn => {
    btn.addEventListener('dragstart', (e) => {
        isDraggingFromToolbar = true;
        draggedType = btn.dataset.type;
        e.dataTransfer.effectAllowed = 'copy';
    });
});

// Canvas drop listeners
canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
});

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    if (isDraggingFromToolbar) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createNode(draggedType, x, y);
        isDraggingFromToolbar = false;
    }
});

// Node creation
function createNode(type, x, y) {
    const id = nodeIdCounter++;
    const node = {
        id,
        type,
        x: Math.max(10, Math.min(x - 60, canvas.offsetWidth - 130)),
        y: Math.max(10, Math.min(y - 25, canvas.offsetHeight - 50)),
        text: type === 'start' ? 'Start' : type === 'end' ? 'End' : 'Node ' + id,
        color: type === 'start' ? '#90EE90' : type === 'end' ? '#FFB6C6' : '#ADD8E6'
    };
    nodes.push(node);
    renderNode(node);
}

// Render node to DOM
function renderNode(node) {
    let nodeEl = document.getElementById('node-' + node.id);
    
    if (!nodeEl) {
        nodeEl = document.createElement('div');
        nodeEl.id = 'node-' + node.id;
        nodeEl.className = 'node';
        if (node.type === 'diamond') nodeEl.classList.add('diamond');
        if (node.type === 'circle') nodeEl.classList.add('circle');
        if (node.type === 'roundrect') nodeEl.style.borderRadius = '20px';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'node-text';
        textSpan.textContent = node.text;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'node-input';
        input.value = node.text;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'node-close';
        closeBtn.textContent = '✕';
        closeBtn.onclick = (e) => { deleteNode(node.id); e.stopPropagation(); };
        
        nodeEl.appendChild(input);
        nodeEl.appendChild(textSpan);
        nodeEl.appendChild(closeBtn);
        
        canvas.appendChild(nodeEl);
        makeNodeDraggable(nodeEl, node.id);
        
        nodeEl.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isConnectingMode) {
                handleConnectionClick(node.id);
            } else {
                selectNode(node.id);
            }
        });

        nodeEl.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            editNode(node.id);
        });
    }

    nodeEl.style.left = node.x + 'px';
    nodeEl.style.top = node.y + 'px';
    nodeEl.style.background = node.color;
    nodeEl.querySelector('.node-text').textContent = node.text;
    nodeEl.querySelector('.node-input').value = node.text;
}

// Make node draggable
function makeNodeDraggable(el, id) {
    let offsetX = 0, offsetY = 0, isDown = false;

    el.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('node-input')) return;
        isDown = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDown) {
            const node = nodes.find(n => n.id === id);
            node.x = Math.max(0, e.clientX - canvas.getBoundingClientRect().left - offsetX);
            node.y = Math.max(0, e.clientY - canvas.getBoundingClientRect().top - offsetY);
            el.style.left = node.x + 'px';
            el.style.top = node.y + 'px';
            drawConnections();
        }
    });

    document.addEventListener('mouseup', () => {
        isDown = false;
    });
}

// Select node
function selectNode(id) {
    document.querySelectorAll('.node').forEach(el => el.classList.remove('selected'));
    selectedNode = id;
    document.getElementById('node-' + id).classList.add('selected');
    emptyProperties.style.display = 'none';
    propertiesContent.style.display = 'block';
    nodeText.value = nodes.find(n => n.id === id).text;

    const color = nodes.find(n => n.id === id).color;
    document.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.color === color);
    });
}

// Edit node
function editNode(id) {
    selectNode(id);
    const nodeEl = document.getElementById('node-' + id);
    nodeEl.classList.add('editing');
    const input = nodeEl.querySelector('.node-input');
    input.focus();
    input.select();

    input.addEventListener('blur', () => {
        nodeEl.classList.remove('editing');
        const node = nodes.find(n => n.id === id);
        node.text = input.value || 'Node';
        renderNode(node);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        }
    });
}

// Delete node
function deleteNode(id) {
    nodes = nodes.filter(n => n.id !== id);
    connections = connections.filter(c => c.from !== id && c.to !== id);
    document.getElementById('node-' + id).remove();
    if (selectedNode === id) {
        selectedNode = null;
        emptyProperties.style.display = 'block';
        propertiesContent.style.display = 'none';
    }
    drawConnections();
}

// Delete selected node
function deleteSelectedNode() {
    if (selectedNode !== null) {
        deleteNode(selectedNode);
    }
}

// Clear canvas
function clearCanvas() {
    if (confirm('Clear all nodes and connections? This cannot be undone.')) {
        nodes = [];
        connections = [];
        document.querySelectorAll('.node').forEach(el => el.remove());
        connectionsSvg.querySelectorAll('.connection-line').forEach(el => el.remove());
        selectedNode = null;
        emptyProperties.style.display = 'block';
        propertiesContent.style.display = 'none';
        isConnectingMode = false;
        connectBtn.classList.remove('active');
    }
}

// Toggle connection mode
function toggleConnectMode() {
    isConnectingMode = !isConnectingMode;
    firstNodeForConnection = null;
    connectBtn.classList.toggle('active');
    document.querySelectorAll('.node').forEach(el => el.classList.remove('connecting'));
    
    if (isConnectingMode) {
        connectBtn.textContent = '🔗 Cancel';
    } else {
        connectBtn.textContent = '🔗 Connect';
    }
}

// Handle connection click
function handleConnectionClick(nodeId) {
    if (firstNodeForConnection === null) {
        firstNodeForConnection = nodeId;
        document.getElementById('node-' + nodeId).classList.add('connecting');
        connectBtn.textContent = '➡️ Select second node';
    } else if (firstNodeForConnection === nodeId) {
        // Clicked same node, cancel
        firstNodeForConnection = null;
        document.getElementById('node-' + nodeId).classList.remove('connecting');
        connectBtn.textContent = '🔗 Connect';
    } else {
        // Create connection
        const connection = {
            from: firstNodeForConnection,
            to: nodeId
        };
        
        if (!connections.find(c => c.from === connection.from && c.to === connection.to)) {
            connections.push(connection);
        }
        
        document.getElementById('node-' + firstNodeForConnection).classList.remove('connecting');
        firstNodeForConnection = null;
        connectBtn.textContent = '🔗 Connect';
        drawConnections();
    }
}

// Draw connections
function drawConnections() {
    connectionsSvg.querySelectorAll('.connection-line').forEach(el => el.remove());
    
    connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        if (fromNode && toNode) {
            const fromX = fromNode.x + 60;
            const fromY = fromNode.y + 25;
            const toX = toNode.x + 60;
            const toY = toNode.y + 25;
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            line.setAttribute('class', 'connection-line');
            
            const dx = toX - fromX;
            const dy = toY - fromY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const ratio = distance ? 30 / distance : 0;
            
            const startX = fromX + dx * ratio;
            const startY = fromY + dy * ratio;
            const endX = toX - dx * ratio;
            const endY = toY - dy * ratio;
            
            const cp1X = fromX + (toX - fromX) / 3;
            const cp1Y = fromY;
            const cp2X = toX - (toX - fromX) / 3;
            const cp2Y = toY;
            
            line.setAttribute('d', `M ${startX} ${startY} C ${cp1X} ${cp1Y} ${cp2X} ${cp2Y} ${endX} ${endY}`);
            connectionsSvg.appendChild(line);
        }
    });
}

// Node text change listener
nodeText.addEventListener('input', () => {
    if (selectedNode !== null) {
        const node = nodes.find(n => n.id === selectedNode);
        node.text = nodeText.value;
        renderNode(node);
    }
});

// Color picker listeners
document.querySelectorAll('.color-option').forEach(opt => {
    opt.addEventListener('click', () => {
        if (selectedNode !== null) {
            const node = nodes.find(n => n.id === selectedNode);
            node.color = opt.dataset.color;
            renderNode(node);
            selectNode(selectedNode);
        }
    });
});

// Export to PDF
function exportPDF() {
    const element = document.querySelector('.canvas-content');
    const opt = {
        margin: 10,
        filename: 'flowchart.pdf',
        image: { type: 'png', quality: 0.98 },
        html2canvas: { scale: 2, allowTaint: true, useCORS: true },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    html2pdf().set(opt).from(element).save();
}

// Export to PNG
function exportPNG() {
    const element = document.querySelector('.canvas-content');
    html2canvas(element, { backgroundColor: '#ffffff', scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'flowchart.png';
        link.click();
    });
}

// Canvas click to deselect
canvas.addEventListener('click', (e) => {
    if (e.target === canvas || e.target.id === 'connectionsSvg') {
        if (!isConnectingMode) {
            selectedNode = null;
            document.querySelectorAll('.node').forEach(el => el.classList.remove('selected'));
            emptyProperties.style.display = 'block';
            propertiesContent.style.display = 'none';
        }
    }
});
