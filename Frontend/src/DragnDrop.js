var dragSrcEl = null;


function handleDragStart(e) {
    this.style.opacity = '0.6';  // this / e.target is the source node.

     dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
}

function handleDrop(e) {
    // this/e.target is current target element.
    this.style.opacity = '1.0';
    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the columnwe dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    var cols = document.querySelectorAll('#central .one-column-wrap');
    [].forEach.call(cols, function (col) {
        col.classList.remove('over');
        col.style.opacity = '1.0';
    });
}
function initialize() {
    var cols = document.querySelectorAll('#central .one-column-wrap');
    [].forEach.call(cols, function(col) {
        col.addEventListener('dragstart', handleDragStart, false);
        //col.addEventListener('dragenter', handleDragEnter, false);
        col.addEventListener('dragover', handleDragOver, false);
        //col.addEventListener('dragleave', handleDragLeave, false);
        col.addEventListener('drop', handleDrop, false);
        col.addEventListener('dragend', handleDragEnd, false);
    });
}

exports.initialize = initialize;