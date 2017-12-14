var dragSrcEl = null;



function handleDragStart(e) {
    e.style.opacity = '0.4';  // this / e.target is the source node.
}

function update() {
    var cols = document.querySelectorAll('#central .one-column-wrap');
    [].forEach.call(cols, function(col) {
        col.addEventListener('dragstart', handleDragStart, false);
        col.classList.add("has-success");
    });
}

exports.update = update;